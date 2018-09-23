---
title: Intel FB-Patcher使用教程及插入姿势
date: 2018-09-23 10:14:05
top: 99
urlname: Intel-FB-Patcher-tutorial-and-insertion-pose
tags:
- 教程
- FB
- patcher
- framebuffer
- 帧缓冲
- USB
- audio
- VRAM
categories:
- 教程
---

## Intel FB-Patcher使用教程及插入姿势

 随着`macOS Mojave`的发行，之前的通过`CLOVER`-`KextsToPatch`通过修补帧缓冲的方法已经失效了，尤其是`SkyLake`及以后架构。您现在必须使用`Lilu` + `WhateverGreen`的`Debug`版本以及在`boot args`中添加``-igfxdump`引导标志，启动系统后，它会在系统的根目录下生成一个framebuffer的二进制转储。输出将在系统盘的根目录下：/AppleIntelFramebuffer_GEN_KERNX_Y（如AppleIntelFramebuffer_9_18.0）。

![21FB](http://7.daliansky.net/FB-Patcher/21FB.png)

然后，您可以使用`INTEL FB-Patcher这个工具`，文件- >打开并可以查看帧缓冲器数据。然后，您可以用它来为您的`platform-id`生成帧缓冲的补丁，它位于`config.plist/Devices/Properties`。

> **注意**：*您现在可以使用Framebuffer-> MacOS的10.13.6（17G2112）菜单选项而不再创建这个二进制转储的补丁了。*



欲了解更多信息，请阅读[使用WhateverGreen英特尔帧缓冲修补](https://www.tonymacx86.com/threads/guide-intel-framebuffer-patching-using-whatevergreen.256490/)指南。中文版：[Coffee Lake帧缓冲区补丁及UHD630 Coffee Lake ig-platform-id数据整理](https://blog.daliansky.net/Coffee-Lake-frame-buffer-patch-and-UHD630-Coffee-Lake-ig-platform-id-data-finishing.html)



## 功能

- 支持Sandy Bridge，Ivy Bridge，Haswell，Broadwell，SKYLAKE，KabyLake，Coffee Lake, Cannon Lake  Ice Lake几乎所有的平台
- 创建所有的显示接口连接和VRAM补丁
- 检测自动修补程序创建的变化
- 创建Clover补丁，支持hex，base64或Devices/Properties等三种格式
- 显示原生GPU和型号标识
- 显示和编辑内存信息，如Stolen，Framebuffer，VRAM，Cursor等
- 翻滚一些项目的其他信息（Tool tips）
- 直接读取已加载生效的xxxFramebuffer kext的数据
- 文件->打开通过Debug版本的`WhatEverGreen.kext`的`-igfxdump`引导标志生成的Framebuffer文件
- 文件- >导出>Clover config.plist
- 文件->导出- > Framebuffer.txt
- 修补音频布局ID
- 添加USB端口限制补丁
- 插拔USB2 / USB3/Type-C设备和设定的端口的连接器类型然后生成一个USBPower.kext
- 高级修补选项（DVMT-prealloc 32 MB ，VRAM 2048 MB，禁用eGPU，启用HDMI20（4K），欺骗SKL音频，DP->HDMI，USB端口限制，FB端口限制等）



## Layout-id修补

1. 安装最新版本的Lilu和AppleALC

2. 设置config.plist/Devices/Audio/Inject=NO

3. 通过下拉列表设置Layout Id

4. 检查补丁：General->Audio

5. File->Export->Clover config.plist

6. 重启 

7. 如果没生效请重复第3步：更换不同的layout-id

   ![udioPatch](http://7.daliansky.net/FB-Patcher/AudioPatch.png)

![AudioPatch2](http://7.daliansky.net/FB-Patcher/AudioPatch2.png)

## USB端口修补

1. 应用USB端口限制补丁(在Patch->Advanced) 然后导出 File->Export->Clover config.plist ![USBPortLimit](http://7.daliansky.net/FB-Patcher/USBPortLimit.png)

2. 将[USBInjectAll.kext](https://github.com/RehabMan/OS-X-USB-Inject-All) 驱动放进`EFI/CLOVER/kexts/Other` 

3. 你也许还会需要`XHCI-200-series-injector.kext`,`XHCI-300-series-injector.kext`或者`XHCI-x99-injector.kext`，这取决于你所使用的INTEL芯片组

4. 重启机器，重新打开`Intel FB-Patcher`

5. 转到General->USB接口(见截屏)分别插入和拔出USB 2.0和USB 3.0设备，要求：将机器上的每个USB端口都插拔一遍。可用的端口将以突出的颜色标出

6. 设置每个端口，在下拉列表中选择适当的接口类型

   - 连接到USB3端口应设置为USB3(注HSxx端口)

   - TypeC:

     - 如果使用相同的HSxx / SSxx在两个方向，则它有一个内部开关（使用“TypeC + SW”）
     - 如果在每个方向使用一个不同HSxx / SSxx，然后它没有开关（使用“TypeC” ）
       - 备注：<u>*这块不知道应该如何翻译，请知情者告知，万分感谢*</u>

     

7. 使用删除按钮移除无用的端口

8. 使用`Export`按钮创建`USBPower.kext` ，它位于你的桌面，将生成的`USBPower.kext`复制进 `EFI/CLOVER/kexts/Other `

9. 你现在可以删除掉`USBInjectAll.kext` 以及关闭端口限制的补丁了  

### FAQ

Q. 什么是USBPower.kext? 
A. 它是一个[Codeless Kernel Extension](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KEXTConcept/KEXTConceptAnatomy/kext_anatomy.html#//apple_ref/doc/uid/20002364-SW8) 用于注入USB端口，让所有的USB端口都能正常工作 
Q. 我还需要`SSDT-UIAC.aml`吗 
A. 不，这个方法生成的是一个空壳的无代码的kext驱动 

## 下载链接

http://headsoft.com.au/download/mac/FBPatcher.zip

## 鸣谢

- vit9696 for [WhateverGreen](https://github.com/acidanthera/WhateverGreen) ([full credits](https://github.com/acidanthera/WhateverGreen#credits)), [Lilu](https://github.com/acidanthera/Lilu) ([full credits](https://github.com/acidanthera/Lilu#credits)), [AppleALC](https://github.com/acidanthera/AppleALC) ([full credits](https://github.com/acidanthera/AppleALC#credits)), USBPower.kext and additional help
- vit9696 for [IntelFramebuffer.bt](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/IntelFramebuffer.bt) with additional work by bcc9, Piker-Alpha and joevt 
- DalianSky for [Intel Core Platform ID and SMBIOS Quick Reference](https://blog.daliansky.net/Intel-core-display-platformID-finishing.html) 
- vandroiy2013 for audio id data from [AppleALC](https://github.com/acidanthera/AppleALC) 
- RehabMan for AllData patch method and various technical info

## 未完，持续更新中