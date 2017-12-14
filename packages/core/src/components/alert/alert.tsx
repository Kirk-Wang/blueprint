/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as React from "react";

import { AbstractComponent, Classes, Intent, IProps } from "../../common";
import { ALERT_WARN_CANCEL_PROPS } from "../../common/errors";
import { Button } from "../button/buttons";
import { Dialog } from "../dialog/dialog";
import { Icon, IconName } from "../icon/icon";

export interface IAlertProps extends IProps {
    /**
     * 取消按钮的文本。
     */
    cancelButtonText?: string;

    /**
     * 确认（最右边）按钮的文本。
     * @default "OK"
     */
    confirmButtonText?: string;

    /** 警告消息旁边要添加的图标的名称（`pt-icon-`之后的部分） */
    iconName?: IconName;

    /**
     * 意图被应用到确认（最右）按钮。
     */
    intent?: Intent;

    /**
     * 显示隐藏警告提示
     * 这个属性是必需的，因为组件是受控的。
     */
    isOpen: boolean;

    /**
     * 应用于警告的CSS样式。
     */
    style?: React.CSSProperties;

    /**
     * 在单击取消按钮时被调用的处理程序。
     */
    onCancel?(e: React.MouseEvent<HTMLButtonElement>): void;

    /**
     * 在单击确认按钮时被调用的处理程序。
     */
    onConfirm(e: React.MouseEvent<HTMLButtonElement>): void;
}

export class Alert extends AbstractComponent<IAlertProps, {}> {
    public static defaultProps: IAlertProps = {
        confirmButtonText: "OK",
        isOpen: false,
        onConfirm: null,
    };

    public static displayName = "Blueprint.Alert";

    public render() {
        const { children, className, iconName, intent, isOpen, confirmButtonText, onConfirm, style } = this.props;
        return (
            <Dialog className={classNames(Classes.ALERT, className)} isOpen={isOpen} style={style}>
                <div className={Classes.ALERT_BODY}>
                    <Icon iconName={iconName} iconSize="inherit" intent={Intent.DANGER} />
                    <div className={Classes.ALERT_CONTENTS}>{children}</div>
                </div>
                <div className={Classes.ALERT_FOOTER}>
                    <Button intent={intent} text={confirmButtonText} onClick={onConfirm} />
                    {this.maybeRenderSecondaryAction()}
                </div>
            </Dialog>
        );
    }

    protected validateProps(props: IAlertProps) {
        if (
            (props.cancelButtonText != null && props.onCancel == null) ||
            (props.cancelButtonText == null && props.onCancel != null)
        ) {
            console.warn(ALERT_WARN_CANCEL_PROPS);
        }
    }

    private maybeRenderSecondaryAction() {
        if (this.props.cancelButtonText != null) {
            return <Button text={this.props.cancelButtonText} onClick={this.props.onCancel} />;
        }
        return undefined;
    }
}
