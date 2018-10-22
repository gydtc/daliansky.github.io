---
title: 【黑果小兵】CoffeeLake UHD 630黑屏、直接亮屏及亮度调整的正确插入姿势
date: 2018-10-18 07:32:17
urlname: CoffeeLake-UHD-630-black-screen-direct-bright-screen-and-correct-adjustment-of-brightness-adjustment
tags:
- UHD 630
- CoffeeLake
- 黑屏
- 亮屏
- 亮度调整
categories:
- 教程
top:
- 99
---

# 【黑果小兵】CoffeeLake UHD 630黑屏、直接亮屏及亮度调整的正确插入姿势

> 适用于MacOS Mojave /macOS HighSierra 10.13.6(17G2112/17G2208)



## 直接亮屏

### 台式机/笔记本

- 笔记本：
  - 移除`SSDT-PNLF.aml`
  - 取消勾选`AddPNLF`
- Clover更新到v4707及以上，方法由[headkaze](https://github.com/headkaze)提供，[clover下载](https://github.com/Dids/clover-builder/releases)
- 添加了`igfxcflbklt`引导参数的`WhateverGreen`，方法由[headkaze](https://github.com/headkaze)提供，[下载](https://github.com/daliansky/XiaoMi-GLP/raw/dev/EFI/CLOVER/kexts/Other/WhateverGreen八代亮屏版.zip)
- config.plist，可[参考](https://github.com/daliansky/XiaoMi-GLP/blob/dev/EFI/CLOVER/config.plist)
  - Boot Args添加引导参数：`igfxcflbklt=force`
  - Devices/Properties添加：`enable-cfl-backlight-fix`参数设置为`01000000`![UHD630-enable-cflbklt](http://7.daliansky.net/FB-Patcher/UHD630-enable-cflbklt.png)



## 亮度调整

### 笔记本

- 添加：`change GFX0 to IGPU`重命名
- 勾选`AddPNLF`选项或者添加`SSDT-PNLF_CoffeeLake.aml`，特别感谢`@宪武`，[下载链接](https://github.com/daliansky/XiaoMi-GLP/raw/dev/EFI/CLOVER/ACPI/patched/SSDT-PNLF_CoffeeLake.aml)



## 已测试过机型：

- 八代小米游戏本增强版
- 机械革命X8Ti
- MSI GE63



## 问题反馈

请通过QQ群讨论、反馈



## 鸣谢

- `@宪武`制作的众多的`hotpatch`补丁
- headkaze 制作了[Intel FB Patcher](https://www.insanelymac.com/forum/topic/335018-intel-fb-patcher-v151/) [使用教程](https://blog.daliansky.net/Intel-FB-Patcher-tutorial-and-insertion-pose.html)
- vit9696 for [WhateverGreen](https://github.com/acidanthera/WhateverGreen) ([full credits](https://github.com/acidanthera/WhateverGreen#credits)), [Lilu](https://github.com/acidanthera/Lilu) ([full credits](https://github.com/acidanthera/Lilu#credits)), [AppleALC](https://github.com/acidanthera/AppleALC) ([full credits](https://github.com/acidanthera/AppleALC#credits)), USBPower.kext and additional help
- vit9696 for [IntelFramebuffer.bt](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/IntelFramebuffer.bt) with additional work by bcc9, Piker-Alpha and joevt 
- DalianSky for [Intel Core Platform ID and SMBIOS Quick Reference](https://blog.daliansky.net/Intel-core-display-platformID-finishing.html) 
- vandroiy2013 for audio id data from [AppleALC](https://github.com/acidanthera/AppleALC) 
- RehabMan for AllData patch method and various technical info

