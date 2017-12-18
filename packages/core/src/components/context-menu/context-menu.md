@# Context menus|上下文菜单

上下文菜单在用户右键单击时显示一个自定义的操作列表。

您可以通过以下任一方式创建上下文菜单：

- 通过将`@ContextMenuTarget`[装饰器](#core/components/context-menu.javascript-api--decorator)添加到实现`renderContextMenu(): JSX.Element`的React组件。
- 通过[命令式](#core/components/context-menu.javascript-api--imperative)的ContextMenu.show和ContextMenu.hide API方法，非常适用于基于非React的应用程序。

@reactExample ContextMenuExample

@## JavaScript API:装饰器

`ContextMenuTarget`装饰器在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

`@ContextMenuTarget`[类装饰器][ts-decorator]可以应用于任何满足以下要求的`React.Component`类：

- 它定义了一个名为`renderContextMenu()`的实例方法，它返回一个`JSX.Element`（多数可能是一个[`Menu`](#core/components/menu)）或`undefined`。
- 它的根元素支持`"contextmenu"`事件和`onContextMenu`属性。

如果装饰类使用一个内部元素（如`<div>`）作为它的根，则总是可以的。如果它使用自定义元素作为其根，则必须确保该元素的属性是正确实现的。

当用户触发装饰类上的`"contextmenu"`事件时，会调用`renderContextMenu()`。 如果`renderContextMenu()`返回一个元素，则浏览器的内置[上下文菜单][wiki-cm]被阻塞，它返回的元素将被显示在光标位置的`Popover`中。

如果实例有一个`onContextMenuClose`方法，当上下文菜单关闭时，装饰器将调用这个函数。

```tsx
import { ContextMenuTarget, Menu, MenuItem } from "@blueprintjs/core";

@ContextMenuTarget
class RightClickMe extends React.Component<{}, {}> {
    public render() {
        // 根元素必须支持`onContextMenu`
        return <div>{...}</div>;
    }

    public renderContextMenu() {
        // 返回一个单独的元素，或者没有使用默认的浏览器行为
        return (
            <Menu>
                <MenuItem onClick={this.handleSave} text="Save" />
                <MenuItem onClick={this.handleDelete} text="Delete" />
            </Menu>
        );
    }

    public onContextMenuClose() {
        // 上下文菜单关闭后调用的可选方法。
    }
}
```

[ts-decorator]: https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md
[wiki-cm]: https://en.wikipedia.org/wiki/Context_menu

@## JavaScript API: 命令式

`ContextMenu`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

命令式API提供了一个静态的`ContextMenu`对象，强制一次只能打开一个上下文菜单的原则。

- `ContextMenu.show(menu: JSX.Element, offset: IOffset, onClose?: () => void): void` &ndash;显示给定的元素，距离视口左上角给定的偏移量。菜单自动关闭以前显示的菜单。

菜单出现在这一点的右下方，但是如果屏幕上没有足够的空间，将会翻到左下方。此菜单关闭时调用可选的回调。

- `ContextMenu.hide(): void` &ndash; 隐藏上下文菜单，如果它是打开的。
- `ContextMenu.isOpen(): boolean` &ndash; 上下文菜单当前是否可见。

此API非常适合于非基于React的应用程序或以编程方式触发的菜单。

```tsx
import { ContextMenu, MenuFactory, MenuItemFactory } from "@blueprintjs/core";

const rightClickMe = document.query("#right-click-me") as HTMLElement;
rightClickMe.oncontextmenu = (e: MouseEvent) => {
    // 阻止浏览器的原生上下文菜单
    e.preventDefault();

    // 渲染没有JSX的菜单...
    const menu = MenuFactory({
        children: [
            MenuItemFactory({ onClick: handleSave, text: "Save" }),
            MenuItemFactory({ onClick: handleDelete, text: "Delete" }),
        ]
    });

    // 鼠标位置可用于事件
    ContextMenu.show(menu, { left: e.clientX, top: e.clientY }, () => {
        // 菜单关闭; 可选的回调
    });
};
```
