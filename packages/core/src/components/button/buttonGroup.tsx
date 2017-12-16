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

export interface IButtonGroupProps extends IProps, React.HTMLProps<HTMLDivElement> {
    /**
     * 按钮组是否应占用其容器的整个宽度。
     * @default false
     */
    fill?: boolean;

    /**
     * 是否应以迷你的风格显示子按钮。
     * @default false
     */
    minimal?: boolean;

    /**
     * 是否应以大的风格显示子按钮。
     * @default false
     */
    large?: boolean;

    /**
     * 按钮组是否应该以垂直风格显示。
     * @default false
     */
    vertical?: boolean;
}

// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
@PureRender
export class ButtonGroup extends React.Component<IButtonGroupProps, {}> {
    public static displayName = "Blueprint.ButtonGroup";

    public render() {
        const { className, fill, minimal, large, vertical, ...htmlProps } = this.props;
        const buttonGroupClasses = classNames(
            Classes.BUTTON_GROUP,
            {
                [Classes.FILL]: fill,
                [Classes.MINIMAL]: minimal,
                [Classes.LARGE]: large,
                [Classes.VERTICAL]: vertical,
            },
            className,
        );
        return (
            <div {...htmlProps} className={buttonGroupClasses}>
                {this.props.children}
            </div>
        );
    }
}
