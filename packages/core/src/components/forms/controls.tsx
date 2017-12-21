/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

// HACKHACK: these components should go in separate files
// tslint:disable max-classes-per-file

// we need some empty interfaces to show up in docs
// tslint:disable no-empty-interface

import * as classNames from "classnames";
import * as React from "react";

import * as Classes from "../../common/classes";
import { IProps, removeNonHTMLProps } from "../../common/props";
import { safeInvoke } from "../../common/utils";
import { HTMLInputProps } from "../../index";

export interface IControlProps extends IProps, HTMLInputProps {
    // NOTE: HTML props are duplicated here to provide control-specific documentation

    /** 是否勾选控件。 */
    checked?: boolean;

    /** 控制是否被初始勾选（非控模式）。 */
    defaultChecked?: boolean;

    /** 控制是否是非交互式的。 */
    disabled?: boolean;

    /** 引用处理器，它接收此组件背后的HTML`<input>`元素。 */
    inputRef?: (ref: HTMLInputElement) => any;

    /** 控件是否内联。 */
    inline?: boolean;

    /**
     * 控件的文本标签。
     *
     * 这个属性实际上支持JSX元素，但是TypeScript会抛出一个错误，因为`HTMLProps`只允许字符串。
     * 使用`labelElement`在TypeScript中提供一个JSX元素。
     */
    label?: string;

    /**
     * 控件的JSX元素标签。
     *
     * 这个属性对于TypeScript使用者是必须的，因为`label`的类型定义只接受字符串。 
     * JavaScript使用者可以直接将JSX元素提供给`label`。
     */
    labelElement?: React.ReactNode;

    /** 在输入值更改时被调用事件处理程序。 */
    onChange?: React.FormEventHandler<HTMLInputElement>;
}

const INVALID_PROPS: Array<keyof ICheckboxProps> = [
    // we spread props to `<input>` but render `children` as its sibling
    "children",
    "defaultIndeterminate",
    "indeterminate",
    "labelElement",
];

/** Base Component class for all Controls */
export class Control<P extends IControlProps> extends React.Component<P, {}> {
    // generates control markup for given input type.
    // optional inputRef in case the component needs reference for itself (don't forget to invoke the prop!).
    protected renderControl(type: "checkbox" | "radio", typeClassName: string, inputRef = this.props.inputRef) {
        const className = classNames(
            Classes.CONTROL,
            typeClassName,
            {
                [Classes.DISABLED]: this.props.disabled,
                [Classes.INLINE]: this.props.inline,
            },
            this.props.className,
        );
        const inputProps = removeNonHTMLProps(this.props, INVALID_PROPS, true);
        return (
            <label className={className} style={this.props.style}>
                <input {...inputProps} ref={inputRef} type={type} />
                <span className={Classes.CONTROL_INDICATOR} />
                {this.props.label}
                {this.props.labelElement}
                {this.props.children}
            </label>
        );
    }
}

export interface ICheckboxProps extends IControlProps {
    /** 这个复选框是否最初是不确定的（非控模式）。 */
    defaultIndeterminate?: boolean;

    /**
     * 这个复选框是不确定的，还是“部分勾选”。
     * 该复选框将显示一个小破折号，而不是一个打勾，表示该值不完全是真或假。
     */
    indeterminate?: boolean;
}

export class Checkbox extends Control<ICheckboxProps> {
    public static displayName = "Blueprint.Checkbox";

    // must maintain internal reference for `indeterminate` support
    private input: HTMLInputElement;

    public render() {
        return this.renderControl("checkbox", "pt-checkbox", this.handleInputRef);
    }

    public componentDidMount() {
        if (this.props.defaultIndeterminate != null) {
            this.input.indeterminate = this.props.defaultIndeterminate;
        }
        this.updateIndeterminate();
    }

    public componentDidUpdate() {
        this.updateIndeterminate();
    }

    private updateIndeterminate() {
        if (this.props.indeterminate != null) {
            this.input.indeterminate = this.props.indeterminate;
        }
    }

    private handleInputRef = (ref: HTMLInputElement) => {
        this.input = ref;
        safeInvoke(this.props.inputRef, ref);
    };
}

export interface ISwitchProps extends IControlProps {}

export class Switch extends Control<ISwitchProps> {
    public static displayName = "Blueprint.Switch";

    public render() {
        return this.renderControl("checkbox", "pt-switch");
    }
}

export interface IRadioProps extends IControlProps {}

export class Radio extends Control<IRadioProps> {
    public static displayName = "Blueprint.Radio";

    public render() {
        return this.renderControl("radio", "pt-radio");
    }
}

export const CheckboxFactory = React.createFactory(Checkbox);
export const SwitchFactory = React.createFactory(Switch);
export const RadioFactory = React.createFactory(Radio);
