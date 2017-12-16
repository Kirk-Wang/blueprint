/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import { Alert, Button, Intent, IToaster, Toaster } from "@blueprintjs/core";
import { BaseExample } from "@blueprintjs/docs";

export interface IAlertExampleState {
    isOpen?: boolean;
    isOpenError?: boolean;
}

export class AlertExample extends BaseExample<{}> {
    public state: IAlertExampleState = {
        isOpen: false,
        isOpenError: false,
    };

    private toaster: IToaster;
    private message: JSX.Element = (
        <div>
            <strong>文件名</strong>已移至垃圾箱
        </div>
    );

    public componentWillMount() {
        this.toaster = Toaster.create();
    }

    protected renderExample() {
        return (
            <div>
                <Button onClick={this.handleOpenError} text="打开文件错误警告" />
                <Alert
                    className={this.props.themeName}
                    isOpen={this.state.isOpenError}
                    confirmButtonText="确定"
                    onConfirm={this.handleCloseError}
                >
                    <p>无法创建文件，因为包含的文件夹不再存在。您将被重定向到您的用户文件夹。</p>
                </Alert>
                <Button onClick={this.handleOpen} text="打开文件删除警告" />
                <Alert
                    className={this.props.themeName}
                    intent={Intent.PRIMARY}
                    isOpen={this.state.isOpen}
                    confirmButtonText="移到回收站"
                    cancelButtonText="取消"
                    onConfirm={this.handleMoveClose}
                    onCancel={this.handleClose}
                >
                    <p>
                        您确定要将<b>文件名</b>移至垃圾箱吗？你以后可以恢复它，并且它对你来说是私有的。
                    </p>
                </Alert>
            </div>
        );
    }

    private handleOpenError = () => this.setState({ isOpenError: true });
    private handleCloseError = () => this.setState({ isOpenError: false });
    private handleOpen = () => this.setState({ isOpen: true });
    private handleMoveClose = () => {
        this.setState({ isOpen: false });
        this.toaster.show({
            className: this.props.themeName,
            message: this.message,
        });
    };
    private handleClose = () => this.setState({ isOpen: false });
}
