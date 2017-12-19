/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as CSSTransitionGroup from "react-addons-css-transition-group";

import * as Classes from "../../common/classes";
import * as Keys from "../../common/keys";
import { IProps } from "../../common/props";
import { safeInvoke } from "../../common/utils";
import { Portal } from "../portal/portal";

export interface IOverlayableProps {
    /**
     * 覆盖层是否应该在首次打开时获得应用程序焦点。
     * @default true
     */
    autoFocus?: boolean;

    /**
     * 是否按下`esc`键应该调用`onClose`。
     * @default true
     */
    canEscapeKeyClose?: boolean;

    /**
     * 覆盖层是否应该防止焦点离开本身。
     * 也就是说，如果用户试图聚焦覆盖层之外的元素，并且此属性已被启用，则覆盖层将立即使焦点回到自身。
     * 如果要嵌套覆盖层组件，请在“最外层”叠加层上禁用此属性或将嵌套标记为`inline={true}`。
     * @default true
     */
    enforceFocus?: boolean;

    /**
     * 是否将叠加层渲染为内联或者放入`document.body`的新元素中。
     * 这个属性基本上决定了背景覆盖哪个元素：如果是`true`，那么只有父元素被覆盖，否则覆盖整个应用程序。
     * 在`Overlay`（如`Dialog`或`Popover`）中使用此组件时，将此属性设置为`true`，以确保此组件在父级之上呈现。
     * @default false
     */
    inline?: boolean;

    /**
     * 如果是true，并且不是`inline`，那么当覆盖层第一次被打开的时候，就会创建包含这些子级的`Portal`，并将其附加到DOM; 
     * 否则是在组件挂载时发生这种情况。如果一次有很多overlay，比如表格的每一行，那么延迟挂载可以显着提高性能。
     * @default true
     */
    lazy?: boolean;

    /**
     * 指示叠加层进入/离开转换需要多长时间（以毫秒为单位）。
     * React`CSSTransitionGroup`使用它来知道一个转换何时完成，并且必须和CSS中动画的持续时间相匹配。
     * 如果您使用不同长度的新转场覆盖Blueprint的默认转场，请设置此属性。
     * @default 100
     */
    transitionDuration?: number;

    /**
     * 当用户交互导致覆盖层关闭时调用的回调，例如点击覆盖层或按`esc`键（如果启用）。
     * 如果发生事件（通常是鼠标或键盘事件），则从用户的交互中接收事件。
     * 请注意，由于这个组件是由`isOpen`属性控制的，所以它不会真正关闭，直到这个属性变成`false`。
     */
    onClose?(event?: React.SyntheticEvent<HTMLElement>): void;
}

export interface IBackdropProps {
    /** 应用于背景元素CSS类名称。 */
    backdropClassName?: string;

    /** 背景元素的HTML属性。 */
    backdropProps?: React.HTMLProps<HTMLDivElement>;

    /**
     * 是否是在叠加元素之外单击（在背景上或者在文档上时）都应该调用`onClose`。
     * @default true
     */
    canOutsideClickClose?: boolean;

    /**
     * 是否应该在内容后面渲染容器生成的背景元素。
     * @default true
     */
    hasBackdrop?: boolean;
}

export interface IOverlayProps extends IOverlayableProps, IBackdropProps, IProps {
    /** Lifecycle callback invoked after the overlay opens and is mounted in the DOM. */
    didOpen?: () => any;

    /**
     * Toggles the visibility of the overlay and its children.
     * This prop is required because the component is controlled.
     */
    isOpen: boolean;

    /**
     * Name of the transition for internal `CSSTransitionGroup`.
     * Providing your own name here will require defining new CSS transition properties.
     * @default "pt-overlay"
     */
    transitionName?: string;
}

export interface IOverlayState {
    hasEverOpened?: boolean;
}

@PureRender
export class Overlay extends React.Component<IOverlayProps, IOverlayState> {
    public static displayName = "Blueprint.Overlay";

