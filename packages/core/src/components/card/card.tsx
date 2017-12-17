/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
import { IProps } from "../../common/props";

export interface ICardProps extends IProps {
    /**
     * 控制卡片下方阴影的强度：高度越高，阴影越高。在高度`0`处，不应用阴影。
     * @default 0
     */
    elevation?: Elevation;

    /**
     * 卡片是否应该响应用户交互。如果设置为`true`，则悬停在卡片上将增加卡片的高度，并将鼠标光标改为指针。
     *
     * 当`onClick`也被定义时推荐。
     * @default false
     */
    interactive?: boolean;

    /**
     * 单击卡片时调用的回调。
     * 当`interactive`是`true`时推荐。
     */
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export enum Elevation {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
}

const ELEVATION_CLASSES = [
    Classes.ELEVATION_0,
    Classes.ELEVATION_1,
    Classes.ELEVATION_2,
    Classes.ELEVATION_3,
    Classes.ELEVATION_4,
];

@PureRender
export class Card extends React.Component<ICardProps, {}> {
    public static displayName = "Blueprint.Card";
    public static defaultProps: ICardProps = {
        elevation: Elevation.ZERO,
        interactive: false,
    };

    public render() {
        return (
            <div className={this.getClassName()} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }

    private getClassName() {
        const { elevation, interactive, className } = this.props;
        return classNames(
            Classes.CARD,
            { [Classes.INTERACTIVE]: interactive },
            ELEVATION_CLASSES[elevation],
            className,
        );
    }
}
