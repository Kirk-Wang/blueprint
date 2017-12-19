/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as React from "react";

import { AbstractComponent } from "../../common/abstractComponent";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { IProps } from "../../common/props";
import { safeInvoke } from "../../common/utils";
import { Icon, IconName } from "../icon/icon";
import { IBackdropProps, IOverlayableProps, Overlay } from "../overlay/overlay";

export interface IDialogProps extends IOverlayableProps, IBackdropProps, IProps {
    /**
     * 切换叠加层及其子项的可见性。
     * 这个属性是必须的，因为组件是受控的。
     */
    isOpen: boolean;

    /**
     * 对话框总是有一个背景，所以这个属性从公共API中排除。
     * @internal
     */
    hasBackdrop?: boolean;

    /**
     * 图标名称（`pt-icon-`之后的部分）出现在对话框的标题中。
     * Note that the header will only be rendered if `title` is provided.
     */
    iconName?: IconName;

    /**
     * 是否在对话框的标题中显示关闭按钮。
     * 请注意，只有在提供了`title`的情况下才会呈现。
     * @default true
     */
    isCloseButtonShown?: boolean;

    /**
     * 应用于对话框的CSS样式。
     * @default {}
     */
    style?: React.CSSProperties;

    /**
     * 对话框标题
     * 如果提供了，一个`.pt-dialog-header`元素将会被渲染在对话框内部，在任何子元素之前。
     * 在下一个主要版本中，这个属性将是必需的。
     */
    title?: string | JSX.Element;

    /**
     * 内部`CSSTransitionGroup`的变换名称。
     * 在这里提供你自己的名字将需要定义新的CSS变换属性。
     */
    transitionName?: string;
}

export class Dialog extends AbstractComponent<IDialogProps, {}> {
    public static defaultProps: IDialogProps = {
        canOutsideClickClose: true,
        isOpen: false,
    };

    public static displayName = "Blueprint.Dialog";

    public render() {
        return (
            <Overlay {...this.props} className={Classes.OVERLAY_SCROLL_CONTAINER} hasBackdrop={true}>
                <div className={Classes.DIALOG_CONTAINER} onMouseDown={this.handleContainerMouseDown}>
                    <div className={classNames(Classes.DIALOG, this.props.className)} style={this.props.style}>
                        {this.maybeRenderHeader()}
                        {this.props.children}
                    </div>
                </div>
            </Overlay>
        );
    }

    protected validateProps(props: IDialogProps) {
        if (props.title == null) {
            if (props.iconName != null) {
                console.warn(Errors.DIALOG_WARN_NO_HEADER_ICON);
            }
            if (props.isCloseButtonShown != null) {
                console.warn(Errors.DIALOG_WARN_NO_HEADER_CLOSE_BUTTON);
            }
        }
    }

    private maybeRenderCloseButton() {
        // for now, show close button if prop is undefined or null
        // this gives us a behavior as if the default value were `true`
        if (this.props.isCloseButtonShown !== false) {
            const classes = classNames(Classes.DIALOG_CLOSE_BUTTON, Classes.iconClass("small-cross"));
            return <button aria-label="Close" className={classes} onClick={this.props.onClose} />;
        } else {
            return undefined;
        }
    }

    private maybeRenderHeader() {
        const { iconName, title } = this.props;
        if (title == null) {
            return undefined;
        }
        return (
            <div className={Classes.DIALOG_HEADER}>
                <Icon iconName={iconName} iconSize={20} />
                <h5>{title}</h5>
                {this.maybeRenderCloseButton()}
            </div>
        );
    }

    private handleContainerMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
        // quick re-implementation of canOutsideClickClose because .pt-dialog-container covers the backdrop
        const isClickOutsideDialog = (evt.target as HTMLElement).closest(`.${Classes.DIALOG}`) == null;
        if (isClickOutsideDialog && this.props.canOutsideClickClose) {
            safeInvoke(this.props.onClose, evt);
        }
    };
}

export const DialogFactory = React.createFactory(Dialog);
