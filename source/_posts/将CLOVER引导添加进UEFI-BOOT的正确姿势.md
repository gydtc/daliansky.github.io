---
title: 将CLOVER引导添加进UEFI BOOT Option Menu的正确姿势
date: 2017-10-11 09:41:29
urlname: Add-the-CLOVER-boot-to-the-correct-posture-of-the-UEFI-Boot-Option-Menu
tags:
- EFI
- UEFI
- Clover
- 引导
categories:
- 教程
---

# 将CLOVER引导添加进UEFI BOOT Option Menu的正确姿势
> 很多网友在安装完 `MacOS` 后的第一件事情就是要将USB的EFI复制进磁盘里，同时需要将CLOVER的引导项添加UEFI BOOT里，这里我教大家一个最简单的方法

## 将 `MacOS` 系统的EFI移动进磁盘的EFI分区里
### 单磁盘单 `MacOS` 系统
两种方式：

1. 请使用工具： `Clover Configurator` 或者 `ESP Mounter Pro`，分别挂载U盘的EFI分区和磁盘里的EFI分区，然后将U盘下的EFI分区里面的EFI目录复制到磁盘里的EFI分区下即可
2. 使用系统命令 `diskutil` ，具体操作请[移步](https://blog.daliansky.net/Mac-frequently-used-to-the-command---continuous-update.html)

### 单磁盘双系统
最简单的分区结构是：一个 `EFI` 分区，一个 `MacOS` 分区，一个 `Windows` 分区

* 假设你想在同一块磁盘里同时安装 `MacOS` 和 `Windows 10` 双系统的话，那么我给你的建议是无论是先安装 `MacOS` 系统还是先安装 `Windows 10` 系统，都要在安装完 `Windows 10` 系统后再将U盘的EFI移动到磁盘的EFI分区里。因为当你安装完 `Windows 10` 的系统后，它会重新将EFI分区格式化的。
* 安装完的 `Windows 10` 的EFI分区里面会有个EFI的目录，目录里面会包括 `BOOT` 和 `MICROSOFT` 这两个目录,它看起来是这样的：
![Windows-EFI](http://ous2s14vo.bkt.clouddn.com/Windows-EFI.png)
* 将U盘里的EFI目录下面的 `CLOVER` 目录复制到磁盘里的EFI分区EFI目录下
![Windows_Clover](http://ous2s14vo.bkt.clouddn.com/Windows_Clover.png)

*** 切记一点：千万不要动另外的Boot和Microsoft目录 ***

### 双磁盘双系统
每块磁盘都分别包括各自不同的EFI分区，两块磁盘通过开机按Boot快捷键选择引导进入不同的系统，该种情况不在本教程讨论范围内。

## 将 `CLOVER` 引导项添加进 `UEFI Boot Option Menu`
两种方式：
### 通过BIOS添加，教程略

### 通过 `CLOVER` 自带的工具添加
1. 开机进入 `CLOVER` 引导界面，将光标移动到 `Clover Boot Options` ，回车进入
![clover boot options](http://ous2s14vo.bkt.clouddn.com/clover boot options.png)
2. 选择 `Add Clover boot options for all entries` 回车
![clover-boot-options2](http://ous2s14vo.bkt.clouddn.com/clover-boot-options2.png)
3. 拔掉U盘，重新开机，按 `Boot` 快捷键，你会发现多了很多以 `Clover start` 开头的引导项，选择 `Clover start boot.efi at MAC` 即可进入 `MacOS` 系统
![UEFI_Boot](http://ous2s14vo.bkt.clouddn.com/UEFI_Boot.jpg)


### QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


