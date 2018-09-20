---
title: 【黑果小兵】macOS Mojave 10.14(18A389) with Clover 4670原版镜像
date: 2018-09-13 19:57:50
urlname: macOS-Mojave-10.14-18A389-Release-with-Clover-4670-original-mirror
top: 100
categories:
- 下载
- 镜像
tags:
- 10.14
- 17A389
- Mojave
- 镜像
- 下载
- dmg
photos:
- "http://7.daliansky.net/10.14/Mojave.jpg"
---

# 【黑果小兵】macOS Mojave 10.14(18A389) with Clover 4670原版镜像

- 随着苹果发布了最新的MacBookPro 15,1/15,2这两款产品，macOS Mojave的发布也日益临近，它原生支持第八代核显;**众多的8代CPU的朋友们可以彻底告别黑屏的痛苦**

- 镜像靓点：去除`USB端口限制`，减少禁行发生的几率；增加`Lilu`崩溃的日志信息显示；新增加`HD620/UHD620`的配置文件，原则上支持安装时驱动显卡；新增`UHD630`的配置文件，机型设置为`MacBookPro15,2`，显卡自动侦测；

- 本镜像采用官方原版app制作，集成Clover 4670，支持UEFI启动安装;`Drivers64UEFI/`目录下只保留的`AptioMemoryFix.efi`以解决卡+++问题；添加`ApfsDriverLoader-64.efi`，自动加载`apfs.efi`驱动，同时去除日志显示；其它的驱动位于`drivers-Off`；

- Clover集成了本人修改的全新主题，不喜欢的可以于安装系统后自行替换；![0Clover](http://7.daliansky.net/10.14GM/0Clover.png)

- 所有配置文件中默认添加`Lilu`崩溃日志的输出信息,详见：[macOS Mojave 10.14安装中常见的问题及解决方法](https://blog.daliansky.net/Common-problems-and-solutions-in-macOS-Mojave-10.14-installation.html);

- 更新`WhateverGreen`到V1.2.2，原生支持UHD620/UHD630等八代核显，不需要注入`platform-id`， 同时它也支持NVIDIA和AMD的显卡，以及整合了`Shiki`和`CoreDisplayFixup`的驱动，现在是All In One了；

  ![http://7.daliansky.net/dell/IntelGraphicsFixup.jpg](http://7.daliansky.net/dell/IntelGraphicsFixup.jpg)

- Clover默认配置文件`config.plist`原则上支持各种机型引导安装；同时新增加了原生支持HD620/UHD620的配置文件`config_UHD620_HD620_59160000.plist`和八代UHD630的配置文件`config_UHD630.plist`，供您享用；

- 其它配置文件包括：HD520/530/540，HD550/P530,HD5000/5100/5200/5300/5500/6000,HD4200/4400/4600；所有config配置文件都可通过Clover引导界面-`Options`-`configs`进行选择；不会操作的请移步：[Clover使用教程](https://blog.daliansky.net/clover-user-manual.html) [macOS安装教程](https://blog.daliansky.net/MacOS-installation-tutorial-XiaoMi-Pro-installation-process-records.html) 

- 如果无法引导到安装界面，可于Clover主界面-`Options`-`Graphics`进行显卡仿冒；不会操作的请移步：[Clover使用教程](https://blog.daliansky.net/clover-user-manual.html) [macOS安装教程](https://blog.daliansky.net/MacOS-installation-tutorial-XiaoMi-Pro-installation-process-records.html) 

- 本镜像集成的EFI如果无法安装，请根据自己的机型寻找相应的EFI进行替换，请参考：[macOS High Sierra区笔记本安装情况集合帖](http://bbs.pcbeta.com/viewthread-1753483-1-1.html)

- 支持Realtek8111/8100系列有线网卡，支持Intel板载有线网卡；其它的网卡驱动位于`kexts/Other/其它驱动`

- 已更新Lilu(v1.2.7)、AppleALC(v1.3.1)、WhateverGreen(v1.2.2)等驱动；

- 本镜像已经过本人安装测试，若您在使用中遇到问题，可通过爬楼自行解决。本人才疏学浅，所学知识都来自于远景社区，感谢远景各位大咖一直以来对 `黑果小兵` 的大力支持，由于人员众多，恕不一一列名致谢！

- 挂载EFI分区

  Windows操作系统下面,以系统管理员身份打开`cmd`窗口,输入命令:

  ```sh
  c:\>diskpart
  list disk           # 磁盘列表
  select disk n       # 选择EFI分区所在的磁盘，n为磁盘号
  list partition      # 磁盘分区列表
  select partition n  # 选择EFI分区，n为EFI分区号
  set id="ebd0a0a2-b9e5-4433-87c0-68b6b72699c7"	# 设置为基本数据分区
  assign letter=X     # x为EFI分区盘符
  exit				# 退出diskpart
  notepad				# 打开记事本程序，点击文件->打开，即可访问EFI分区
  ```

  您可以重复输入命令同时挂载USB的EFI分区和磁盘的EFI分区

- 本镜像发布站点：[远景论坛](http://bbs.pcbeta.com/forum.php?gid=86) / [黑果小兵的部落阁](https://blog.daliansky.net)

# 截图：

![1About](http://7.daliansky.net/10.14GM/1About.png)
![21Displays](http://7.daliansky.net/10.14GM/21Displays.png)
![22Displays](http://7.daliansky.net/10.14GM/22Displays.png)
![2Video](http://7.daliansky.net/10.14GM/2Video.png)
![3USB](http://7.daliansky.net/10.14GM/3USB.png)
![4I2C](http://7.daliansky.net/10.14GM/4I2C.png)
![5TouchPad](http://7.daliansky.net/10.14GM/5TouchPad.png)
![9Ext](http://7.daliansky.net/10.14GM/9Ext.png)
![8Drivers](http://7.daliansky.net/10.14GM/8Drivers.png)
![10About](http://7.daliansky.net/10.14GM/10About.png)
![99Terminal](http://7.daliansky.net/10.14GM/99Terminal.png)

# 下载链接

迅雷离线下载：[请点击下载](https://mirrors.dtops.cc/iso/MacOS/daliansky_macos/macOS%20Mojave%2010.14%2818A389%29%20Installer%20with%20Clover%204670.dmg) 感谢`@难忘情怀`提供下载资源

http下载链接:[请点击下载](https://mirrors.dtops.cc/iso/MacOS/daliansky_macos/) 感谢`@难忘情怀`提供下载资源

百毒云：[请点击下载](https://pan.baidu.com/s/1TDxM3jOlVYy1VhsHxAQQdg)

MD5 (macOS Mojave 10.14(18A389) Installer with Clover 4670.dmg) = fa9ae4c01242051c013250e1025c794c

# 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:

331686786 [一起吃苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91) 1000人群
688324116 [一起黑苹果](https://shang.qq.com/wpa/qunwpa?idkey=6bf69a6f4b983dce94ab42e439f02195dfd19a1601522c10ad41f4df97e0da82)   500人群
257995340 [一起啃苹果](http://shang.qq.com/wpa/qunwpa?idkey=8a63c51acb2bb80184d788b9f419ffcc33aa1ed2080132c82173a3d881625be8)   500人群

