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
- 插拔USB2 / USB3/Type-C设备和设定的端口的连接器类型然后生成一个``USBPorts.kext`的驱动程序
- 高级修补选项（DVMT-prealloc 32 MB ，VRAM 2048 MB，禁用eGPU，启用HDMI20（4K），欺骗SKL音频，DP->HDMI，USB端口限制，FB端口限制等）



> **先来两个开味小菜：**



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

2. 将[USBInjectAll.kext](https://github.com/RehabMan/OS-X-USB-Inject-All) 驱动放进`EFI/CLOVER/kexts/Other` ，同时需要在`config.plist->ACPI->DSDT Patches中添加重命名补丁`

   - change EHC1 to EH01

   - change EHC2 to EH02

   - change XHCI to XHC

   - 两种格式：

     - ```
       Comment: change EHC1 to EH01
       Find:    45484331
       Replace: 45483031
       Comment: change EHC2 to EH02
       Find:    45484332
       Replace: 45483032
       Comment: change XHCI to XHC
       Find:    58484349
       Replace: 5848435f
       ```

     - ```
          <dict>
          	<key>Comment</key>
          	<string>change EHC1 to EH01</string>
          	<key>Disabled</key>
          	<false/>
          	<key>Find</key>
          	<data>
          	RUhDMQ==
          	</data>
          	<key>Replace</key>
          	<data>
          	RUgwMQ==
          	</data>
          </dict>
          <dict>
          	<key>Comment</key>
          	<string>change EHC2 to EH02</string>
          	<key>Disabled</key>
          	<false/>
          	<key>Find</key>
          	<data>
          	RUhDMg==
          	</data>
          	<key>Replace</key>
          	<data>
          	RUgwMg==
          	</data>
          </dict>
          <dict>
          	<key>Comment</key>
          	<string>change XHCI to XHC</string>
          	<key>Disabled</key>
          	<false/>
          	<key>Find</key>
          	<data>
          	WEhDSQ==
          	</data>
          	<key>Replace</key>
          	<data>
          	WEhDXw==
          	</data>
          </dict>
          ```

            - 它通常位于
               ```<dict>
               	<key>ACPI</key>
               	<dict>
               		<key>DSDT</key>
               		<dict>
               			<key>Patches</key>
               			<array>
               ```
                下面，如果使用文字编辑软件，请不要放错位置。

       - 附图：![changeXHC](http://7.daliansky.net/FB-Patcher/changeXHC.png)

       - 重命令名字符串转换16进制示意图![echo-n2xxd](http://7.daliansky.net/FB-Patcher/echo-n2xxd.png)

3. 你也许还会需要`XHCI-200-series-injector.kext`,`XHCI-300-series-injector.kext`或者`XHCI-x99-injector.kext`，这取决于你所使用的INTEL芯片组

4. 重启机器，重新打开`Intel FB-Patcher`

5. 转到General->USB接口

   - 分别插入和拔出USB 2.0和USB 3.0设备，要求：将机器上的每个USB端口都插拔一遍。可用的端口将以突出的颜色标出![USBOrigin](http://7.daliansky.net/FB-Patcher/USBOrigin.png)

6. 设置每个端口，在下拉列表中选择适当的接口类型![USBTest](http://7.daliansky.net/FB-Patcher/USBTest.png)

   - 连接到USB3端口应设置为USB3(注HSxx端口)

   - USB type-C型端口可以是9或10，这取决于硬件如何处理USB type-C型设备/电缆的两种可能方向
     如果USB-C在两个方向上使用相同的SSxx，则它具有内部开关（UsbConnector = 9）
     如果USB-C在每个方向使用不同的SSxx，则它没有开关（UsbConnector = 10）

7. 使用删除按钮移除无用的端口![USB_HS07](http://7.daliansky.net/FB-Patcher/USB_HS07.png)![USBFinal](http://7.daliansky.net/FB-Patcher/USBFinal.png)

8. 使用`Export`按钮创建`USBPorts.kext` ，它位于你的桌面，将生成的`USBPorts.kext`复制进 `EFI/CLOVER/kexts/Other `  **备注:**旧版本生成的驱动名称为`USBPower.kext`![USBPower](http://7.daliansky.net/FB-Patcher/USBPower.png)

9. 你现在可以删除掉`USBInjectAll.kext` 以及关闭端口限制的补丁了  

### FAQ

Q. 什么是`USBPorts.kext`? 
A. 它是一个[Codeless Kernel Extension](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KEXTConcept/KEXTConceptAnatomy/kext_anatomy.html#//apple_ref/doc/uid/20002364-SW8) 用于注入USB端口，让所有的USB端口都能正常工作 
Q. 我还需要`SSDT-UIAC.aml`吗 
A. 不，这个方法生成的是一个空壳的无代码的kext驱动 



## 核心功能：给FrameBuffer打补丁

随着`macOS Mojave`的发行，之前的通过`CLOVER`-`KextsToPatch`通过修补帧缓冲的方法已经失效了，尤其是`SkyLake`及以后架构。您现在必须使用`Lilu` + `WhateverGreen`+`FB Patcher`的方式来驱动您的显卡。



### 初步动作

- 删除`FakePCIID` `IntelGraphicsFixup`,`NvidiaGraphicsFixup`,`Shiki`和`CoreDisplayFixup`

- 关闭`Clover`里面关于`Graphics`注入的参数，这些参数包括：

  - config.plist/Graphics/Inject/ATI=NO
  - config.plist/Graphics/Inject/Intel=NO
  - config.plist/Graphics/Inject/NVidia=NO 
  - config.plist/Graphics/ig-platform-id= 
  - config.plist/Devices/FakeID/IntelGFX=

- 关闭`Clover`里面关于`DSDT`的修复：

  - AddHDMI 
  - FixDisplay 
  - FixIntelGfx 
  - AddIMEI

- 禁用`UseIntelHDMI`

- 移除`boot argument`参数：`-disablegfxfirmware`

- 移除`IGPU`和`HDMI`部分的全部内容，包括：

  - config.plist/Devices/Arbitrary
  - config.plist/Devices/Properties 
  - config.plist/Devices/AddProperties

- 从以下位置删除任何与`IGPU`和`HDMI`相关的`SSDT`和`DSDT`：

  - CLOVER/ACPI/patched

  

### 使用方法

1. 打开应用：`Intel FB Patcher.app`
2. 通过菜单项：`Framebuffer`选择`macOS 10.13.6 (17G2112)` / `macOS 10.14(18A389)`![FB-Patcher_Select](http://7.daliansky.net/FB-Patcher/FB-Patcher_Select.png)
3. 选择显卡的次代，比如`Intel HD Graphics 620`就需要选择`Kaby Lake`，`Intel HD Graphics 520`就需要选择`Skylake`等等，之后选择`Platform-id`，这个就是能正确驱动你的显卡的id，至于这个ID如何确定，请参考[黑苹果必备：Intel核显platform ID整理及smbios速查表](https://blog.daliansky.net/Intel-core-display-platformID-finishing.html)。欲了解更多信息，请阅读[使用WhateverGreen英特尔帧缓冲修补](https://www.tonymacx86.com/threads/guide-intel-framebuffer-patching-using-whatevergreen.256490/)指南。中文版：[Coffee Lake帧缓冲区补丁及UHD630 Coffee Lake ig-platform-id数据整理](https://blog.daliansky.net/Coffee-Lake-frame-buffer-patch-and-UHD630-Coffee-Lake-ig-platform-id-data-finishing.html)
4. 点击`Patch`按钮，在`Patch Options`-`General`选项中勾选`Auto Detect Changes`，`All`,`Connectors`,`VRAM`这几个选项；
5. 在`Patch Options`-`Advanced`选项中勾选`DVMT pre-alloc 32 MB`，`VRAM 2048 MB`，`Enable HDMI20(4K)`
6. 勾选`Device id`，选择`platfrom-id`相对应的设置id，这通常跟你的显卡名称相吻合；
7. 点击`Generate Patch`生成显卡驱动补丁；
8. 通过菜单项：`File`-`Export`-`config.plist`，将该补丁导出到CLOVER的配置文件中；

### 几个例子：

- Coffee Lake（八代）平台:Intel UHD Graphics 630(Mobile)![3E9B-A](http://7.daliansky.net/FB-Patcher/3E9B-A.png)![3E9B-B](http://7.daliansky.net/FB-Patcher/3E9B-B.png)![3E9B-C](http://7.daliansky.net/FB-Patcher/3E9B-C.png)通过菜单项：`File`-`Export`-`config.plist`，将该补丁导出到CLOVER的配置文件

- Kabe Lake（七代）平台Intel HD Graphics 620/Intel UHD Graphics 620(Mobile)![5916-A](http://7.daliansky.net/FB-Patcher/5916-A.png)![5916-B](http://7.daliansky.net/FB-Patcher/5916-B.png)![5916-C](http://7.daliansky.net/FB-Patcher/5916-C.png)通过菜单项：`File`-`Export`-`config.plist`，将该补丁导出到CLOVER的配置文件

- Sky Lake（六代）平台:Intel HD Graphics 530(Mobile)![191B-A](http://7.daliansky.net/FB-Patcher/191B-A.png)![191B-B](http://7.daliansky.net/FB-Patcher/191B-B.png)![191B-C](http://7.daliansky.net/FB-Patcher/191B-C.png)通过菜单项：`File`-`Export`-`config.plist`，将该补丁导出到CLOVER的配置文件

- Haswell（四代）平台：Intel HD Graphics 4600(Mobile)![0A26-A](http://7.daliansky.net/FB-Patcher/0A26-A.png)![0A26-B](http://7.daliansky.net/FB-Patcher/0A26-B.png)![0A26-C](http://7.daliansky.net/FB-Patcher/0A26-C.png)通过菜单项：`File`-`Export`-`config.plist`，将该补丁导出到CLOVER的配置文件

  

## 本教程会随着新版本新增功能持续更新

## 下载链接

[http://headsoft.com.au/download/mac/FBPatcher.zip](http://headsoft.com.au/download/mac/FBPatcher.zip)



## 扩展阅读

[macOS High Sierra 10.13.6(17G2112)/Mojave ig-platform-id数据整理](https://blog.daliansky.net/Coffee-Lake-frame-buffer-patch-and-UHD630-Coffee-Lake-ig-platform-id-data-finishing.html)



## 鸣谢

- vit9696 for [WhateverGreen](https://github.com/acidanthera/WhateverGreen) ([full credits](https://github.com/acidanthera/WhateverGreen#credits)), [Lilu](https://github.com/acidanthera/Lilu) ([full credits](https://github.com/acidanthera/Lilu#credits)), [AppleALC](https://github.com/acidanthera/AppleALC) ([full credits](https://github.com/acidanthera/AppleALC#credits)), USBPower.kext and additional help
- vit9696 for [IntelFramebuffer.bt](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/IntelFramebuffer.bt) with additional work by bcc9, Piker-Alpha and joevt 
- DalianSky for [Intel Core Platform ID and SMBIOS Quick Reference](https://blog.daliansky.net/Intel-core-display-platformID-finishing.html) 
- vandroiy2013 for audio id data from [AppleALC](https://github.com/acidanthera/AppleALC) 
- RehabMan for AllData patch method and various technical info

