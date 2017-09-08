---
title: hotpatch详解
date: 2017-08-16 16:22:44
updated: 2017-08-28 11:08:02
description: hotpatch列表及详解
categories:
- 教程
tags:
- hotpatch
- DSDT
- SSDT
---
## hotpatch详解
这里阐述hotpatch的作用及各功能详解

[TOC]<!--more-->

#### 核心文件
| 名称 | 解释 |
| --- | --- |
|SSDT-Config|SSDT控制入口文件|

#### 系统
| 名称 | 解释 |
| --- | --- |
|SSDT-LPC|      正确识别LPC总线到系统|
|SSDT-SMBUS|    正确识别SMBus到系统|
|SSDT-DMAC|     将DMA控制器公开给系统|
|SSDT-MCHC|     将内存控制器暴露在系统中|

#### 显卡
| 名称 | 解释 |
| --- | --- |
|SSDT-IGPU|       将属性添加到集成显卡设备，可以实现HDMI音频以及正确显示|
|SSDT-Disable_DGPU|在启动时关闭独立显卡，因为Mac OS无法使用它|
|SSDT-ALS0|       添加假环境光传感器以在重新启动之间保存背光信息|
|SSDT-BRT6|       将键盘的ACPI管理亮度键映射到VoodooPS2Controller.kext的PS2代码|
|SSDT-Dell_FN|    将键盘的ACPI管理亮度键映射到VoodooPS2Controller.kext的PS2代码<br>【部分DELL机型】|
|SSDT-PNLF|       显示器亮度控制，为IntelBacklight.kext或AppleBacklight.kext + AppleBacklightInjector.kext添加PNLF设备|
#### 声卡

| 名称 | 解释 |
| --- | --- |
|SSDT-HDAU|       自动注入HDAU属性 备注：适用于Haswell和Broadwell平台|
|SSDT-HDEF|       自动注入HDEF属性 声卡layoutid注入点|

#### 睡眠相关
| 名称 | 解释 |
| --- | --- |
|SSDT-GPRW|       通过挂接GPRW或UPRW来解决即时唤醒|
|SSDT-LANC_PRW|   通过挂接GPRW来解决即时唤醒|
|SSDT-UPRW|       通过挂接GPRW或UPRW来解决即时唤醒|
|SSDT-IMEI|       添加IMEI（6系列HD4000，7系HD3000）|
|SSDT-PTSWAK|     在睡眠之前对离散GPU进行驱动，并在唤醒后将其关闭，以确保系统能够跟踪它|



#### 其它杂项

| 名称 | 解释 |
| --- | --- |
|SSDT-Debug| 用于ACPIDebug <br>该文件是通过将“添加DSDT调试方法”应用于空SSDT创建的，使用“添加SSDT调试外部声明”从其他方式访问这些方法<br>hotpatch SSDT甚至打补丁的OEM ACPI文件|
|SSDT-ESEL|关闭ESEL，在DSDT里原生ESEL被重命名为ESEX|
|SSDT-XWAK|关闭XWAK，在DSDT里原生的XWAK被重命名为ZWAK|
|SSDT-PluginType1|在_PR.CPU0上插入plugin-type = 1<br>可能是所有支持XCPM的SMBIOS只需要这种插件类型的注入|
|SSDT-SATA|修复某些不支持的SATA设备|
|SSDT-XHC|自动注入XHC属性|
|SSDT-XOSI|覆盖主机定义的_OSI来处理“Darwin”...<br>DSDT中的所有_OSI调用都被路由到XOSI<br>XOSI模拟“Windows 2009”（这是Windows 7）<br>XOSI模拟“Windows 2015”（这是Windows 10）<br>[这里是关于_OSI中微软操作系统的描述文件](http://download.microsoft.com/download/7/E/7/7E7662CF-CBEA-470B-A97E-CE7CE0D98DC2/WinACPI_OSI.docx)|


#### QQ群：
> 331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)






