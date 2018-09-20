---
title: 'Webmin的Mysql模块中警告缺少DBI和DBD::mysql的处理方法'
date: 2018-05-09 10:37:02
urlname: Webmin-Mysql-module-warns-of-the-lack-of-DBI-and-DBD-mysql-processing
tags: 
- 运维
- FreeBSD
- Mysql
- Webmin
categories: 
- 运维
---

好久没使用`Webmin`进行服务器的控制了，今天登录`Webmin`想查询下`mysql`的数据，打开`mysql`模板的时候，系统显示**警告：您的系统未安装Perl模块DBI和DBD::mysql，Webmin将无法可靠地访问您的Mysql数据库。点击此处立刻安装它们**的提示信息，通过搜索查询到的解决方案是安装`perl-DBD-Mysql`，使用命令：`pkg install perl-DBD-Mysql`，它顺利地执行完；但是返回`Webmin`的`Mysql`模块中，系统提示`Mysql未安装`，当时惊出一身冷汗，通过终端回拉输出信息，发现把`mariadb102-server`给删除了，转为安装了`mysql56-server`。这可不是我想要的结果，于是重新安装了`mariadb102-server`。

## 使用`cpan`的命令行安装缺失的`perl module`：

打开终端，输入命令：

```bash
cpan
```

出现`cpan shell`的命令行，在提示符后输入以下命令：

```perl
cpan[1]> install DBI
cpan[2]> install DBD::mysql
cpan[3]> q
```

缺失的模块安装后，再返回`Mysql`模块就不会再显示这个警告信息了。