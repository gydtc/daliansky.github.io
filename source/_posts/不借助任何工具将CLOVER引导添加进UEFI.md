---
title: 不借助任何工具将CLOVER引导添加进UEFI的正确姿势
date: 2018-09-20 08:56:12
urlname: Add-CLOVER-boot-to-UEFI-without-any-tools
tags:
- 教程
- CLOVER
- UEFI
categories:
- 教程
top:
- 98
photos:
- "http://7.daliansky.net/Clover_Boot_Options/2Clover_Boot_Options.png"
---

## 不借助任何工具将CLOVER引导添加进UEFI的正确姿势

经常安装hackintosh的同学会发现，安装完macOS后，需要做的第一件事情就要将EFI移进机器自带的磁盘中，同时添加CLOVER引导项到UEFI中以实现CLOVER引导加载macOS。通常的作法是进Windows/PE工具里，使用类似EASY UEFI或者BOOTICE之类的工具添加一条引导记录到UEFI中。现在教给大家一招：不借助任何工具，使用CLOVER自带的功能添加一个CLOVER引导项到UEFI中。、

### 操作步骤：

1.进入CLOVER主界面：
![1Clover_Main_Screen](http://7.daliansky.net/Clover_Boot_Options/1Clover_Main_Screen.png)

2.将光标移动到`Clover Boot Options`，回车：
![2Clover_Boot_Options](http://7.daliansky.net/Clover_Boot_Options/2Clover_Boot_Options.png)

3.选择`Add Clover Boot Options`，回车：

![Add Clover Boot Options](http://7.daliansky.net/Clover_Boot_Options/3Add_Clover_Boot_Options.png)

4.重新启动，按`F8`或者`F12`选择`Boot Clover with EFI`之类的引导项进入CLOVER引导macOS；

5.收工。





