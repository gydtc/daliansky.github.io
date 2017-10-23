---
title: High Sierra全新安装或者升级时禁止进行APFS转换
urlname: Guide-High-Sierra-prohibits-APFS-conversion-when-installing-or-upgrading
date: 2017-09-30 15:56:29
tags:
- 10.13
- High Sierra
- APFS
- 转换
- Guide
- conversion
categories:
- 教程
- 指南
---

# [指南]High Sierra全新安装或者升级时禁止进行APFS转换
> 假设安装的分区为 `test` ，挂载路径为 `/Volumes/test`

如您所知，macOS High Sierra包括一个新的文件系统APFS。 如果您的系统驱动器是固态，安装程序将在新的安装方案和更新方案中将HFS + J转换为APFS。 

幸运的是，这种自动转换有一些方法。 它由 `/macOS Install Data/minstallconfig.xml` 中的` ConvertToAPFS` 选项控制。 

## 升级
升级方案比新安装程序稍微简单一些，因为我们可以运行一个命令行工具，可以使用命令行选项将 `ConvertToAPFS` 设置为 `false` 。 

下载10.13安装程序后，请退出。打开终端，输入命令：

`/Applications/"Install macOS High Sierra.app"/Contents/Resources/startosinstall --converttoapfs NO --agreetolicense --volume /Volumes/test`
系统将复制一些文件，然后重新启动，您将可以启动安装程序（无需APFS转换），方法是在 `Clover` 中引导 `Boot macOS Install from test` 选项。 

## 全新安装
假设您已经创建了一个用于全新安装的HFS+格式的U盘，如果安装目标是SSD，安装程序仍将转换为APFS。
为避免这种情况，在运行安装程序(第一阶段)之后，并且在首次重新启动之后(第二阶段之前)，重新通过 `Clover` 选择进入U盘 `Boot OS X Install from Install macOS High Sierra`，打开终端，进入要安装的系统分区(假设安装分区为 `test` )：

```sh
cd /Volume/test
cd "macOS Install Data"
vi minstallconfig.xml
```
将 

```xml
<key>ConvertToAPFS</key>
<true/>
```
修改为：

```xml
<key>ConvertToAPFS</key>
<false/>
```
输入:wq保存退出
> vi编辑器的用法请自行脑补或者google

重启，在 `Clover` 中引导 `Boot macOS Install from test` 选项，进入第二阶段完成安装，您得到的是一个未转换成 `APFS` 的 `HFS+` 分区格式的系统。

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)

