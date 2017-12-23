@# Text inputs|文本框

在`input[type="text"]`上使用`pt-input`类。您还应该指定`dir="auto"`[以更好地支持RTL语言](http://www.w3.org/International/questions/qa-html-dir#dirauto)（在除Internet Explorer之外的所有浏览器中）。

@css pt-input

@## Search field|搜索栏

将`<input>`元素的`type`属性更改为`“search”`使其看起来像一个搜索栏，使其具有一个圆润的外观。这种风格相当于`.pt-round`修饰符，但它自动适用于`[type="search"]`输入。

请注意，某些浏览器还实现了`esc`键的处理程序来清除搜索栏中的文本。

@css pt-input.pt-search
