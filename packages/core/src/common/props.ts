/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import { IconName } from "../generated/iconName";
import { Intent } from "./intent";

export type HTMLInputProps = React.HTMLProps<HTMLInputElement>;

/**
 * A shared base interface for all Blueprint component props.
 */
export interface IProps {
    /** 传递给子元素的以空格分隔的类名列表。 */
    className?: string;
}

export interface IIntentProps {
    /** 应用到元素的视觉意图颜色。 */
    intent?: Intent;
}

/**
 * Interface for a clickable action, such as a button or menu item.
 * These props can be spready directly to a `<Button>` or `<MenuItem>` element.
 */
export interface IActionProps extends IIntentProps, IProps {
    /** action是否是非交互。 */
    disabled?: boolean;

    /** 添加到按钮的图标名称（`pt-icon-`之后的部分）。 */
    iconName?: IconName;

    /** 点击事件处理程序。 */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;

    /** action文本。 */
    text?: string;
}

/** Interface for a link, with support for customizing target window. */
export interface ILinkProps {
    /** 链接 URL。 */
    href?: string;

    /** 链接目标属性。使用`“_blank”`在新窗口中打开。 */
    target?: string;
}

/** Interface for a controlled input. */
export interface IControlledProps {
    /** input的初始值，用于不受控使用。 */
    defaultValue?: string;

    /** 更改事件处理程序。使用`event.target.value`作为新的值。 */
    onChange?: React.FormEventHandler<HTMLElement>;

    /** input的表单值，用于受控使用。 */
    value?: string;
}

/**
 * 列表中选项的接口， 例如在`<select>`或`RadioGroup`中。
 * 这些属性可以直接传播到一个`<option>`或`<Radio>`元素。
 */
export interface IOptionProps extends IProps {
    /** 这个选项是否是非交互式的。 */
    disabled?: boolean;

    /** 此选项标签文本。 */
    label: string;

    /** 这个选项的值。 */
    value: string;
}

/** A collection of curated prop keys used across our Components which are not valid HTMLElement props. */
const INVALID_PROPS = [
    "active",
    "containerRef",
    "elementRef",
    "iconName",
    "inputRef",
    "intent",
    "inline",
    "loading",
    "leftIconName",
    "onChildrenMount",
    "onRemove",
    "popoverProps",
    "rightElement",
    "rightIconName",
    "text",
];

/**
 * Typically applied to HTMLElements to filter out blacklisted props. When applied to a Component,
 * can filter props from being passed down to the children. Can also filter by a combined list of
 * supplied prop keys and the blacklist (only appropriate for HTMLElements).
 * @param props The original props object to filter down.
 * @param {string[]} invalidProps If supplied, overwrites the default blacklist.
 * @param {boolean} shouldMerge If true, will merge supplied invalidProps and blacklist together.
 */
export function removeNonHTMLProps(
    props: { [key: string]: any },
    invalidProps = INVALID_PROPS,
    shouldMerge = false,
): { [key: string]: any } {
    if (shouldMerge) {
        invalidProps = invalidProps.concat(INVALID_PROPS);
    }

    return invalidProps.reduce(
        (prev, curr) => {
            if (prev.hasOwnProperty(curr)) {
                delete (prev as any)[curr];
            }
            return prev;
        },
        { ...props },
    );
}
