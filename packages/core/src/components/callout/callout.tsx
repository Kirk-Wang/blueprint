/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";

import { Classes, IIntentProps, IProps } from "../../common";
import { IconName } from "../icon/icon";

/** This component also supports the full range of HTML `<div>` props. */
export interface ICalloutProps extends IIntentProps, IProps {
    /** 要在左侧渲染的图标名称。 */
    iconName?: IconName;

    /**
     * 可选标题元素的字符串内容。
     *
     * 由于与HTML属性类型的冲突，为了提供JSX内容，只需将`<h5>JSX标题内容<h5>`作为第一个`children`元素来传递，而不是使用这个属性。
     */
    title?: string;
}

@PureRender
export class Callout extends React.Component<ICalloutProps & React.HTMLAttributes<HTMLDivElement>, {}> {
    public render() {
        const { className, children, iconName, intent, title, ...htmlProps } = this.props;
        const classes = classNames(
            Classes.CALLOUT,
            Classes.intentClass(intent),
            Classes.iconClass(iconName),
            className,
        );
        return (
            <div className={classes} {...htmlProps}>
                {title && <h5>{title}</h5>}
                {children}
            </div>
        );
    }
}
