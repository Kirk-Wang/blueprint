@# File input|文件上传

使用标准的`input type="file"`和具有`pt-file-upload-input`类的`span`，包裹他们在一个具有`pt-file-input`类的`label`中。

<div class="pt-callout pt-intent-warning pt-icon-warning-sign">
    <h5>静态文件名称</h5>
    文件名不会更新文件选择。为了得到这个行为，你必须在JS中另外实现它。
</div>

@## CSS API

@css pt-file-input

@## JavaScript API

`FileInput`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

这个组件是围绕相应CSS API的简单包装器。它支持全部的HTML属性。

```tsx
<FileInput disabled={true} text="选择文件..." onInputChange={...} />
```

@interface IFileInputProps
