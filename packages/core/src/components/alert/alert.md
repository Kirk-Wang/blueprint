@# Alerts 警告提示

警告提示用户重要信息并强制他们在继续之前确认警告提示。

尽管与[dialogs](#core/components/dialog)类似，但警告的限制性更强，只能用于重要信息。用户只能通过点击其中一个确认按钮退出警告，点击覆盖层或按`esc`键不会关闭警告。

您只能在受控模式下使用此组件。在主要和辅助动作属性中使用`onClick`处理程序来处理关闭`Alert`。或者，在主体旁边显示图标以展示警告的类型。

@reactExample AlertExample

@## JavaScript API

`Alert`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

@interface IAlertProps