    public static defaultProps: IOverlayProps = {
        autoFocus: true,
        backdropProps: {},
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        hasBackdrop: true,
        inline: false,
        isOpen: false,
        lazy: true,
        transitionDuration: 300,
        transitionName: "pt-overlay",
    };

    private static openStack: Overlay[] = [];
    private static getLastOpened = () => Overlay.openStack[Overlay.openStack.length - 1];

    // an HTMLElement that contains the backdrop and any children, to query for focus target
    private containerElement: HTMLElement;
    private refHandlers = {
        container: (ref: HTMLDivElement) => (this.containerElement = ref),
    };

    public constructor(props?: IOverlayProps, context?: any) {
        super(props, context);
        this.state = { hasEverOpened: props.isOpen };
    }

    public render() {
        // oh snap! no reason to render anything at all if we're being truly lazy
        if (this.props.lazy && !this.state.hasEverOpened) {
            return null;
        }

        const { children, className, inline, isOpen, transitionDuration, transitionName } = this.props;

        // add a special class to each child that will automatically set the appropriate
        // CSS position mode under the hood. also, make the container focusable so we can
        // trap focus inside it (via `enforceFocus`).
        const decoratedChildren = React.Children.map(children, (child: React.ReactElement<any>) => {
            return React.cloneElement(child, {
                className: classNames(child.props.className, Classes.OVERLAY_CONTENT),
                tabIndex: 0,
            });
        });

        const transitionGroup = (
            <CSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={transitionDuration}
                transitionEnterTimeout={transitionDuration}
                transitionLeaveTimeout={transitionDuration}
                transitionName={transitionName}
            >
                {this.maybeRenderBackdrop()}
                {isOpen ? decoratedChildren : null}
            </CSSTransitionGroup>
        );

        const mergedClassName = classNames(
            Classes.OVERLAY,
            {
                [Classes.OVERLAY_OPEN]: isOpen,
                [Classes.OVERLAY_INLINE]: inline,
            },
            className,
        );

        const elementProps = {
            className: mergedClassName,
            onKeyDown: this.handleKeyDown,
        };

        if (inline) {
            return (
                <span {...elementProps} ref={this.refHandlers.container}>
                    {transitionGroup}
                </span>
            );
        } else {
            return (
                <Portal
                    {...elementProps}
                    containerRef={this.refHandlers.container}
                    onChildrenMount={this.handleContentMount}
                >
                    {transitionGroup}
                </Portal>
            );
        }
    }

    public componentDidMount() {
        if (this.props.isOpen) {
            this.overlayWillOpen();
        }
    }

    public componentWillReceiveProps(nextProps: IOverlayProps) {
        this.setState({ hasEverOpened: this.state.hasEverOpened || nextProps.isOpen });
    }

    public componentDidUpdate(prevProps: IOverlayProps) {
        if (prevProps.isOpen && !this.props.isOpen) {
            this.overlayWillClose();
        } else if (!prevProps.isOpen && this.props.isOpen) {
            this.overlayWillOpen();
        }
    }

    public componentWillUnmount() {
        this.overlayWillClose();
    }

    /**
     * @public for testing
     * @internal
     */
    public bringFocusInsideOverlay() {
        // always delay focus manipulation to just before repaint to prevent scroll jumping
        return requestAnimationFrame(() => {
            // container ref may be undefined between component mounting and Portal rendering
            // activeElement may be undefined in some rare cases in IE
            if (this.containerElement == null || document.activeElement == null || !this.props.isOpen) {
                return;
            }

            const isFocusOutsideModal = !this.containerElement.contains(document.activeElement);
            if (isFocusOutsideModal) {
                // element marked autofocus has higher priority than the other clowns
                const autofocusElement = this.containerElement.query("[autofocus]") as HTMLElement;
                const wrapperElement = this.containerElement.query("[tabindex]") as HTMLElement;
                if (autofocusElement != null) {
                    autofocusElement.focus();
                } else if (wrapperElement != null) {
                    wrapperElement.focus();
                }
            }
        });
    }

