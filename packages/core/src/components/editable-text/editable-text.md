@# Editable text 可编辑文本

`EditableText`看起来像普通的UI文本，但是当用户聚焦它的时候会转换成文本输入框。

文本输入继承了其祖先的所有字体样式，使阅读和编辑文本之间的过渡无缝。

您可以使用此组件进行内联重命名，或者使用[可编辑多行描述](#core/components/editable-text.multiline-mode)。
当一个静态可编辑的`<input>`或`<textarea>`标签就足够了时，不应该使用`EditableText`。

<div class="pt-callout pt-intent-danger pt-icon-error">
    <h5>居中组件</h5>
    **不要使用`text-align: center`来居中这个组件**，因为它会在浏览器中造成无限循环（[更多细节](https://github.com/JedWatson/react-select/issues/540)）。
    相反，您应该通过flexbox或者`position`和`transform: translateX(-50%)`将组件居中。
</div>

@reactExample EditableTextExample

@## JavaScript API

`EditableText`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

`EditableText`可以像[`input`元素]（https://facebook.github.io/react/docs/forms.html）一样使用，并通过`value`或`defaultValue`属性分别支持受控或非受控的使用。

`onConfirm`和`onCancel`回调是基于用户交互调用的。用户按下`enter`或失去焦点来输入确认当前值，或者按`esc`来取消。取消将字段重置为上次确认的值。如果值不变，则不会调用回调。

默认情况下，`EditableText`支持_刚好一行文本_，并根据文本的长度进行水平增长或缩小。有关[多行支持](#core/components/editable-text.multiline-mode)的信息，请参阅下文。

@interface IEditableTextProps

@## Multiline mode|多行模式

```tsx
<EditableText multiline minLines={3} maxLines={12} {...props} />
```

提供`multiline`属性以创建跨越多行的`EditableText`字段。多行模式使用`<textarea>`代替`<input type="text">`来支持多行文本。

用户通过按`ctrl` `enter`或`cmd` `enter`，而不是简单的`enter`确认多行模式下的文本。（按下`enter`键将光标移动到下一行。）

此外，在多行模式下，组件的宽度固定为100％。它根据文本的行数而_垂直_增长或缩小。您可以使用`minLines`和`maxLines`属性约束组件的垂直大小。

<div class="pt-callout pt-intent-warning pt-icon-warning-sign">
    <h5>多行属性格式</h5>
    你应该把`multiline`声明为一个无值的boolean属性，如上例（`<EditableText multiline ...>`）。
    这可以防止您在声明后更改该值，从而为用户提供次优体验（多行文本并不总是呈现为单行）。
</div>
