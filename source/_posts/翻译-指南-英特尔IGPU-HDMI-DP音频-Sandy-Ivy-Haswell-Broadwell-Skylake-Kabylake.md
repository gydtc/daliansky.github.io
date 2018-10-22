---
title: '[翻译][指南]英特尔IGPU HDMI/DP音频(Sandy/Ivy/Haswell/Broadwell/Skylake/Kabylake)'
date: 2018-04-03 11:28:53
urlname: translate-guide-intel-igpu-hdmi-dp-audio-sandy-ivy-haswell-broadwell-skylake-kabylake
tags: 
- 教程
- HDMI
- AppleALC
- AppleHDA
- Audio
categories: 
- 教程

---

## [翻译](https://www.tonymacx86.com/threads/guide-intel-igpu-hdmi-dp-audio-sandy-ivy-haswell-broadwell-skylake.189495/)[指南]英特尔IGPU HDMI/DP音频(Sandy/Ivy/Haswell/Broadwell/Skylake/Kabylake)

> 早上起床，习惯性打开手机浏览，随着macOS发布了最新的10.13.4，最近几天远景上面关于Intel核显的显卡驱动以及HDMI的声音输出的求助帖很多，于是就跑去`[RehabMan](https://www.tonymacx86.com/members/rehabman.429483/)`的大本营，就看到了这篇文章。之前也经常使用他发布的一些patch，包括很多笔记本机型专用的config.plist都来自这位大咖。
>
> 现将这篇让INTEL的HDMI/DP音频正确输出的帖子转译过来，让更多的人都能看到。
>
> 本人英语炒鸡辣鸡，使用的是google的机翻，其中难免会存在错误，请各位群友指正。

## 概述

本指南将介绍如何为连接到英特尔集成GPU的HDMI端口的笔记本电脑实现HDMI音频。其中一些内容也适用于配备DP连接器的笔记本电脑。

如果您的笔记本电脑有外部DP端口，您也可以阅读本指南。带有外部DP端口的笔记本电脑需要此处介绍的一部分补丁。

为了实现HDMI/DP，必须满足以下要求：

- 使用AppleHDA的原生音频（有关更多信息，请阅读FAQ ...实现板载音频不在本指南的范围内）

- 适当的帧缓冲（kext）补丁更改连接器类型以匹配物理连接器。这通过修补与正在使用的ig-platform-id关联的数据来完成。

- Haswell/Broadwell：将B0D3重命名为HDAU（设备位于0x00030000）

- 在HDAU，IGPU，HDEF对象上注入属性`"hda-gfx" = <"onboard-1">`。

- Haswell/Broadwell：在HDAU上注入layout-id以匹配HDEF上的布局ID 

- Haswell：安装`FakePCIID.kext`和`FakePCIID_Intel_HDMI_Audio.kext` 

注意：通常，对于PC笔记本电脑，英特尔图形设备的ACPI标识符为GFX0产品使用VID）。由于此标识符通常更改为IGPU以启用IGPU电源管理，因此本指南将其称为IGPU。请记住，如果您尚未实施IGPU PM。

注意：如果您想知道Skylake（和Kaby Lake）与HD3000/HD4000类似，因为HDMI/DP编解码器在HDEF（通常是PC DSDT中的HDAS，更名为OS X的HDEF）上，而不是单独的设备HDAU 。

**关于Clover和Clover笔记本电脑指南的注意事项**

