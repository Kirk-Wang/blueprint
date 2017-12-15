/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as React from "react";

import * as Classes from "../../common/classes";
import * as Keys from "../../common/keys";
import { IActionProps } from "../../common/props";
import { safeInvoke } from "../../common/utils";
import { Icon, IconName } from "../icon/icon";
import { Spinner } from "../spinner/spinner";

export interface IButtonProps extends IActionProps {
    /**
     * 如果设置为`true`，则按钮将显示为激活状态。
     * 这相当于设置`className="pt-active"`。
     * @default false
     */
    active?: boolean;

    /** 一个ref处理器，它接受这个组件背后的原生HTML元素 */
    elementRef?: (ref: HTMLElement) => any;

    /** 添加到按钮的图标名称（`pt-icon-`之后的部分）。 */
    rightIconName?: IconName;

    /**
     * 如果设置为`true`，则该按钮将显示一个居中的加载spinner，而不是其内容。
     * 该按钮的宽度不受此属性值的影响。
     * @default false
     */
    loading?: boolean;

    /**
     * 按钮的HTML`type`属性。常用的值是`"button"`和`"submit"`。
     * 请注意，这个属性对`AnchorButton`没有任何影响。它只影响`Button`。
     * @default "button"
     */
    type?: string;
}

export interface IButtonState {
    isActive: boolean;
}

export abstract class AbstractButton<T> extends React.Component<React.HTMLProps<T> & IButtonProps, IButtonState> {
    public state = {
        isActive: false,
    };

    protected buttonRef: HTMLElement;
    protected refHandlers = {
        button: (ref: HTMLElement) => {
            this.buttonRef = ref;
            safeInvoke(this.props.elementRef, ref);
        },
    };

    private currentKeyDown: number = null;

    public abstract render(): JSX.Element;

    protected getCommonButtonProps() {
        const disabled = this.props.disabled || this.props.loading;

        const className = classNames(
            Classes.BUTTON,
            {
                [Classes.ACTIVE]: this.state.isActive || this.props.active,
                [Classes.DISABLED]: disabled,
                [Classes.LOADING]: this.props.loading,
            },
            Classes.iconClass(this.props.iconName),
            Classes.intentClass(this.props.intent),
            this.props.className,
        );

        return {
            className,
            disabled,
            onClick: disabled ? undefined : this.props.onClick,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            ref: this.refHandlers.button,
        };
    }

    // we're casting as `any` to get around a somewhat opaque safeInvoke error
    // that "Type argument candidate 'KeyboardEvent<T>' is not a valid type
    // argument because it is not a supertype of candidate
    // 'KeyboardEvent<HTMLElement>'."
    protected handleKeyDown = (e: React.KeyboardEvent<any>) => {
        if (isKeyboardClick(e.which)) {
            e.preventDefault();
            if (e.which !== this.currentKeyDown) {
                this.setState({ isActive: true });
            }
        }
        this.currentKeyDown = e.which;
        safeInvoke(this.props.onKeyDown, e);
    };

    protected handleKeyUp = (e: React.KeyboardEvent<any>) => {
        if (isKeyboardClick(e.which)) {
            this.setState({ isActive: false });
            this.buttonRef.click();
        }
        this.currentKeyDown = null;
        safeInvoke(this.props.onKeyUp, e);
    };

    protected renderChildren(): React.ReactNode {
        const { loading, rightIconName, text } = this.props;

        const children = React.Children.map(this.props.children, (child, index) => {
            if (child === "") {
                // render as undefined to avoid extra space after icon
                return undefined;
            } else if (typeof child === "string") {
                // must wrap string children in spans so loading prop can hide them
                return <span key={`text-${index}`}>{child}</span>;
            }
            return child;
        });

        return [
            loading ? <Spinner className="pt-small pt-button-spinner" key="spinner" /> : undefined,
            text != null ? <span key="text">{text}</span> : undefined,
            ...children,
            <Icon className={Classes.ALIGN_RIGHT} iconName={rightIconName} key="icon" />,
        ];
    }
}

function isKeyboardClick(keyCode: number) {
    return keyCode === Keys.ENTER || keyCode === Keys.SPACE;
}
