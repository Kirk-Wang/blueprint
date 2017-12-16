/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as React from "react";

import { AnchorButton, Button, Classes, Intent, Switch } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs";
import { IntentSelect } from "./common/intentSelect";

export interface IButtonsExampleState {
    active?: boolean;
    disabled?: boolean;
    intent?: Intent;
    loading?: boolean;
    large?: boolean;
    minimal?: boolean;
    wiggling?: boolean;
}

export class ButtonsExample extends BaseExample<IButtonsExampleState> {
    public state: IButtonsExampleState = {
        active: false,
        disabled: false,
        large: false,
        loading: false,
        minimal: false,
        wiggling: false,
    };

    private handleActiveChange = handleBooleanChange(active => this.setState({ active }));
    private handleDisabledChange = handleBooleanChange(disabled => this.setState({ disabled }));
    private handleLargeChange = handleBooleanChange(large => this.setState({ large }));
    private handleLoadingChange = handleBooleanChange(loading => this.setState({ loading }));
    private handleMinimalChange = handleBooleanChange(minimal => this.setState({ minimal }));
    private handleIntentChange = handleNumberChange((intent: Intent) => this.setState({ intent }));

    private wiggleTimeoutId: number;

    public componentWillUnmount() {
        window.clearTimeout(this.wiggleTimeoutId);
    }

    protected renderExample() {
        const classes = classNames({
            [Classes.LARGE]: this.state.large,
            [Classes.MINIMAL]: this.state.minimal,
        });

        return (
            <div className="docs-react-example-row">
                <div className="docs-react-example-column">
                    <code>按钮</code>
                    <br />
                    <br />
                    <Button
                        className={classNames(classes, { "docs-wiggle": this.state.wiggling })}
                        disabled={this.state.disabled}
                        active={this.state.active}
                        iconName="refresh"
                        intent={this.state.intent}
                        loading={this.state.loading}
                        onClick={this.beginWiggling}
                        text="点击摇摆"
                    />
                </div>
                <div className="docs-react-example-column">
                    <code>锚点按钮</code>
                    <br />
                    <br />
                    <AnchorButton
                        className={classes}
                        disabled={this.state.disabled}
                        active={this.state.active}
                        href="./#core/components/button.javascript-api"
                        iconName="duplicate"
                        intent={this.state.intent}
                        loading={this.state.loading}
                        rightIconName="share"
                        target="_blank"
                        text="复制此页面"
                    />
                </div>
            </div>
        );
    }

    protected renderOptions() {
        return [
            [
                <label className={Classes.LABEL} key="label">
                    修饰符
                </label>,
                <Switch checked={this.state.active} key="active" label="激活" onChange={this.handleActiveChange} />,
                <Switch
                    checked={this.state.disabled}
                    key="disabled"
                    label="禁用"
                    onChange={this.handleDisabledChange}
                />,
                <Switch checked={this.state.large} key="large" label="大的" onChange={this.handleLargeChange} />,
                <Switch
                    checked={this.state.loading}
                    key="loading"
                    label="加载中"
                    onChange={this.handleLoadingChange}
                />,
                <Switch
                    checked={this.state.minimal}
                    key="minimal"
                    label="迷你的"
                    onChange={this.handleMinimalChange}
                />,
            ],
            [<IntentSelect intent={this.state.intent} key="intent" onChange={this.handleIntentChange} />],
        ];
    }

    private beginWiggling = () => {
        window.clearTimeout(this.wiggleTimeoutId);
        this.setState({ wiggling: true });
        this.wiggleTimeoutId = window.setTimeout(() => this.setState({ wiggling: false }), 300);
    };
}
