/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";

import * as Classes from "../../common/classes";
import { HTMLInputProps, IControlledProps, IIntentProps, IProps, removeNonHTMLProps } from "../../common/props";
import { Icon, IconName } from "../icon/icon";

export interface IInputGroupProps extends IControlledProps, IIntentProps, IProps {
    /**
     * input是否是非交互式的。
     * 请注意，`rightElement`必须单独禁用;这个属性不会影响它。
     * @default false
     */
    disabled?: boolean;

    /** 引用处理器，它接收此组件背后的HTML`<input>`元素。 */
    inputRef?: (ref: HTMLInputElement) => any;

    /** input左侧的图标名称（`pt-icon-`之后的部分）。 */
    leftIconName?: IconName;

    /** 没有任何值的占位符文本。 */
    placeholder?: string;

    /**
     * 要在input右侧渲染的元素。
     * 为获得最佳效果，请使用minimal button，tag或small spinner。
     */
    rightElement?: JSX.Element;

    /**
     * HTML`input`type属性。
     * @default "text"
     */
    type?: string;
}

export interface IInputGroupState {
    rightElementWidth?: number;
}

@PureRender
export class InputGroup extends React.Component<HTMLInputProps & IInputGroupProps, IInputGroupState> {
    public static displayName = "Blueprint.InputGroup";

    public state: IInputGroupState = {
        rightElementWidth: 30,
    };

    private rightElement: HTMLElement;
    private refHandlers = {
        rightElement: (ref: HTMLSpanElement) => (this.rightElement = ref),
    };

    public render() {
        const { className, intent, leftIconName } = this.props;
        const classes = classNames(
            Classes.INPUT_GROUP,
            Classes.intentClass(intent),
            {
                [Classes.DISABLED]: this.props.disabled,
            },
            className,
        );
        const style: React.CSSProperties = { ...this.props.style, paddingRight: this.state.rightElementWidth };

        return (
            <div className={classes}>
                <Icon iconName={leftIconName} iconSize="inherit" />
                <input
                    type="text"
                    {...removeNonHTMLProps(this.props)}
                    className={Classes.INPUT}
                    ref={this.props.inputRef}
                    style={style}
                />
                {this.maybeRenderRightElement()}
            </div>
        );
    }

    public componentDidMount() {
        this.updateInputWidth();
    }

    public componentDidUpdate() {
        this.updateInputWidth();
    }

    private maybeRenderRightElement() {
        const { rightElement } = this.props;
        if (rightElement == null) {
            return undefined;
        }
        return (
            <span className="pt-input-action" ref={this.refHandlers.rightElement}>
                {rightElement}
            </span>
        );
    }

    private updateInputWidth() {
        if (this.rightElement != null) {
            const { clientWidth } = this.rightElement;
            // small threshold to prevent infinite loops
            if (Math.abs(clientWidth - this.state.rightElementWidth) > 2) {
                this.setState({ rightElementWidth: clientWidth });
            }
        } else {
            this.setState({ rightElementWidth: 0 });
        }
    }
}

export const InputGroupFactory = React.createFactory(InputGroup);
