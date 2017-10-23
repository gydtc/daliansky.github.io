---
title: MacOS多系统下蓝牙设备的自动连接
urlname: MacOS-multi-system-Bluetooth-device-automatically-connected
date: 2017-10-06 21:52:35
tags:
- BlueTooth
- 蓝牙
- 鼠标
- Mouse
- 10.13
- 10.12
categories:
- 教程
---

# MacOS多系统下蓝牙设备的自动连接
> 因为测试的需要，我的DELL燃7000笔记本上面同时安装了三套MacOS系统。
> 我使用的是logitech的M557蓝牙鼠标，当我在一套系统下面配对使用后，切换到另一套MacOS系统，需要重新配对使用；再切换回到前一个系统还需要重新配对。
> 我的需求是希望把配对好的蓝牙设备可以在这三套系统里同时使用而不需要重复配对

## 操作方法：
经爬帖发现蓝牙设备的配对连接信息文件位于 `/private/var/root/Library/Preferences/bluetoothaudiod.plist`
将该文件复制到另外的MacOS系统，使用命令如下：

```sh
sudo -s     # 切换到root用户
```
复制文件[10.13到10.13]：
`cp /private/var/root/Library/Preferences/bluetoothaudiod.plist /Volumes/test/private/var/root/Library/Preferences`

复制文件[10.13到10.12]
`cp /private/var/root/Library/Preferences/bluetoothaudiod.plist /Volumes/test/private/var/root/Library/Preferences/blued.plist`

这样操作之后，就可以在不同的MacOS系统下使用配对过的蓝牙设备而无须重复配对。

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)

