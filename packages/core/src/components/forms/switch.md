@# Switches|开关

一个switch只是一个[复选框](#core/components/forms/checkbox)的替代外观，它模拟开/关而不是选中/未选中。

@reactExample SwitchExample

@## CSS API

@css pt-switch

@## JavaScript API

`Switch`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

```tsx
<Switch checked={this.state.isPublic} label="Public" onChange={this.handlePublicChange} />
```

请注意，此组件支持HTML`input`元素上可用的全部属性。最常用的选项在下面详细介绍。

@interface ISwitchProps