    private maybeRenderBackdrop() {
        const { backdropClassName, backdropProps, hasBackdrop, isOpen } = this.props;
        if (hasBackdrop && isOpen) {
            return (
                <div
                    {...backdropProps}
                    className={classNames(Classes.OVERLAY_BACKDROP, backdropClassName, backdropProps.className)}
                    onMouseDown={this.handleBackdropMouseDown}
                    tabIndex={this.props.canOutsideClickClose ? 0 : null}
                />
            );
        } else {
            return undefined;
        }
    }

    private overlayWillClose() {
        document.removeEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
        document.removeEventListener("mousedown", this.handleDocumentClick);

        const { openStack } = Overlay;
        const stackIndex = openStack.indexOf(this);
        if (stackIndex !== -1) {
            openStack.splice(stackIndex, 1);
            if (openStack.length > 0) {
                const lastOpenedOverlay = Overlay.getLastOpened();
                if (lastOpenedOverlay.props.enforceFocus) {
                    document.addEventListener("focus", lastOpenedOverlay.handleDocumentFocus, /* useCapture */ true);
                }
            }

            if (openStack.filter(o => !o.props.inline && o.props.hasBackdrop).length === 0) {
                document.body.classList.remove(Classes.OVERLAY_OPEN);
            }
        }
    }

    private overlayWillOpen() {
        const { openStack } = Overlay;
        if (openStack.length > 0) {
            document.removeEventListener("focus", Overlay.getLastOpened().handleDocumentFocus, /* useCapture */ true);
        }
        openStack.push(this);

        if (this.props.canOutsideClickClose && !this.props.hasBackdrop) {
            document.addEventListener("mousedown", this.handleDocumentClick);
        }
        if (this.props.enforceFocus) {
            document.addEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
        }
        if (this.props.inline) {
            safeInvoke(this.props.didOpen);
            if (this.props.autoFocus) {
                this.bringFocusInsideOverlay();
            }
        } else if (this.props.hasBackdrop) {
            // add a class to the body to prevent scrolling of content below the overlay
            document.body.classList.add(Classes.OVERLAY_OPEN);
        }
    }

    private handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const { backdropProps, canOutsideClickClose, enforceFocus, onClose } = this.props;
        if (canOutsideClickClose) {
            safeInvoke(onClose, e);
        }
        if (enforceFocus) {
            // make sure document.activeElement is updated before bringing the focus back
            this.bringFocusInsideOverlay();
        }
        safeInvoke(backdropProps.onMouseDown, e);
    };

    private handleDocumentClick = (e: MouseEvent) => {
        const { isOpen, onClose } = this.props;
        const eventTarget = e.target as HTMLElement;
        const isClickInOverlay = this.containerElement != null && this.containerElement.contains(eventTarget);
        if (isOpen && this.props.canOutsideClickClose && !isClickInOverlay) {
            // casting to any because this is a native event
            safeInvoke(onClose, e as any);
        }
    };

    private handleContentMount = () => {
        if (this.props.isOpen) {
            safeInvoke(this.props.didOpen);
        }
        if (this.props.autoFocus) {
            this.bringFocusInsideOverlay();
        }
    };

    private handleDocumentFocus = (e: FocusEvent) => {
        if (
            this.props.enforceFocus &&
            this.containerElement != null &&
            !this.containerElement.contains(e.target as HTMLElement)
        ) {
            // prevent default focus behavior (sometimes auto-scrolls the page)
            e.preventDefault();
            e.stopImmediatePropagation();
            this.bringFocusInsideOverlay();
        }
    };

    private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        const { canEscapeKeyClose, onClose } = this.props;
        if (e.which === Keys.ESCAPE && canEscapeKeyClose) {
            safeInvoke(onClose, e);
            // prevent browser-specific escape key behavior (Safari exits fullscreen)
            e.preventDefault();
        }
    };
}

export const OverlayFactory = React.createFactory(Overlay);
