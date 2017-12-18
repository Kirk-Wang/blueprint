@# Collapsible list 可折叠列表

`CollapsibleList`React组件接受菜单项目列表和可见项目的计数。它精确地显示了许多项目，并将其余部分折叠到下拉菜单中。所需的`visibleItemRenderer`回调属性允许使用`MenuItem`子元素中的属性自定义可见项的外观。

@reactExample CollapsibleListExample

@## JavaScript API

`CollapsibleList`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

`CollapsibleList`组件的子元素_必须_是`MenuItem`，这样他们可以很容易地在下拉列表中呈现。定义一个`visibleItemRenderer`回调来定制可见项的外观，使用它们的[`IMenuItemProps`](#core/components/menu.menu-item)。

@interface ICollapsibleListProps

@## Separators|分隔符

通常情况下，项目列表需要在每个项目之间进行分隔。将分隔符添加到`CollapsibleList`，通过使用CSS的`::after`伪元素很容易实现。

```css.scss
// pass `visibleItemClassName="my-list-item"` to component, then...

.my-list-item::after {
    display: inline-block;
    content: "";
    // custom separator styles...
}

// remove separator after the last item
.my-list-item:last-child::after {
    display: none;
}
```
