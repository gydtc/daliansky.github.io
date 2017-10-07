---
title: CPUFriend的安装与使用
urlname: CPUFriend-Installation-and-Usage
date: 2017-09-14 09:38:16
tags:
- CPUFriend
- Lilu
- Plugins
- CPU变频
- 插件
categories:
- 教程
---
CPUFriend安装和使用
===================================

#### 系统要求
`CPUFriend` 需要macOS ***v10.8***或更高版本

#### 安装
强烈建议让引导程序注入`CPUFriend`，否则您将需要[LiluFriend](https://github.com/PMheart/LiluFriend)，以确保`CPUFriend`正常工作。

#### 可用的内核标志
添加`-cpufdbg`以启用调试日志记录（仅在DEBUG二进制文件中可用）
添加`-cpufoff`来关闭`CPUFriend`
添加`-cpufbeta`以在不支持的操作系统版本上启用`CPUFriend`

#### 配置
使用`CPUFriend/ResourceConverter.sh`生成`CPUFriendProvider.kext`或`ssdt_data.dsl`的工作副本。如果您还有[ssdtPRGen.sh](https://github.com/Piker-Alpha/ssdtPRGen.sh)生成的SSDT，则可能需要合并它们。我不建议暂时添加这样的支持。所以我建议你使用`CPUFriendProvider.kext`存储您的定制数据。

#### ResourceConverter.sh的使用
执行命令如下：

`./ResourceConverter.sh --kext "/Users/sky/Desktop/Mac-CAD6701F7CEA0921.plist"

它会在当前目录生成`CPUFriendProvider.kext`,将`CPUFriendProvider.kext`和[CPUFriend.kext](https://github.com/PMheart/CPUFriend/releases)复制到`/EFI/Clover/kexts/Other`，重建缓存，然后重启。

说明：
> 其中的`/Users/sky/Desktop/Mac-CAD6701F7CEA0921.plist`是我自行修改的，可以通过直接调用系统提供的`/System/Library/Extensions/IOPlatformPluginFamily.kext/Contents/PlugIns/X86PlatformPlugin.kext/Contents/Resources/Mac-CAD6701F7CEA0921.plist`

`--kext "file"` 用"file"提供的信息创建`CPUFriendProvider.kext`

`--acpi "file"` 使用"file"提供的信息创建`ssdt_data.dsl`

注意：
- 创建的 kext/ssdt 位于当前工作目录中
- 变量 `"file"` 应该是 `/System/Library/Extensions/IOPlatformPluginFamily.kext/Contents/PlugIns/X86PlatformPlugin.kext/Contents/Resources` 中的一个完整的plist，具有某些修改，而不是像原始的 `FrequencyVectors` 条目

#### 原文链接
[CPUFriend Installation & Usage](https://github.com/PMheart/CPUFriend/blob/master/Instructions.md)

#### QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


