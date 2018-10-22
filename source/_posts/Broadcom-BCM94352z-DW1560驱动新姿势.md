---
title: Broadcom BCM94352z/DW1560驱动新姿势[新方法]
urlname: Broadcom-BCM94352z-DW1560-drive-new-posture
date: 2017-09-09 09:35:23
top: 96
tags:
- DW1560
- BCM94352z
- 10.12
- 10.13
- Sierra
- High Sierra
- 驱动
- WIFI
categories:
- 教程
---

# Broadcom WiFi/BlueTooth BCM94352z(DW1560)驱动新姿势[新方法]
引言
> 
> * 昨晚[口袋妖怪](https://github.com/pmheart)进群闲聊的时候提到过 `她` 之前维护的[BrcmWLFixup](https://github.com/PMheart/BrcmWLFixup)已被 [AirportBrcmFixup](https://sourceforge.net/p/airportbrcmfixup/) 取代。同时 `她` 发给我的[AirportBrcmFixup/kern_brcmfx.cpp](https://sourceforge.net/p/airportbrcmfixup/code/HEAD/tree/trunk/AirportBrcmFixup/kern_brcmfx.cpp#l242)源码中已经增加了包括 `_si_pmu_fvco_pllreg` / `Chip identificator checking patch` / `Wi-Fi 5 Ghz/Country code patch (required for 10.11)` / `Third party device patch` / `White list restriction patch` / `Failed PCIe configuration (device-id checking)` 等问题的修复补丁
> * 之前我写的一篇[教程](https://blog.daliansky.net/Broadcom-WiFi-BlueTooth-BCM94352z-DW1560-the%20correct-drive-posture.html)已经不适用了，所以就测试之后重写一篇教程，目的是希望大家都少走弯路，更顺畅地用上黑苹果

## 问题的提出：

黑苹果的系统安装好后的第一件事情是得让它连接上互联网，以完善其它的驱动程序。也可借此安装类似`TeamViewer`或者`向日葵`之类的远程控制程序，让其它人通过远程的方式帮你完善系统。本文要介绍的就是教你如何驱动BCM94352z这款最常采用的无线网卡。

* 在macOS上，当使用BMC94532z NGFF WiFi卡时，`AirportBrcm4360.kext`不再成功加载。这个问题是由于驱动程序无法初始化fvco（频率压控振荡器）等原因引起的。 

## 解决方案：同时支持10.11-10.14系统

### 驱动：

> 下载：[RehabMan-FakePCIID](https://bitbucket.org/RehabMan/os-x-fake-pci-id/downloads) [RehabMan-BrcmPatchRAM](https://bitbucket.org/RehabMan/os-x-brcmpatchram/downloads) [AirportBrcmFixup](https://github.com/lvs1974/AirportBrcmFixup/releases)

1. 将文件`BrcmFirmwareData.kext`和`BrcmPatchRAM2.kext`复制到`/EFI/CLOVER/kexts/Other`目录下
2. 将文件`AirportBrcmFixup.kext`复制到`/EFI/CLOVER/kexts/Other`目录下,由于`AirportBrcmFixup.kext`是依赖于[Lilu](https://github.com/vit9696/Lilu/releases)运行的插件，所以还需要检查该目录下必须存在`Lilu.kext`
3. 包括这些文件的目录看起来是这样的：
     ![brcm94352z驱动](http://7.daliansky.net/DW1560.png)

### 10.13.6/10.14蓝牙失效的解决方法

将文件`BrcmFirmwareData.kext`和`BrcmPatchRAM2.kext`和`AirportBrcmFixup.kext`复制到`/Library/Extensions`目录下，以解决睡眠唤醒后可能引起的蓝牙失效的问题。

当然，在重启前，还要重建一下系统的缓存，命令为：

```bash
#!/bin/sh
sudo chmod -Rf 755 /S*/L*/E*
sudo chown -Rf 0:0 /S*/L*/E*
sudo chmod -Rf 755 /L*/E*
sudo chown -Rf 0:0 /L*/E*
sudo rm -Rf /S*/L*/PrelinkedKernels/*
sudo rm -Rf /S*/L*/Caches/com.apple.kext.caches/*
sudo touch -f /S*/L*/E*
sudo touch -f /L*/E*
sudo kextcache -Boot -U /
```
如果嫌输入命令麻烦，也可以使用应用`Kext Utility`重建缓存。

重启你的系统，检查WIFI/蓝牙是否工作正常。

## 写在最后

这是驱动BCM94352z(DW1560)的基础教程，还有些高级设置需要各位多爬帖。

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

