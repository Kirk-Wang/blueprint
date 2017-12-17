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
    /** Initial value of the input, for uncontrolled usage. */
    defaultValue?: string;

    /** Change event handler. Use `event.target.value` for new value. */
    onChange?: React.FormEventHandler<HTMLElement>;

    /** Form value of the input, for controlled usage. */
    value?: string;
}

/**
 * An interface for an option in a list, such as in a `<select>` or `RadioGroup`.
 * These props can be spread directly to an `<option>` or `<Radio>` element.
 */
export interface IOptionProps extends IProps {
    /** Whether this option is non-interactive. */
    disabled?: boolean;

    /** Label text for this option. */
    label: string;

    /** Value of this option. */
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
