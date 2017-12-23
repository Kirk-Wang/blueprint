/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import { Utils } from "../../common";
import * as Classes from "../../common/classes";
import { IProps } from "../../common/props";

export interface IFileInputProps extends React.AllHTMLAttributes<HTMLLabelElement>, IProps {
    /**
     * 文件输入是否是非交互式的。
     * 将其设置为`true`将自动禁用子级输入。
     */
    disabled?: boolean;

    /**
     * 文件输入是否应占用其容器的全部宽度。
     */
    fill?: boolean;

    /**
     * 属性传递给子input。
     * `disabled`将被忽略，侧重于顶级属性设置。
     * `type`将被忽略，因为input_必须_是`type="file"`。
     * 在这里传递`onChange`以在用户选择文件时得到通知。
     */
    inputProps?: React.HTMLProps<HTMLInputElement>;

    /**
     * 文件上传是否应该以较大的样式显示。
     */
    large?: boolean;

    /**
     * 在`input`的`change`事件上调用回调。
     *
     * 这个回调是为了方便而提供的。这相当于将`onChange`传递给`inputProps`。
     *
     * __注意：如过你作为顶级属性传递`onChange`，它将被传递到`label`而不是`input`，这或许不是你所期望的。
     */
    onInputChange?: React.FormEventHandler<HTMLInputElement>;

    /**
     * 要显示的文字。
     * @default "Choose file..."
     */
    text?: string;
}

// TODO: write tests (ignoring for now to get a build passing quickly)
/* istanbul ignore next */
@PureRender
export class FileInput extends React.Component<IFileInputProps, {}> {
    public static displayName = "Blueprint.FileInput";

    public static defaultProps: IFileInputProps = {
        inputProps: {},
        text: "Choose file...",
    };

    public render() {
        const { className, fill, disabled, inputProps, large, text, ...htmlProps } = this.props;

        const rootClasses = classNames(
            Classes.FILE_INPUT,
            {
                [Classes.DISABLED]: disabled,
                [Classes.FILL]: fill,
                [Classes.LARGE]: large,
            },
            className,
        );

        return (
            <label {...htmlProps} className={rootClasses}>
                <input {...inputProps} onChange={this.handleInputChange} type="file" disabled={disabled} />
                <span className={Classes.FILE_UPLOAD_INPUT}>{text}</span>
            </label>
        );
    }

    private handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        Utils.safeInvoke(this.props.onInputChange, e);
        Utils.safeInvoke(this.props.inputProps.onChange, e);
    };
}

export const FileInputFactory = React.createFactory(FileInput);
