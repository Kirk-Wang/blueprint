@# Breadcrumbs 面包屑

面包屑标识应用程序中的当前资源。

@## CSS API

* 从`ul.pt-breadcrumbs`开始；每个crumb都应该有自己的`li`作为直系后代。
* 面包屑通常是导航链接（例如，文件路径中的父文件夹，因此应该使用`<a>`标记（除了最后的面包屑）。
* 每个导航面包屑都应该使用`.pt-breadcrumb`。
* 用`.pt-disabled`类做一个非交互的面包屑。当您想要指示用户无法导航到面包屑（例如，如果用户没有访问权限）时，您应该只使用此状态。否则，点击面包屑应该把用户带到那个资源。
* 将最后的面包屑标记为`.pt-breadcrumb-current`，以强调外观。
* `.pt-breadcrumbs-collapsed`按钮式元素可以用作下拉菜单包含由于布局约束而折叠的面包屑。
* 当向面包屑添加另一个元素（如[tooltip](#core/components/tooltip)或[popover](#core/components/popover)）时，将其包裹在`li`的内容中。

@css pt-breadcrumbs

@## JavaScript API

`Breadcrumb`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

该组件渲染为一个`a.pt-breadcrumb`。 你负责构建`ul.pt-breadcrumbs`列表。 [`CollapsibleList`](#core/components/collapsiblelist)与这个组件协作的很好，因为它的属性是`IMenuItemProps`的一个子集。

@interface IBreadcrumbProps