如果您按照此处的指南进行操作：[https](https://www.tonymacx86.com/threads/guide-booting-the-os-x-installer-on-laptops-with-clover.148093/) : [//www.tonymacx86.com/threads/guide-booting-the-os-x-installer-on-laptops-with-clover.148093/](https://www.tonymacx86.com/threads/guide-booting-the-os-x-installer-on-laptops-with-clover.148093/)

你的config.plist将已经包含所需的重命名。

您可以将config.plist/Devices中的#AddProperties重命名为AddProperties，它将启用所需的“hda-gfx”和其他音频注入。

看看它... 

## 帧缓冲区修补

与ig-platform-id（或具有Sandy Bridge的snb-platform-id）关联的数据对于每个连接器具有代表连接器类型（以及其他连接器相关数据）的位。由于大多数Apple产品使用DP，因此大多数连接器默认为DP。为了使HDMI音频正常工作，您必须修补kext，使连接器数据与物理连接器匹配。如果您的连接器是DP，则无需执行任何操作，但如果您的端口是HDMI，则可能需要修补连接器，使其成为HDMI连接器而不是DP连接器。

DP连接器通过连接器类型在ioreg中标识`<00 04 00 00> `
HDMI连接器通过连接器类型在ioreg中标识`<00 08 00 00> `

在ioreg中标识。在我的向导中链接的plist中，您将找到各种连接器ig-platform-id数据。

[http://www.tonymacx86.com/el-capita...de-boot-os-x-installer-laptops-clover.html](http://www.tonymacx86.com/el-capitan-laptop-support/148093-guide-booting-os-x-installer-laptops-clover.html)

默认情况下，每个补丁都是禁用的。您可以阅读关于禁用的修补程序以及如何在指南的第2篇后启用它们。

您需要使用的补丁取决于HDMI连接器插入哪个端口。每个端口在IGPU下都有自己的AppleIntelFramebuffer节点。例如，该图像显示了我的Lenovo u430上的IGPU下的每个帧缓冲区节点： 
![IGPUframebuffers.png](http://7.daliansky.net/HDMI/IGPUframebuffers.png)

如果有HDMI设备插入其中一个帧缓冲区，您将在相应的帧缓冲区下看到AppleDisplay，就像您看到与LVDS相关的帧缓冲区下的AppleBacklightDisplay一样端口（笔记本电脑内部显示）。

在我的联想u430的情况下，HDMI端口与AppleIntelFramebuffer @ 2相关联。每个帧缓冲区（@ 0，@ 1，@ 2，@ 3）对应于驻留在帧缓冲区kext二进制文件中的ig-platform-id数据内的一组连接器数据。每个连接器都有一个描述端口号的前缀，并且每个连接器都位于kext中（例如：按照该顺序为0105,0204,0306）。提供的plists中的每个修补程序都用前缀进行注释，并按它们在平台数据中出现的顺序进行评论。因此，对于使用ig-platform-id 0xa260006的Lenovo u430，外部端口（@ 1和@ 2）标有0105和0204。由于u430上的HDMI端口连接到AppleIntelFramebuffer @ 2这是0204连接器，我们可以将其缩小到只适用于0xa260006的0204的修补程序。

plist中只有两个这样的补丁。对于每个连接器，都可以选择使用非（12）修补程序或（12）修补程序之一修补。不同之处在于“（12）”变体除了修补连接器类型外，还修补了一个据信定义某种延迟的字节。一些笔记本电脑需要将此延迟从默认（09）延长到（12）。在确定你需要什么的时候，这是试错的问题。假设您已满足所有其他HDMI音频要求，并且非12修补程序导致KP(内核崩溃) /重新启动，则可能需要12个变体。

对于HDMI监视器热插拔时KP(内核崩溃)  /重新启动的情况，很难确定您的外部端口分配到了哪个端口（因为在监视器插入时无法查看ioreg）。在这种情况下，您应该应用适用于您正在使用的ig-platform-id的所有（12个变体）修补程序。这应该让你通过KP(内核崩溃)/重新启动，然后你可以看看ioreg，确定哪个端口实际使用，并且消除或禁用不需要的补丁。

在我的u430的情况下，我没有KP(内核崩溃)  /重新启动问题，所以我可以通过插入显示器并查看ioreg来确定HDMI使用哪个端口。正如我之前提到的那样，它是0204连接器（framebuffer @ 2）。因此，Lenovo u430使用标有“HDMI-audio，端口0204，0x0a260005 0x0a260006”的补丁。

它出现在我的config.plist中（在Xcode中）： 在修补HDMI音频之前，AppleIntelFramebuffer @ 2的连接器类型为`<00 04 00 00>`。修补后，它将变为`<00 08 00 00>`。 修补之前： 修补后： 如果您的物理连接器是DP，则无需为连接器类型打补丁。但是，您可能需要为09和12延迟打补丁。查看每个修补程序中替换的十六进制数据，应该很明显如何更改修补程序，使其保持`<00 04 00 00>`连接器类型而不是将其更改为`<00 08 00 00>`。**将B0D3重命名为HDAU**:

![0204patch.png](http://7.daliansky.net/HDMI/0204patch.png)

![0204connector-type-HDMI.png](http://7.daliansky.net/HDMI/0204connector-type-HDMI.png)

![0204connector-type-DP.png](http://7.daliansky.net/HDMI/0204connector-type-DP.png)

Sandy Bridge（HD3000）和Ivy Bridge（HD4000）使用具有多个编解码器的单个音频设备（HDEF）。板载音频和HDMI音频均位于同一HDEF设备上。因此，没有第二个设备，所以不需要将其重命名为HDAU。

Haswell和Broadwell为HDMI音频编解码器使用单独的设备。通常它被命名为B0D3（它可以在DSDT或OEM SSDT中定义）。您将在ioreg中看到PCI0下的B0D3节点。对于OS X，它必须重命名为HDAU。设备的地址始终为0x00030000。

您可以使用笔记本修补程序存储库中的“将B0D3重命名为HDAU”来重命名设备。该补丁应该适用于包含B0D3参考的任何DSDT或SSDT。同一个补丁还定义了一个在HDAU上注入“hda-gfx”=“onboard-1”的_DSM。它还包含一个补丁，为IGPU注入“hda-gfx”。

请参阅ACPI修补指南更多有关ACPI修补程序的信息：[http](http://www.tonymacx86.com/el-capitan-laptop-support/152573-guide-patching-laptop-dsdt-ssdts.html) : [//www.tonymacx86.com/el-capitan-laptop-support/152573-guide-patching-laptop-dsdt-ssdts.html](http://www.tonymacx86.com/el-capitan-laptop-support/152573-guide-patching-laptop-dsdt-ssdts.html)

注意：Skylake似乎使用单个音频设备，通常名为HDAS。它必须被重新命名为HDEF为OS X 

## 注入性质HDA-GFX（和布局-ID）

对于桑迪桥和常春藤桥（HD3000/HD4000），`"hda-gfx" = <"onboard-1">`必须在注入iGPU的和HDEF。

对于Haswell和Broadwell，必须在IGPU和HDAU上注入`"hda-gfx" = <"onboard-1">`。没有必要在HDEF上注入“hda-gfx”，尽管它似乎不会引起问题。

`Audio Layout`音色（`Audio Layout 3`，`Audio Layout 12`或为您的布局ID自定义的音色）会在HDEF中注入“hda-gfx”。通常情况下，HDEF在DSDT中定义。

注意：HDAU/IGPU“hda-gfx”来自“将B0D3重命名为HDAU”，或者对于IGPU其他IGPU相关的修补程序。搜索“hda-gfx”的回购补丁，你会看到几个。

`Rename B0D3 to HDAU"`补丁也为IGPU注入“hda-gfx”。通常，HDAU和IGPU对象在相同的SSDT中定义，但有可能是一个不同的文件（如DSDT）。仅在应用修补程序时查看它是否适用于给定文件没有任何坏处。

通常情况下，以下工作将完成所有必需的重命名和注入操作：
- 将“Audio Layout *”（布局ID取决于您修补的AppleHDA）应用于DSDT 
- 将`Rename B0D3 to HDAU`应用于DSDT和所有OEM SSDT。

另请注意，“将B0D3重命名为HDAU”补丁会在HDAU上注入布局ID。布局ID必须与HDEF上的布局ID匹配。在应用之前，根据需要修改修补程序中的布局ID。

注意：Haswell和Broadwell不需要HDEF上的hda-gfx。

## 安装FakePCIID.kext FakePCIID_Intel_HDMI_Audio

`AppleHDAController kext`实现了某些HDAU设备的白名单。一些PC使用不直接支持的设备。但`FakePCIID_Intel_HDMI_Audio`可以欺骗PCI ID以满足AppleHDAController

安装FakePCIID.kext和FakePCIID_Intel_HDMI_Audio.kext：[https](https://github.com/RehabMan/OS-X-Fake-PCI-ID)：[//github.com/RehabMan/OS-X-Fake-PCI-ID](https://github.com/RehabMan/OS-X-Fake-PCI-ID)

阅读README以查找预构建的kext二进制文件。

即使在您拥有支持的HDAU设备的情况下，安装FakePCIID_Intel_HDMI_Audio也不会造成任何伤害。kext不会附加到本机支持的设备。

## 检查你的工作

你可以判断一切是否完全在IORegistryExplorer中实现。

初始IORegistryExplorer设置：
- 从这里下载（附加到帖子）：[http](http://www.tonymacx86.com/audio/58368-guide-how-make-copy-ioreg.html) : [//www.tonymacx86.com/audio/58368-guide-how-make-copy-ioreg.html](http://www.tonymacx86.com/audio/58368-guide-how-make-copy-ioreg.html)
- 首选项 - >查找，勾选“属性键“ 

检查`"hda-gfx" = <"onboard-1">`
- 在搜索框中输入”
- 你应该在HDEF/IGPU（Sandy/Ivy/Skylake/Kabylake）和HDAU/IGPU（Haswell/Broadwell）上找到它。
- 查看属性值，您应该看到“onboard-1” 

检查HDAU（仅限Haswell/Broadwell）：
- 您应该在PCI0 

检查layout-id 下找到HDAU（不是B0D3）：
- 在搜索框中键入“ layout-id“ 
- 您应该在HDAU（如果适用）和HDEF上找到它
- 如果您检查每个HDAU和HDEF中的值，HDAU应具有相同的值

检查帧缓冲区：
- 检查与您的HDMI对应的IGPU下的帧缓冲区/ DP连接器
- 它应该与物理连接器（DP：`<00 04 00 00>`，HDMI：`<00 08 00 00>`）

匹配检查HDAU下的FakePCIID加载：
- 如果您有不受支持的HDAU，您会注意到FakePCIID已连接到HDAU设备。

如果只有其中一项要求未得到满足，则不起作用。

## 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

