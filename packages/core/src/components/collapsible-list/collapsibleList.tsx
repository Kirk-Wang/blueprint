/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as classNames from "classnames";
import * as React from "react";

import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { Position } from "../../common/position";
import { IProps } from "../../common/props";
import { Menu } from "../menu/menu";
import { IMenuItemProps, MenuItem } from "../menu/menuItem";
import { IPopoverProps, Popover } from "../popover/popover";

type CollapsibleItem = React.ReactElement<IMenuItemProps>;

export enum CollapseFrom {
    START,
    END,
}

export interface ICollapsibleListProps extends IProps {
    /**
     * 元素作为下拉列表渲染的目标，通过`CLICK`交互显示折叠菜单
     */
    dropdownTarget: JSX.Element;

    /**
     * 传递到下拉列表的属性。
     */
    dropdownProps?: IPopoverProps;

    /**
     * 被调用来渲染每个可见项目的回调。该项目将被包裹在一个带有可选的`visibleItemClassName`属性的`li`中。
     */
    visibleItemRenderer: (props: IMenuItemProps, index: number) => JSX.Element;

    /**
     * 项目应该从哪个方向折叠：子元素的开始或结束。
     * @default CollapseFrom.START
     */
    collapseFrom?: CollapseFrom;

    /**
     * 添加到`<li>`标签的CSS类名称，包含每个可见项目和下拉列表。
     */
    visibleItemClassName?: string;

    /**
     * 确切的可见项目数量。
     * @default 3
     */
    visibleItemCount?: number;
}

export class CollapsibleList extends React.Component<ICollapsibleListProps, {}> {
    public static displayName = "Blueprint.CollapsibleList";

    public static defaultProps: ICollapsibleListProps = {
        collapseFrom: CollapseFrom.START,
        dropdownTarget: null,
        visibleItemCount: 3,
        visibleItemRenderer: null,
    };

    public render() {
        const { collapseFrom } = this.props;
        const childrenLength = React.Children.count(this.props.children);
        const [visibleChildren, collapsedChildren] = this.partitionChildren();

        const visibleItems = visibleChildren.map((child: CollapsibleItem, index: number) => {
            const absoluteIndex = collapseFrom === CollapseFrom.START ? childrenLength - 1 - index : index;
            return (
                <li className={this.props.visibleItemClassName} key={absoluteIndex}>
                    {this.props.visibleItemRenderer(child.props, absoluteIndex)}
                </li>
            );
        });
        if (collapseFrom === CollapseFrom.START) {
            // reverse START list so separators appear before items
            visibleItems.reverse();
        }

        // construct dropdown menu for collapsed items
        let collapsedPopover: JSX.Element;
        if (collapsedChildren.length > 0) {
            const position = collapseFrom === CollapseFrom.END ? Position.BOTTOM_RIGHT : Position.BOTTOM_LEFT;
            collapsedPopover = (
                <li className={this.props.visibleItemClassName}>
                    <Popover
                        content={<Menu>{collapsedChildren}</Menu>}
                        position={position}
                        {...this.props.dropdownProps}
                    >
                        {this.props.dropdownTarget}
                    </Popover>
                </li>
            );
        }

        return (
            <ul className={classNames(Classes.COLLAPSIBLE_LIST, this.props.className)}>
                {collapseFrom === CollapseFrom.START ? collapsedPopover : null}
                {visibleItems}
                {collapseFrom === CollapseFrom.END ? collapsedPopover : null}
            </ul>
        );
    }

    // splits the list of children into two arrays: visible and collapsed
    private partitionChildren(): [CollapsibleItem[], CollapsibleItem[]] {
        if (this.props.children == null) {
            return [[], []];
        }
        const childrenArray = React.Children.map(this.props.children, (child: JSX.Element, index: number) => {
            if (child.type !== MenuItem) {
                throw new Error(Errors.COLLAPSIBLE_LIST_INVALID_CHILD);
            }
            return React.cloneElement(child, { key: `visible-${index}` });
        });
        if (this.props.collapseFrom === CollapseFrom.START) {
            // reverse START list so we can always slice visible items from the front of the list
            childrenArray.reverse();
        }
        const { visibleItemCount } = this.props;
        return [childrenArray.slice(0, visibleItemCount), childrenArray.slice(visibleItemCount)];
    }
}

export const CollapsibleListFactory = React.createFactory(CollapsibleList);
