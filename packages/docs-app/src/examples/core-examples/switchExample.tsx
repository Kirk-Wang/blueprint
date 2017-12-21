/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import { Classes, Switch } from "@blueprintjs/core";
import { BaseExample } from "@blueprintjs/docs";

export class SwitchExample extends BaseExample<{}> {
    protected renderExample() {
        return (
            <div>
                <label className={Classes.LABEL}>隐私设置</label>
                <Switch labelElement={<strong>启用</strong>} />
                <Switch labelElement={<em>公开</em>} />
                <Switch labelElement={<u>协同</u>} defaultChecked={true} />
                <small>
                    这个例子使用<code>labelElement</code>来演示JSX标签。
                </small>
            </div>
        );
    }
}
