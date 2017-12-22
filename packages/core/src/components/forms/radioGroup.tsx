/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import { AbstractComponent } from "../../common/abstractComponent";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { IOptionProps, IProps } from "../../common/props";
import { Radio } from "./controls";

export interface IRadioGroupProps extends IProps {
    /**
     * 该组和其_所有_单选按钮是否被禁用。
     * 个别单选按钮可以使用他们的`disabled`属性来禁用。
     */
    disabled?: boolean;

    /**
     * 是否单选按钮要被内联水平显示。
     */
    inline?: boolean;

    /** 可选标签文本显示在单选按钮上方。 */
    label?: string;

    /**
     * 该组的名称，用于将单选按钮链接在HTML中。
     * 如果省略，则会在内部生成唯一的名称。
     */
    name?: string;

    /**
     * 当前选择的单选按钮改变时调用的回调。
     * 使用`event.currentTarget.value`读取当前选择的值。
     * 这个属性是必需的，因为这个组件只支持受控使用。
     */
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;

    /**
     * 在组中显示的选项数组。
     * 这个属性与`children`是互斥的：提供一个`IOptionProps`对象的数组或提供`<Radio>`子元素。
     */
    options?: IOptionProps[];

    /** 选择的单选按钮值。这个值的child将被`:checked`。*/
    selectedValue?: string;
}

let counter = 0;
function nextName() {
    return `${RadioGroup.displayName}-${counter++}`;
}

export class RadioGroup extends AbstractComponent<IRadioGroupProps, {}> {
    public static displayName = "Blueprint.RadioGroup";

    // a unique name for this group, which can be overridden by `name` prop.
    private autoGroupName = nextName();

    public render() {
        const { label } = this.props;
        return (
            <div className={this.props.className}>
                {label == null ? null : <label className={Classes.LABEL}>{label}</label>}
                {Array.isArray(this.props.options) ? this.renderOptions() : this.renderChildren()}
            </div>
        );
    }

    protected validateProps() {
        if (this.props.children != null && this.props.options != null) {
            console.warn(Errors.RADIOGROUP_WARN_CHILDREN_OPTIONS_MUTEX);
        }
    }

    private renderChildren() {
        return React.Children.map(this.props.children, child => {
            if (isRadio(child)) {
                return React.cloneElement(child, this.getRadioProps(child.props));
            } else {
                return child;
            }
        });
    }

    private renderOptions() {
        return this.props.options.map(option => (
            <Radio {...option} {...this.getRadioProps(option)} key={option.value} />
        ));
    }

    private getRadioProps(optionProps: IOptionProps) {
        const { name } = this.props;
        const { value, disabled } = optionProps;
        return {
            checked: value === this.props.selectedValue,
            disabled: disabled || this.props.disabled,
            inline: this.props.inline,
            name: name == null ? this.autoGroupName : name,
            onChange: this.props.onChange,
        };
    }
}

function isRadio(child: any): child is JSX.Element {
    return child != null && (child as JSX.Element).type === Radio;
}
