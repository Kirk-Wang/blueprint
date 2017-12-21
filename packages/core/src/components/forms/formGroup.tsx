/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
import { IIntentProps, IProps } from "../../common/props";

export interface IFormGroupProps extends IIntentProps, IProps {
    /**
     * 表单组是否应该显示为非交互式。
     * 记住`input`元素必须单独禁用。
     */
    disabled?: boolean;

    /** 可选的帮助文本。给定的内容将被封装在`.pt-form-helper-text`中，并显示在`children`下面。 */
    helperText?: React.ReactNode;

    /** 是否在一行上渲染标签和子项。 */
    inline?: boolean;

    /** 这个表单组的标签。 */
    label?: React.ReactNode;

    /**
     * `FormGroup`控制的可标识表单元素的`id`属性，用作`<label for>`属性。
     */
    labelFor?: string;

    /**
     * 该表单输入是否应该显示必须（不影响HTML表单所需状态）。
     * 提供一个布尔值`true`的值将会在`label`属性之后产生一个默认的"required"消息。
     * 提供JSX值将会渲染该内容，而不是默认的"required"消息。
     *
     * _注意：_默认的消息元素被暴露为FormGroup.DEFAULT_REQUIRED_CONTENT，并且可以被更改为你app提供的一个新的全局默认值。
     * @default false
     */
    requiredLabel?: boolean | React.ReactNode;
}

@PureRender
export class FormGroup extends React.Component<IFormGroupProps, {}> {
    /**
     * Element used to render `required` message when a boolean value is provided for that prop.
     * Modifying the value of this property will change the default globally in your app.
     *
     * Defaults to `<span class="pt-text-muted">(required)</span>`.
     */
    public static DEFAULT_REQUIRED_CONTENT = <span className={Classes.TEXT_MUTED}>(required)</span>;

    public render() {
        const { children, label, labelFor } = this.props;
        return (
            <div className={this.getClassName()}>
                <label className={Classes.LABEL} htmlFor={labelFor}>
                    {label}
                    {this.maybeRenderRequiredLabel()}
                </label>
                <div className={Classes.FORM_CONTENT}>
                    {children}
                    {this.maybeRenderHelperText()}
                </div>
            </div>
        );
    }

    private getClassName() {
        const { className, disabled, inline, intent } = this.props;
        return classNames(
            Classes.FORM_GROUP,
            Classes.intentClass(intent),
            {
                [Classes.DISABLED]: disabled,
                [Classes.INLINE]: inline,
            },
            className,
        );
    }

    private maybeRenderRequiredLabel() {
        const { requiredLabel } = this.props;
        return requiredLabel === true ? FormGroup.DEFAULT_REQUIRED_CONTENT : requiredLabel;
    }

    private maybeRenderHelperText() {
        const { helperText } = this.props;
        if (!helperText) {
            return null;
        }
        return <div className={Classes.FORM_HELPER_TEXT}>{helperText}</div>;
    }
}
