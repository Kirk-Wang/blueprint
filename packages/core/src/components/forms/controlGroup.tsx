/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
import { IProps } from "../../common/props";

export interface IControlGroupProps extends React.AllHTMLAttributes<HTMLDivElement>, IProps {
    /**
     * 控件组是否应占用其容器的整个宽度。
     */
    fill?: boolean;

    /**
     * 按钮组是否应该以垂直样式显示。
     */
    vertical?: boolean;
}

// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
@PureRender
export class ControlGroup extends React.Component<IControlGroupProps, {}> {
    public static displayName = "Blueprint.ControlGroup";

    public render() {
        const { children, className, fill, vertical, ...htmlProps } = this.props;

        const rootClasses = classNames(
            Classes.CONTROL_GROUP,
            {
                [Classes.FILL]: fill,
                [Classes.VERTICAL]: vertical,
            },
            className,
        );

        return (
            <div {...htmlProps} className={rootClasses}>
                {children}
            </div>
        );
    }
}

export const ControlGroupFactory = React.createFactory(ControlGroup);
