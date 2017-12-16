/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { Classes, Intent } from "@blueprintjs/core";
import * as React from "react";

const INTENTS = [
    { label: "无", value: Intent.NONE },
    { label: "主要", value: Intent.PRIMARY },
    { label: "成功", value: Intent.SUCCESS },
    { label: "警告", value: Intent.WARNING },
    { label: "危险", value: Intent.DANGER },
];

export interface IIntentSelectProps {
    intent: Intent;
    onChange: React.FormEventHandler<HTMLSelectElement>;
}

export const IntentSelect: React.SFC<IIntentSelectProps> = props => (
    <label className={Classes.LABEL}>
        视觉意图
        <div className={Classes.SELECT}>
            <select value={props.intent} onChange={props.onChange}>
                {INTENTS.map((opt, i) => (
                    <option key={i} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    </label>
);
