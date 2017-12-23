/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
import { IIntentProps, IProps } from "../../common/props";

export interface ITextAreaProps extends React.AllHTMLAttributes<HTMLTextAreaElement>, IIntentProps, IProps {
    /**
     * 文本区域是否应占用其容器的整个宽度。
     */
    fill?: boolean;

    /**
     * 文本区域是否应该以较大的样式显示。
     */
    large?: boolean;
}

// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
@PureRender
export class TextArea extends React.Component<ITextAreaProps, {}> {
    public static displayName = "Blueprint.TextArea";

    public render() {
        const { className, fill, intent, large, ...htmlProps } = this.props;

        const rootClasses = classNames(
            Classes.INPUT,
            Classes.intentClass(intent),
            {
                [Classes.FILL]: fill,
                [Classes.LARGE]: large,
            },
            className,
        );

        return <textarea {...htmlProps} className={rootClasses} />;
    }
}

export const TextAreaFactory = React.createFactory(TextArea);
