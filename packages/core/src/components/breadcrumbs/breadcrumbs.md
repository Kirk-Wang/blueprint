@# Breadcrumbs 面包屑

面包屑标识应用程序中的当前资源。

@## CSS API

* 从`ul.pt-breadcrumbs`开始；每个crumb都应该有自己的`li`作为直系后代。
* 面包屑通常是导航链接（例如，文件路径中的父文件夹，因此应该使用`<a>`标记（除了最后的面包屑）。
* 每个导航面包屑都应该使用`.pt-breadcrumb`。
* 用`.pt-disabled`类做一个非交互的面包屑。当您想要指示用户无法导航到面包屑（例如，如果用户没有访问权限）时，您应该只使用此状态。否则，点击面包屑应该把用户带到那个资源。
* 将最后的面包屑标记为`.pt-breadcrumb-current`，以强调外观。
* The `.pt-breadcrumbs-collapsed` button-like element can be used as the target for a dropdown menu
containing breadcrumbs that are collapsed due to layout constraints.
* When adding another element (such as a [tooltip](#core/components/tooltip) or
[popover](#core/components/popover)) to a breadcrumb, wrap it around the contents of the `li`.

@css pt-breadcrumbs

@## JavaScript API

The `Breadcrumb` component is available in the __@blueprintjs/core__ package.
Make sure to review the [general usage docs for JS components](#blueprint.usage).

The component renders an `a.pt-breadcrumb`. You are responsible for constructing
the `ul.pt-breadcrumbs` list. [`CollapsibleList`](#core/components/collapsiblelist)
works nicely with this component because its props are a subset of `IMenuItemProps`.

@interface IBreadcrumbProps
