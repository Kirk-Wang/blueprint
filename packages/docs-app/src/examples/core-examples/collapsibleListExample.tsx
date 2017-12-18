/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as React from "react";

import {
    Classes,
    CollapseFrom,
    CollapsibleList,
    IMenuItemProps,
    MenuItem,
    RadioGroup,
    Slider,
} from "@blueprintjs/core";
import { BaseExample, handleNumberChange } from "@blueprintjs/docs";

export interface ICollapsibleListExampleState {
    collapseFrom?: CollapseFrom;
    visibleItemCount?: number;
}

const COLLAPSE_FROM_RADIOS = [
    { className: Classes.INLINE, label: "开端", value: CollapseFrom.START.toString() },
    { className: Classes.INLINE, label: "末端", value: CollapseFrom.END.toString() },
];

export class CollapsibleListExample extends BaseExample<ICollapsibleListExampleState> {
    public state: ICollapsibleListExampleState = {
        collapseFrom: CollapseFrom.START,
        visibleItemCount: 3,
    };

    private handleChangeCollapse = handleNumberChange(collapseFrom => this.setState({ collapseFrom }));

    protected renderExample() {
        return (
            <CollapsibleList
                {...this.state}
                className={Classes.BREADCRUMBS}
                dropdownTarget={<span className={Classes.BREADCRUMBS_COLLAPSED} />}
                visibleItemRenderer={this.renderBreadcrumb}
            >
                <MenuItem iconName="folder-close" text="所有文件" href="#" />
                <MenuItem iconName="folder-close" text="用户" href="#" />
                <MenuItem iconName="folder-close" text="Jane Person" href="#" />
                <MenuItem iconName="folder-close" text="我的文档" href="#" />
                <MenuItem iconName="folder-close" text="Classy dayjob" href="#" />
                <MenuItem iconName="document" text="How to crush it" />
            </CollapsibleList>
        );
    }

    protected renderOptions() {
        return [
            [
                <label className={Classes.LABEL} key="visible-label">
                    可见项
                </label>,
                <Slider
                    key="visible"
                    max={6}
                    onChange={this.handleChangeCount}
                    showTrackFill={false}
                    value={this.state.visibleItemCount}
                />,
            ],
            [
                <RadioGroup
                    key="collapseFrom"
                    name="collapseFrom"
                    label="折叠方向"
                    onChange={this.handleChangeCollapse}
                    options={COLLAPSE_FROM_RADIOS}
                    selectedValue={this.state.collapseFrom.toString()}
                />,
            ],
        ];
    }

    private renderBreadcrumb(props: IMenuItemProps) {
        if (props.href != null) {
            return <a className={Classes.BREADCRUMB}>{props.text}</a>;
        } else {
            return <span className={classNames(Classes.BREADCRUMB, Classes.BREADCRUMB_CURRENT)}>{props.text}</span>;
        }
    }

    private handleChangeCount = (visibleItemCount: number) => this.setState({ visibleItemCount });
}
