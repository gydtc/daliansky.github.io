---
title: 用百度编辑器ueditor编辑dedecms的栏目内容失败的解决方法
tags:
  - dede
  - dedecms
  - ueditor
  - 百度
  - 编辑器
id: 1389
categories:
  - linux
date: 2015-06-18 13:57:32
---

修改：/dede/templets/article_edit.htm catalog_add.htm catalog_edit.htm

```sh
function checkSubmit()
{
if(document.form1.typename.value==""){
alert("栏目名称不能为空!");
document.form1.typename.focus();
return false;
}
document.getElementsByName("content")[0].innerHTML = ue.getContent();
return true;
}
```

