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

export interface ILabelProps extends React.AllHTMLAttributes<HTMLDivElement>, IProps {
    /**
     * 标签是否是非交互式的。
     * 确保显式禁用任何子控件。
     */
    disabled?: boolean;

    /** 显示在标签旁边的帮助文本。 */
    helperText?: React.ReactNode;

    /** 要在标签中显示的文字。 */
    text: React.ReactNode;
}

// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
@PureRender
export class Label extends React.Component<ILabelProps, {}> {
    public static displayName = "Blueprint.Label";

    public render() {
        const { children, className, disabled, helperText, text, ...htmlProps } = this.props;

        const rootClasses = classNames(
            Classes.LABEL,
            {
                [Classes.DISABLED]: disabled,
            },
            className,
        );

        return (
            <div {...htmlProps} className={rootClasses}>
                {text}
                <span className={classNames(Classes.TEXT_MUTED)}>{helperText}</span>
                {children}
            </div>
        );
    }
}

export const LabelFactory = React.createFactory(Label);
