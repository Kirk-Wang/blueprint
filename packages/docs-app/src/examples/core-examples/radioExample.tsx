/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import { Radio, RadioGroup } from "@blueprintjs/core";
import { BaseExample, handleStringChange } from "@blueprintjs/docs";

export interface IRadioExampleState {
    radioValue?: string;
}

export class RadioExample extends BaseExample<IRadioExampleState> {
    public state: IRadioExampleState = {};

    private handleRadioChange = handleStringChange(radioValue => this.setState({ radioValue }));

    protected renderExample() {
        return (
            <RadioGroup
                label="确定午餐"
                name="group"
                onChange={this.handleRadioChange}
                selectedValue={this.state.radioValue}
            >
                <Radio label="汤" value="one" />
                <Radio label="沙拉" value="two" />
                <Radio label="三明治" value="three" />
            </RadioGroup>
        );
    }
}
