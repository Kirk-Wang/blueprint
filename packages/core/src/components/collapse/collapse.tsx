/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as React from "react";

import { AbstractComponent } from "../../common/abstractComponent";
import * as Classes from "../../common/classes";
import { IProps } from "../../common/props";

export interface ICollapseProps extends IProps {
    /**
     * 作为根元素渲染的组件。
     * 例如，在`<table>`内渲染`Collapse`时很有用。
     * @default "div"
     */
    component?: React.ReactType;

    /**
     * 组件是打开还是关闭。
     * @default false
     */
    isOpen?: boolean;

    /**
     * 当`Collapse`关闭时，子组件是否保持挂载状态。
     * 设置为true可避免重新挂载子元素，从而提高性能。
     * @default false
     */
    keepChildrenMounted?: boolean;

    /**
     * 动画变换所需的时间，以毫秒为单位。这必须与CSS中动画的持续时间相匹配。
     * 如果您使用了不同时间长度的新转场动画覆盖Blueprint的默认转场，请设置此属性。
     * @default 200
     */
    transitionDuration?: number;
}

export interface ICollapseState {
    /** The height that should be used for the content animations. This is a CSS value, not just a number. */
    height?: string;

    /** The state the element is currently in. */
    animationState?: AnimationStates;
}

export enum AnimationStates {
    CLOSED,
    OPENING,
    OPEN,
    CLOSING_START,
    CLOSING_END,
}

/*
 * A collapse can be in one of 5 states:
 * CLOSED
 * When in this state, the contents of the collapse is not rendered, the collapse height is 0,
 * and the body Y is at -height (so that the bottom of the body is at Y=0).
 *
 * OPEN
 * When in this state, the collapse height is set to auto, and the body Y is set to 0 (so the element can be seen
 * as normal).
 *
 * CLOSING_START
 * When in this state, height has been changed from auto to the measured height of the body to prepare for the
 * closing animation in CLOSING_END.
 *
 * CLOSING_END
 * When in this state, the height is set to 0 and the body Y is at -height. Both of these properties are transformed,
 * and then after the animation is complete, the state changes to CLOSED.
 *
 * OPENING
 * When in this state, the body is re-rendered, height is set to the measured body height and the body Y is set to 0.
 * This is all animated, and on complete, the state changes to OPEN.
 *
 * When changing the isOpen prop, the following happens to the states:
 * isOpen = true : CLOSED -> OPENING -> OPEN
 * isOpen = false: OPEN -> CLOSING_START -> CLOSING_END -> CLOSED
 * These are all animated.
 */
export class Collapse extends AbstractComponent<ICollapseProps, ICollapseState> {
    public static displayName = "Blueprint.Collapse";

    public static defaultProps: ICollapseProps = {
        component: "div",
        isOpen: false,
        keepChildrenMounted: false,
        transitionDuration: 200,
    };

    public state = {
        animationState: AnimationStates.OPEN,
        height: "0px",
    };

    // The element containing the contents of the collapse.
    private contents: HTMLElement;
    // The most recent non-0 height (once a height has been measured - is 0 until then)
    private height: number = 0;

    public componentWillReceiveProps(nextProps: ICollapseProps) {
        if (this.contents != null && this.contents.clientHeight !== 0) {
            this.height = this.contents.clientHeight;
        }
        if (this.props.isOpen !== nextProps.isOpen) {
            this.clearTimeouts();
            if (this.state.animationState !== AnimationStates.CLOSED && !nextProps.isOpen) {
                this.setState({
                    animationState: AnimationStates.CLOSING_START,
                    height: `${this.height}px`,
                });
            } else if (this.state.animationState !== AnimationStates.OPEN && nextProps.isOpen) {
                this.setState({
                    animationState: AnimationStates.OPENING,
                    height: `${this.height}px`,
                });
                this.setTimeout(() => this.onDelayedStateChange(), this.props.transitionDuration);
            }
        }
    }

    public render() {
        const isContentVisible = this.state.animationState !== AnimationStates.CLOSED;
        const shouldRenderChildren = isContentVisible || this.props.keepChildrenMounted;
        const displayWithTransform = isContentVisible && this.state.animationState !== AnimationStates.CLOSING_END;
        const isAutoHeight = this.state.height === "auto";

        const containerStyle = {
            height: isContentVisible ? this.state.height : undefined,
            overflowY: (isAutoHeight ? "visible" : undefined) as "visible" | undefined,
            transition: isAutoHeight ? "none" : undefined,
        };

        const contentsStyle = {
            transform: displayWithTransform ? "translateY(0)" : `translateY(-${this.height}px)`,
            transition: isAutoHeight ? "none" : undefined,
        };

        // HACKHACK: type cast because there's no single overload that supports all
        // three ReactTypes (string | ComponentClass | StatelessComponent)
        return React.createElement(
            this.props.component as any,
            {
                className: classNames(Classes.COLLAPSE, this.props.className),
                style: containerStyle,
            },
            <div
                className="pt-collapse-body"
                ref={this.contentsRefHandler}
                style={contentsStyle}
                aria-hidden={!isContentVisible && this.props.keepChildrenMounted}
            >
                {shouldRenderChildren ? this.props.children : null}
            </div>,
        );
    }

    public componentDidMount() {
        this.forceUpdate();
        if (this.props.isOpen) {
            this.setState({ animationState: AnimationStates.OPEN, height: "auto" });
        } else {
            this.setState({ animationState: AnimationStates.CLOSED });
        }
    }

    public componentDidUpdate() {
        if (this.state.animationState === AnimationStates.CLOSING_START) {
            this.setTimeout(() =>
                this.setState({
                    animationState: AnimationStates.CLOSING_END,
                    height: "0px",
                }),
            );
            this.setTimeout(() => this.onDelayedStateChange(), this.props.transitionDuration);
        }
    }

    private contentsRefHandler = (el: HTMLElement) => {
        this.contents = el;
        if (el != null) {
            this.height = this.contents.clientHeight;
            this.setState({
                animationState: this.props.isOpen ? AnimationStates.OPEN : AnimationStates.CLOSED,
                height: `${this.height}px`,
            });
        }
    };

    private onDelayedStateChange() {
        switch (this.state.animationState) {
            case AnimationStates.OPENING:
                this.setState({ animationState: AnimationStates.OPEN, height: "auto" });
                break;
            case AnimationStates.CLOSING_END:
                this.setState({ animationState: AnimationStates.CLOSED });
                break;
            default:
                break;
        }
    }
}
