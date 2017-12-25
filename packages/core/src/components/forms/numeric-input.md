@# Numeric inputs|数字输入框

`NumericInput`组件提供了用于轻松输入，递增和递减数字值的控件。

@## Interactions|交互

数字输入框中的值可以使用键盘和鼠标交互进行递增或递减。

##### 键盘交互

- `↑/↓` - 值更改一步（默认值：`±1`）
- `Shift + ↑/↓` - 将该值更改一大步（默认值：`±10`）
- `Alt + ↑/↓` - 改变一个小步的值（默认：`±0.1`）

##### 鼠标交互

- `Click ⌃/⌄` - 值更改一步（默认值：`±1`）
- `Shift + Click ⌃/⌄` - 将该值更改一大步（默认值：`±10`）
- `Alt + Click ⌃/⌄` - 改变一个小步的值（默认：`±0.1`）

@## Basic example|基本的例子

这个例子显示`NumericInput`是如何工作的。 它支持上面列出的基本键盘和鼠标交互，以及基本的键盘输入：

@reactExample NumericInputBasicExample

@## Extended example|扩展示例

这个例子展示了如何将`NumericInput`扩展到核心功能之外。它支持上面的基本交互以及以下每种输入：

- **数字缩写**（例如`2.1k`，`-0.3m`）
- **科学记数法**（例如`2.1e3`，`-0.3e6`）
- **加法和减法表达式**（例如`3 + 2`，`0.1m - 5k + 1`）

当按下`Enter`键（通过一个自定义的`onKeyDown`回调函数）和当这个字段失去焦点时（通过一个自定义的`onBlur`回调函数），这些特殊情况的输入被评估。如果这些回调触发时输入无效，该字段将被清除。

<div class="pt-callout pt-intent-primary pt-icon-info-sign">
    这个例子包含非核心功能，用来演示`NumericInput`组件的可扩展性。自定义评估代码的正确性尚未经过严格测试。
</div>

@reactExample NumericInputExtendedExample

@## JavaScript API

`NumericInput`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

@interface INumericInputProps

@### Responsive numeric inputs|响应式数字输入

`NumericInput`可以用修改常规[控件组](#core/components/forms/control-group)的相同CSS类来设置样式。`NumericInput`最合适的修饰符是`pt-fill`，当它作为`className`传递时，将使组件展开以填充所有可用的宽度。

@### Uncontrolled mode|不受控模式

默认情况下，这个组件将以不受控的模式运行，管理自己的所有状态。在不受控的模式下，只需在属性上提供一个`onValueChange`回调就可以在用户操作的时候访问这个值。该值将作为数字和字符串提供给回调。

```tsx
import { NumericInput } from "@blueprintjs/core";

export class NumericInputExample extends React.Component<{}, {}> {
    public render() {
        return (
            <NumericInput onValueChange={this.handleValueChange} />
        );
    }

    private handleValueChange = (valueAsNumber: number, valueAsString: string) => {
        console.log("Value as number:", valueAsNumber);
        console.log("Value as string:", valueAsString);
    }
}
```

@### Controlled mode|受控模式

如果您希望更好地控制数字输入的行为，则可以指定`value`属性以**受控模式**使用组件。数字输入支持任意文本输入--不仅仅是数字–-所以`value`可以是数字或字符串。

任意文本输入，受控模式和自定义回调的组合支持使得以有效的方式扩展数字输入的基本功能成为可能。 如上例所示，可以扩展数字输入组件，支持数学表达式，如下所示：

```tsx
import { NumericInput } from "@blueprintjs/core";
import * as SomeLibrary from "some-library";

export class NumericInputExample extends React.Component<{}, { value?: number |
string }> {
    public state = { value: null };

    public render() {
        return (
            <NumericInput
                onValueChange={this.handleValueChange}
                value={this.state.value}
            />
        );
    }

    private handleValueChange = (_valueAsNumber: number, valueAsString: string) {
        const result = SomeLibrary.evaluateMathExpression(valueAsString);
        this.setState({ value: result });
    }
}
```
