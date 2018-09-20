---
title: Coffee Lake帧缓冲区补丁及UHD630 Coffee Lake ig-platform-id数据整理
date: 2018-07-22 08:27:27
urlname: Coffee-Lake-frame-buffer-patch-and-UHD630-Coffee-Lake-ig-platform-id-data-finishing
top: 99
categories:
- 教程
tags: 
- 10.13.6
- 17G2112
- 10.14
- Mojave
- framebuffer
- patch

---

# Coffee Lake帧缓冲区补丁及UHD630 Coffee Lake ig-platform-id数据整理

# Mojave帧缓冲补丁

随着`Mojave`发布的临近，原有的基于`Clover`的帧缓冲区二进制补丁已经不适用了。好消息是`vit9696`和`headkaze`重新创建了基于`Lilu`和`WhateverGreen`的新的帧缓冲区补丁。当然它也适用于macOS的所有的以前和未来的版本。

### Coffee Lake用户

请注意：新的`WhateverGreen`不会用于仿冒`Kaby Lake`的平台id工作。你需要使用新的MacOS Mojave 10.14 DB4/DP3(18A336e)或者macOS High Sierra 10.13.6(17G2112)，后者仅适用于`MacBookPro15,1`或`MacBookPro15,2`的一个特殊版本。您可以创建一个MacOS High Sierra 10.13.6(17G2112)，通过[installinstallmacos.py](https://github.com/munki/macadmin-scripts/blob/master/installinstallmacos.py)，或者直接通过本站[下载](https://blog.daliansky.net/macOS-High-Sierra-10.13.6-17G2112-Release-Special-with-Clover-4606-original-mirror.html)

### Lilu + WhateverGreen

`WhateverGreen`是要取代所有基于`Lilu`的其它视频补丁插件（它目前已经合并`WhateverGreen`,`IntelGraphicsFixup`,`NvidiaGraphicsFixup`,`Shiki`和`CoreDisplayFixup`)。其它人很可能会遵循(如`AppleALC`,`HibernationFixup`和`IntelGraphicsDVMTFixup`)。这是旨在为视频的所有功能于一身的解决方案。

### Beta警告

请注意，目前处于**试用**状态，您需要自己承担该的风险。我只是记录在这里，这对于那些需要得到帧缓冲区补丁的人来说。

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

  

### 下载`WhateverGreen`和`Lilu`

下载链接：[Lilu](https://github.com/acidanthera/Lilu/releases) [WhateverGreen](https://github.com/acidanthera/WhateverGreen/releases)

### 获取iGPU显卡设备的路径

下载并使用[gfxutil](https://github.com/acidanthera/gfxutil/releases)工具，如下所示：

```bash
$ gfxutil -f IGPU
DevicePath = PciRoot(0x0)/Pci(0x2,0x0)
```

### ig-platform-id

对于`AAPL,ig-platform-id`条目Clover要求此值为数据格式，因此您需要反转字节。因此，如果您希望您的platform-id为0x3EA50009，请首先反转字节（0900A53E），然后使用Xcode的plist编辑器将值添加到Clover的config.plist中。![fbpatch4](http://7.daliansky.net/fbpatch4.jpg)

**我应该为我的系统使用什么`ig-platform-id`？**
您应该选择与您的系统最匹配的一个。我建议你在选择之前先做一些研究。有关可用选项，请参阅本文后面的ig-platform-id数据整理。

您可以通过连字符后面的第一个数字来确定CPU的迭代。

例子：

- 英特尔（R）酷睿（TM）i5-**2**760QM（第2代）
- 英特尔（R）酷睿（TM）i7-**5**257U CPU @ 2.70GHz（第5代）
- 英特尔（R）酷睿（TM）m3-**6**Y30（第6代）
- 英特尔（R）酷睿（TM）i5-**8**350U（第8代）

以下是一些推荐的`platform-id`：

#### 第2代：Sandy Bridge（Intel HD Graphics 2000/3000）

- 支持从Mac OS X 10.7.x开始，以macOS 10.13.6结束
- Metal支持不可用
- 桌面：0x00030010（默认）
- 笔记本电脑：0x00010000（默认）

#### 第3代：Ivy Bridge（Intel HD Graphics 2500/4000）

- 从OS X 10.8.x开始支持
- 桌面：0x0166000A（默认值），0x01620005
- 笔记本电脑：0x01660003（默认），0x01660009, 0x01660004

#### 第4代：Haswell（Intel HD Graphics 4200-5200）

- 从OS X 10.9.x开始支持
- 桌面：0x0D220003（默认）
- 笔记本电脑：0x0A160000（默认），0x0A260005（推荐）

#### 第5代：Broadwell（Intel HD Graphics 5300-6300）

- 从OS X 10.10.2开始支持
- 桌面：0x16220007（默认）
- 笔记本电脑：0x16260006（默认）

#### 第6代：Skylake（Intel HD Graphics 510-580）

- 从OS X 10.11.4开始支持
- 桌面：0x19120000（默认）
- 笔记本电脑：0x19160000（默认）

#### 第7代：Kaby Lake（Intel HD Graphics 610-650）

- 支持从macOS 10.12.6开始
- 桌面：0x59160000（默认）
- 笔记本电脑：0x591B0000（默认）

#### 第8代：Coffee Lake（Intel UHD Graphics630）

- 支持从macOS 10.14 DB4/macOS 10.13.6(17G2112/17G2208)开始
- 桌面：0x3EA50000（默认），0x3E9B0007（推荐）
- 笔记本电脑：0x3EA50009（默认）

### Framebuffer补丁

WhateverGreen为您自动完成大部分工作，在大多数情况下，您不需要任何额外的Framebuffer补丁。 至少应该选择适合您系统的ig-platform-id并将其放在config.plist / Devices / Properties中，如下所示： ![fbpatch4](http://7.daliansky.net/fbpatch4.jpg)

以下是您可能需要额外的Framebuffer补丁的一些原因：

- 为那些无法在BIOS中设置高于32 MB的人设置DVMT（`framebuffer-stolenmem` / `framebuffer-fbmem`）
- 设置更高的VRAM（`framebuffer-unifiedmem`）
- 禁用eGPU（`disable-external-gpu`）
- 启用4K支持的像素时钟补丁（`enable-hdmi20`）
- 禁用连接器以启用睡眠（`framebuffer-pipecount` / `framebuffer-portcount` / `framebuffer-conX-type =-1`）
- 删除低于10.13.6上的eDP笔记本电脑屏幕的CNConnectorAlwaysConnected标志（`framebuffer-con0-flags = 0x00000090`）
- 更改连接器类型以匹配您的系统端口（`framebuffer-conX-type`）



我们有两种不同类型的补丁：

#### 硬编码（推荐）

```xml-dtd
framebuffer-patch-enable (required to enable below)
framebuffer-framebufferid (optional; defaults to current platform-id)
(all below are optional)
framebuffer-mobile
framebuffer-pipecount
framebuffer-portcount
framebuffer-memorycount
framebuffer-stolenmem
framebuffer-fbmem
framebuffer-unifiedmem

framebuffer-conX-enable (required to enable below)
framebuffer-conX-index
framebuffer-conX-busid
framebuffer-conX-pipe
framebuffer-conX-type
framebuffer-conX-flags
```

#### 查找/替换

```xml-dtd
framebuffer-patchX-enable (required to enable below)
framebuffer-patchX-framebufferid (optional; defaults to current platform-id)
framebuffer-patchX-find
framebuffer-patchX-replace
framebuffer-patchX-count (optional; defaults to 1)
```

你应该把这些补丁放到`CLOVER`配置文件config.plist中的**Devices/Properties**

#### 下面是一些补丁的例子

32MB BIOS, 19MB stolen (framebuffer) 9MB fbmem (cursor) 2048MB unifiedmem (vram)

**备注：**该值以字节为单位，所以你应该MB转换为字节（你可以使用这个[在线转换器](https://www.gbmb.org/mb-to-bytes)）

```xml
<key>Devices</key>
<dict>
    <key>Properties</key>
    <dict>
        <key>PciRoot(0x0)/Pci(0x2,0x0)</key>
        <dict>
            <key>AAPL,ig-platform-id</key>
            <data>CQClPg==</data>
            <key>framebuffer-patch-enable</key>
            <integer>1</integer>
            <key>framebuffer-stolenmem</key>
            <integer>19922944</integer>
            <key>framebuffer-fbmem</key>
            <integer>9437184</integer>
            <key>framebuffer-unifiedmem</key>
            <integer>2147483648</integer>
        </dict>
    </dict>
</dict>
```

**Pipe / Port Count 3 to 2 - Connector 1 (BusId 0x4) DP to HDMI - Connector 2 (BusId 0x6) Disable**

**备注：**`WhateverGreen`会自动设置所有连接器从DP-> HDMI（你可以使用**-igfxnohdmi**引导标志禁用这个）

```xml
<key>Devices</key>
<dict>
    <key>Properties</key>
    <dict>
        <key>PciRoot(0x0)/Pci(0x2,0x0)</key>
        <dict>
            <key>AAPL,ig-platform-id</key>
            <data>CQClPg==</data>
            <key>framebuffer-patch-enable</key>
            <integer>1</integer>
            <key>framebuffer-pipecount</key>
            <integer>2</integer>
            <key>framebuffer-portcount</key>
            <integer>2</integer>
            <key>framebuffer-con1-enable</key>
            <integer>1</integer>
            <key>framebuffer-con1-type</key>
            <integer>0x00000800</integer>
            <key>framebuffer-con2-enable</key>
            <integer>1</integer>
            <key>framebuffer-con2-type</key>
            <integer>-1</integer>
        </dict>
    </dict>
</dict>
```

**这里是查找/替换方法的一个例子：**

```xml
<key>Devices</key>
<dict>
    <key>Properties</key>
    <dict>
        <key>PciRoot(0x0)/Pci(0x2,0x0)</key>
        <dict>
            <key>AAPL,ig-platform-id</key>
            <data>CQClPg==</data>
            <key>framebuffer-patch0-enable</key>
            <integer>1</integer>
            <key>framebuffer-patch0-find</key>
            <data>AAAIAAIAAACYAAAA</data>
            <key>framebuffer-patch0-replace</key>
            <data>AAAIAAIAAACHAQAA</data>
        </dict>
    </dict>
</dict>
```

**以我的机器为例**：我的这台笔记本是dell inspiron 15 7560，显卡为Intel HD Graphics 620，platform-id为0x59160000。

```ruby
ID: 59160000, STOLEN: 34 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00000B0B
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 103 MB, MAX OVERALL: 104 MB (109588480 bytes)
GPU Name: Intel HD Graphics 620
Model Name(s): MacBookPro14,2
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000800, flags: 0x00000187 - HDMI
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00080000 87010000
```

通过查询FreamBuffer数据得知：它有三个显示接口：LVDS（内屏）/DP（外屏）/HDMI（外屏），而这台笔记本只有一个HDMI的显示接口用于连接外部显示器，我希望让外屏能正常工作，包括完美支持HDMI显示/音频同步输出，同时我想装个逼，顺手修改下显存为3072MB(framebuffer-unifiedmem)。补丁如下：

Pipe / Port Count 3 to 2 - Connector 1 (BusId 0x5) DP to HDMI - Connector 2 (BusId 0x4) Disable

```ruby
<key>Devices</key>
<dict>
    <key>Properties</key>
    <dict>
        <key>PciRoot(0x0)/Pci(0x2,0x0)</key>
        <dict>
            <key>AAPL,ig-platform-id</key>
            <data>AAAWWQ==</data>
            <key>framebuffer-patch-enable</key>
            <integer>1</integer>
            <key>framebuffer-pipecount</key>
            <integer>2</integer>
            <key>framebuffer-portcount</key>
            <integer>2</integer>
            <key>framebuffer-con1-enable</key>
            <integer>1</integer>
            <key>framebuffer-con1-type</key>
            <integer>0x00000800</integer>
            <key>framebuffer-con2-enable</key>
            <integer>1</integer>
            <key>framebuffer-con2-type</key>
            <integer>-1</integer>
    		<key>framebuffer-unifiedmem</key>
			<data>AAAAwA==</data>
        </dict>
    </dict>
</dict>
```
![fbpatch](http://7.daliansky.net/fbpatch.jpg)
![fbpatch2](http://7.daliansky.net/fbpatch2.jpg)
![fbpatch3](http://7.daliansky.net/fbpatch3.jpg)

自动化打补丁程序下载：[FBPatcher](http://headsoft.com.au/download/mac/FBPatcher.zip)，后续我会发布该工具的教程，敬请期待。

![FBPatcher](http://7.daliansky.net/FBPatcher.jpg)

#### 调试

如果您需要的帧缓冲区的转储十六进制使用的引导标志**-igfxdump**。输出将在**/ AppleIntelFramebuffer_GEN_KERNX_Y**启动驱动器（如AppleIntelFramebuffer_10_17.7）上。使用INTEL核显FB修复工具[FBPatcher](http://headsoft.com.au/download/mac/FBPatcher.zip)可以生成`config.plist/Devices/Properties`的补丁，最新的版本还支持为USB端口和声卡打补丁；[010编辑器](https://www.sweetscape.com/010editor/)支持[IntelFramebuffer.bt](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/IntelFramebuffer.bt)解析帧缓存的二进制文件的模板。  从WhateverGreen请给调试输出，并使用**-wegdbg**引导标志。您将需要编译WhateverGreen作为调试的这两个标志的工作。  

**要查看调试输出使用：**

```bash
log show --predicate 'process == "kernel" AND (eventMessage CONTAINS "WhateverGreen" OR eventMessage CONTAINS "Lilu")' --style syslog --source --last boot
```

## 感谢

非常感谢**vit9696**他的所有帮助实现这一点，也书写了惊人的**Lilu**和**WhateverGreen**插件。同时也感谢所有其他的[贡献者](https://github.com/acidanthera/WhateverGreen#credits)。

# macOS High Sierra 10.13.6(17G2112)/Mojave ig-platform-id数据整理

## Sandy Bridge

```ruby
ID: 00010000
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 1 MB, MAX STOLEN: 0 bytes, MAX OVERALL: 1 MB (1064960 bytes)
GPU Name: Intel HD Graphics 3000
Model Name(s): MacBookPro8,1 MacBookPro8,2 MacBookPro8,3
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 2, PortCount: 4, FBMemoryCount: 0
[5] busId: 0x03, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000007 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000009 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000400, flags: 0x00000009 - DP
05030000 02000000 30000000
02050000 00040000 07000000
03040000 00040000 09000000
04060000 00040000 09000000

ID: 00020000
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 1 MB, MAX STOLEN: 0 bytes, MAX OVERALL: 1 MB (1052672 bytes)
GPU Name: Intel HD Graphics 3000
Model Name(s): MacBookPro8,3
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 2, PortCount: 1, FBMemoryCount: 0
[5] busId: 0x03, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
05030000 02000000 30000000

ID: 00030010
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 1 MB, MAX STOLEN: 0 bytes, MAX OVERALL: 1 MB (1060864 bytes)
GPU Name: Intel HD Graphics 3000
Model Name(s): Macmini5,1 Macmini5,3
Freq: 0 Hz, FreqMax: -1 Hz
Mobile: 0, PipeCount: 2, PortCount: 3, FBMemoryCount: 0
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000007 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000009 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000800, flags: 0x00000006 - HDMI
02050000 00040000 07000000
03040000 00040000 09000000
04060000 00080000 06000000

ID: 00030030
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 0 bytes, MAX STOLEN: 0 bytes, MAX OVERALL: 0 bytes
GPU Name: Intel HD Graphics 3000
Model Name(s): Macmini5,2
Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 00040000
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 1 MB, MAX STOLEN: 0 bytes, MAX OVERALL: 1 MB (1060864 bytes)
GPU Name: Intel HD Graphics 3000
Model Name(s): MacBookAir4,1 MacBookAir4,2
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 2, PortCount: 3, FBMemoryCount: 0
[1] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000007 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000009 - DP
01000000 02000000 30000000
02050000 00040000 07000000
03040000 00040000 09000000

ID: 00030020
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 0 bytes, MAX OVERALL: 1 MB (1589248 bytes)
GPU Name: Intel HD Graphics 3000
Model Name(s): Macmini5,1 Macmini5,3
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 3, PortCount: 4, FBMemoryCount: 0
[1] busId: 0x00, pipe: 0, type: 0x00000400, flags: 0x00000030 - DP
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000007 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000009 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000800, flags: 0x00000006 - HDMI
01000000 00040000 30000000
02050000 00040000 07000000
03040000 00040000 09000000
04060000 00080000 06000000

ID: 00050000
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 1 MB, MAX STOLEN: 0 bytes, MAX OVERALL: 1 MB (1052672 bytes)
GPU Name: Intel HD Graphics 3000
Model Name(s): iMac12,1 iMac12,2
Freq: 0 Hz, FreqMax: -1 Hz
Mobile: 0, PipeCount: 2, PortCount: 1, FBMemoryCount: 0
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000007 - DP
02050000 00040000 07000000
```

## Ivy Bridge

```ruby
0x01660000 (desktop, 4 connectors)
0x01620006 (desktop, 0 connectors, no fbmem)
0x01620007 (desktop, 0 connectors, no fbmem)
0x01620005 (desktop, 3 connectors)
0x01660001 (mobile, 4 connectors)
0x01660002 (mobile, 1 connectors)
0x01660008 (mobile, 3 connectors)
0x01660009 (mobile, 3 connectors)
0x01660003 (mobile, 4 connectors)
0x01660004 (mobile, 1 connectors)
0x0166000A (desktop, 3 connectors)
0x0166000B (desktop, 3 connectors)

ID: 01660000, STOLEN: 96 MB, FBMEM: 24 MB, VRAM: 1024 MB
TOTAL STOLEN: 24 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 72 MB, MAX OVERALL: 73 MB (77086720 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): 
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 0, PipeCount: 3, PortCount: 4, FBMemoryCount: 3
[1] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000007 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000007 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000400, flags: 0x00000007 - DP
01000000 02000000 30000000
02050000 00040000 07000000
03040000 00040000 07000000
04060000 00040000 07000000

ID: 01620006, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 256 MB
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 0 bytes, MAX STOLEN: 0 bytes, MAX OVERALL: 0 bytes
GPU Name: Intel HD Graphics 4000
Model Name(s): Unknown
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 01620007, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 256 MB
TOTAL STOLEN: 0 bytes, TOTAL CURSOR: 0 bytes, MAX STOLEN: 0 bytes, MAX OVERALL: 0 bytes
GPU Name: Intel HD Graphics 4000
Model Name(s): Unknown
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 01620005, STOLEN: 32 MB, FBMEM: 16 MB, VRAM: 1536 MB
TOTAL STOLEN: 16 MB, TOTAL CURSOR: 1 MB, MAX STOLEN: 32 MB, MAX OVERALL: 33 MB (34615296 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): Unknown
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 0, PipeCount: 2, PortCount: 3, FBMemoryCount: 2
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000011 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
02050000 00040000 11000000
03040000 00040000 07010000
04060000 00040000 07010000

ID: 01660001, STOLEN: 96 MB, FBMEM: 24 MB, VRAM: 1536 MB
TOTAL STOLEN: 24 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 72 MB, MAX OVERALL: 73 MB (77086720 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): MacBookPro10,2
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 3, PortCount: 4, FBMemoryCount: 3
[1] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
[2] busId: 0x05, pipe: 0, type: 0x00000800, flags: 0x00000006 - HDMI
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
01000000 02000000 30000000
02050000 00080000 06000000
03040000 00040000 07010000
04060000 00040000 07010000

ID: 01660002, STOLEN: 64 MB, FBMEM: 24 MB, VRAM: 1536 MB
TOTAL STOLEN: 24 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 24 MB, MAX OVERALL: 25 MB (26742784 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): MacBookPro10,1
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 3, PortCount: 1, FBMemoryCount: 1
[1] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
01000000 02000000 30000000

ID: 01660008, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1536 MB
TOTAL STOLEN: 16 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 48 MB, MAX OVERALL: 49 MB (51916800 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): MacBookAir5,1
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
01000000 02000000 30000000
02050000 00040000 07010000
03040000 00040000 07010000

ID: 01660009, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1536 MB
TOTAL STOLEN: 16 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 48 MB, MAX OVERALL: 49 MB (51916800 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): MacBookAir5,2
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
01000000 02000000 30000000
02050000 00040000 07010000
03040000 00040000 07010000

ID: 01660003, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1536 MB
TOTAL STOLEN: 16 MB, TOTAL CURSOR: 1 MB, MAX STOLEN: 32 MB, MAX OVERALL: 33 MB (34619392 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): MacBookPro9,2
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 2, PortCount: 4, FBMemoryCount: 2
[5] busId: 0x03, pipe: 0, type: 0x00000002, flags: 0x00000030 - LVDS
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000407 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000081 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000400, flags: 0x00000081 - DP
05030000 02000000 30000000
02050000 00040000 07040000
03040000 00040000 81000000
04060000 00040000 81000000

ID: 01660004, STOLEN: 32 MB, FBMEM: 16 MB, VRAM: 1536 MB
TOTAL STOLEN: 16 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 16 MB, MAX OVERALL: 17 MB (18354176 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): MacBookPro9,1
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 1, PipeCount: 3, PortCount: 1, FBMemoryCount: 1
[5] busId: 0x03, pipe: 0, type: 0x00000002, flags: 0x00000230 - LVDS
05030000 02000000 30020000

ID: 0166000A, STOLEN: 32 MB, FBMEM: 16 MB, VRAM: 1536 MB
TOTAL STOLEN: 16 MB, TOTAL CURSOR: 1 MB, MAX STOLEN: 32 MB, MAX OVERALL: 33 MB (34615296 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): Macmini6,1
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 0, PipeCount: 2, PortCount: 3, FBMemoryCount: 2
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000800, flags: 0x00000006 - HDMI
02050000 00040000 07010000
03040000 00040000 07010000
04060000 00080000 06000000

ID: 0166000B, STOLEN: 32 MB, FBMEM: 16 MB, VRAM: 1536 MB
TOTAL STOLEN: 16 MB, TOTAL CURSOR: 1 MB, MAX STOLEN: 32 MB, MAX OVERALL: 33 MB (34615296 bytes)
GPU Name: Intel HD Graphics 4000
Model Name(s): Macmini6,2
Freq: 1808 Hz, FreqMax: 1808 Hz
Mobile: 0, PipeCount: 2, PortCount: 3, FBMemoryCount: 2
[2] busId: 0x05, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
[3] busId: 0x04, pipe: 0, type: 0x00000400, flags: 0x00000107 - DP
[4] busId: 0x06, pipe: 0, type: 0x00000800, flags: 0x00000006 - HDMI
02050000 00040000 07010000
03040000 00040000 07010000
04060000 00080000 06000000
```

## Haswell

```ruby
0x0C060000 (desktop, 3 connectors)
0x0C160000 (desktop, 3 connectors)
0x0C260000 (desktop, 3 connectors)
0x04060000 (desktop, 3 connectors)
0x04160000 (desktop, 3 connectors)
0x04260000 (desktop, 3 connectors)
0x0D260000 (desktop, 3 connectors)
0x0A160000 (desktop, 3 connectors)
0x0A260000 (desktop, 3 connectors)
0x0A260005 (mobile, 3 connectors)
0x0A260006 (mobile, 3 connectors)
0x0A2E0008 (mobile, 3 connectors)
0x0A16000C (mobile, 3 connectors)
0x0D260007 (mobile, 4 connectors)
0x0D220003 (desktop, 3 connectors)
0x0A2E000A (desktop, 3 connectors)
0x0A26000A (desktop, 3 connectors)
0x0A2E000D (desktop, 2 connectors)
0x0A26000D (desktop, 2 connectors)
0x04120004 (desktop, 0 connectors, no fbmem)
0x0412000B (desktop, 0 connectors, no fbmem)
0x0D260009 (mobile, 1 connectors)
0x0D26000E (mobile, 4 connectors)
0x0D26000F (mobile, 1 connectors)

ID: 0C060000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel Haswell GT1
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 0C160000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel Haswell GT2
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 0C260000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel Haswell GT3
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 04060000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel Haswell GT1
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 04160000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel HD Graphics 4600
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 04260000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel HD Graphics 5000
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 0D260000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel Iris Pro Graphics 5200
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 0A160000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel HD Graphics 4400
Model Name(s): 
Camelia: Disabled, Freq: 2777 Hz, FreqMax: 2777 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 0A260000, STOLEN: 64 MB, FBMEM: 16 MB, VRAM: 1024 MB, Flags: 0x00000004
TOTAL STOLEN: 209 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 209 MB, MAX OVERALL: 210 MB (220737536 bytes)
GPU Name: Intel HD Graphics 5000
Model Name(s): 
Camelia: Disabled, Freq: 2777 Hz, FreqMax: 2777 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30000000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 0A260005, STOLEN: 32 MB, FBMEM: 19 MB, VRAM: 1536 MB, Flags: 0x0000000F
TOTAL STOLEN: 52 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 116 MB, MAX OVERALL: 117 MB (123219968 bytes)
GPU Name: Intel HD Graphics 5000
Model Name(s): 
Camelia: Disabled, Freq: 2777 Hz, FreqMax: 2777 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000087 - DP
[2] busId: 0x04, pipe: 9, type: 0x00000400, flags: 0x00000087 - DP
00000800 02000000 30000000
01050900 00040000 87000000
02040900 00040000 87000000

ID: 0A260006, STOLEN: 32 MB, FBMEM: 19 MB, VRAM: 1536 MB, Flags: 0x0000000F
TOTAL STOLEN: 52 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 116 MB, MAX OVERALL: 117 MB (123219968 bytes)
GPU Name: Intel HD Graphics 5000
Model Name(s): MacBookAir6,1 MacBookAir6,2 Macmini7,1
Camelia: Disabled, Freq: 2777 Hz, FreqMax: 2777 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000087 - DP
[2] busId: 0x04, pipe: 9, type: 0x00000400, flags: 0x00000087 - DP
00000800 02000000 30000000
01050900 00040000 87000000
02040900 00040000 87000000

ID: 0A2E0008, STOLEN: 64 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x0000021E
TOTAL STOLEN: 99 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 227 MB, MAX OVERALL: 228 MB (239611904 bytes)
GPU Name: Intel Iris Graphics 5100
Model Name(s): MacBookPro11,1
Camelia: V1, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000107 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000107 - DP
00000800 02000000 30000000
01050900 00040000 07010000
02040A00 00040000 07010000

ID: 0A16000C, STOLEN: 64 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x0000001E
TOTAL STOLEN: 99 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 227 MB, MAX OVERALL: 228 MB (239611904 bytes)
GPU Name: Intel HD Graphics 4400
Model Name(s): Unknown
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000107 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000107 - DP
00000800 02000000 30000000
01050900 00040000 07010000
02040A00 00040000 07010000

ID: 0D260007, STOLEN: 64 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x0000031E
TOTAL STOLEN: 99 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 227 MB, MAX OVERALL: 228 MB (239616000 bytes)
GPU Name: Intel Iris Pro Graphics 5200
Model Name(s): MacBookPro11,2 MacBookPro11,3
Camelia: Disabled, Freq: 1953 Hz, FreqMax: 1953 Hz
Mobile: 1, PipeCount: 3, PortCount: 4, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 11, type: 0x00000400, flags: 0x00000107 - DP
[2] busId: 0x04, pipe: 11, type: 0x00000400, flags: 0x00000107 - DP
[3] busId: 0x06, pipe: 3, type: 0x00000800, flags: 0x00000006 - HDMI
00000800 02000000 30000000
01050B00 00040000 07010000
02040B00 00040000 07010000
03060300 00080000 06000000

ID: 0D220003, STOLEN: 32 MB, FBMEM: 19 MB, VRAM: 1536 MB, Flags: 0x00000402
TOTAL STOLEN: 33 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 116 MB, MAX OVERALL: 117 MB (123219968 bytes)
GPU Name: Intel Iris Pro Graphics 5200
Model Name(s): iMac14,1 iMac14,4
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000087 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000087 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x00000011 - DP
01050900 00040000 87000000
02040A00 00040000 87000000
03060800 00040000 11000000

ID: 0A2E000A, STOLEN: 32 MB, FBMEM: 19 MB, VRAM: 1536 MB, Flags: 0x000000D6
TOTAL STOLEN: 52 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 116 MB, MAX OVERALL: 117 MB (123219968 bytes)
GPU Name: Intel Iris Graphics 5100
Model Name(s): Unknown
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000011 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000087 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000087 - DP
00000800 02000000 11000000
01050900 00040000 87000000
02040A00 00040000 87000000

ID: 0A26000A, STOLEN: 32 MB, FBMEM: 19 MB, VRAM: 1536 MB, Flags: 0x000000D6
TOTAL STOLEN: 52 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 116 MB, MAX OVERALL: 117 MB (123219968 bytes)
GPU Name: Intel HD Graphics 5000
Model Name(s): Unknown
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000011 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000087 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000087 - DP
00000800 02000000 11000000
01050900 00040000 87000000
02040A00 00040000 87000000

ID: 0A2E000D, STOLEN: 96 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x0000040E
TOTAL STOLEN: 131 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 227 MB, MAX OVERALL: 228 MB (239607808 bytes)
GPU Name: Intel Iris Graphics 5100
Model Name(s): Unknown
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 2, FBMemoryCount: 2
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000107 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000107 - DP
01050900 00040000 07010000
02040A00 00040000 07010000

ID: 0A26000D, STOLEN: 96 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x0000040E
TOTAL STOLEN: 131 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 227 MB, MAX OVERALL: 228 MB (239607808 bytes)
GPU Name: Intel HD Graphics 5000
Model Name(s): Unknown
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 2, FBMemoryCount: 2
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000107 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000107 - DP
01050900 00040000 07010000
02040A00 00040000 07010000

ID: 04120004, STOLEN: 32 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00000000
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel HD Graphics 4600
Model Name(s): 
Camelia: Disabled, Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 0412000B, STOLEN: 32 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00000000
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel HD Graphics 4600
Model Name(s): iMac15,1
Camelia: Disabled, Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 0D260009, STOLEN: 64 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x0000001E
TOTAL STOLEN: 99 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 99 MB, MAX OVERALL: 100 MB (105385984 bytes)
GPU Name: Intel Iris Pro Graphics 5200
Model Name(s): Unknown
Camelia: Disabled, Freq: 1953 Hz, FreqMax: 1953 Hz
Mobile: 1, PipeCount: 3, PortCount: 1, FBMemoryCount: 1
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
00000800 02000000 30000000

ID: 0D26000E, STOLEN: 96 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x0000031E
TOTAL STOLEN: 131 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 323 MB, MAX OVERALL: 324 MB (340279296 bytes)
GPU Name: Intel Iris Pro Graphics 5200
Model Name(s): Unknown
Camelia: V2, Freq: 1953 Hz, FreqMax: 1953 Hz
Mobile: 1, PipeCount: 3, PortCount: 4, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
[1] busId: 0x05, pipe: 11, type: 0x00000400, flags: 0x00000107 - DP
[2] busId: 0x04, pipe: 11, type: 0x00000400, flags: 0x00000107 - DP
[3] busId: 0x06, pipe: 3, type: 0x00000800, flags: 0x00000006 - HDMI
00000800 02000000 30000000
01050B00 00040000 07010000
02040B00 00040000 07010000
03060300 00080000 06000000

ID: 0D26000F, STOLEN: 96 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x0000001E
TOTAL STOLEN: 131 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 131 MB, MAX OVERALL: 132 MB (138940416 bytes)
GPU Name: Intel Iris Pro Graphics 5200
Model Name(s): Unknown
Camelia: V2, Freq: 1953 Hz, FreqMax: 1953 Hz
Mobile: 1, PipeCount: 3, PortCount: 1, FBMemoryCount: 1
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000030 - LVDS
00000800 02000000 30000000
```

## Broadwell

```ruby
0x16060000 (desktop, 3 connectors)
0x160E0000 (desktop, 3 connectors)
0x16160000 (desktop, 3 connectors)
0x161E0000 (desktop, 3 connectors)
0x16260000 (desktop, 3 connectors)
0x162B0000 (desktop, 3 connectors)
0x16220000 (desktop, 3 connectors)
0x160E0001 (mobile, 3 connectors)
0x161E0001 (mobile, 3 connectors)
0x16060002 (mobile, 3 connectors)
0x16160002 (mobile, 3 connectors)
0x16260002 (mobile, 3 connectors)
0x16220002 (mobile, 3 connectors)
0x162B0002 (mobile, 3 connectors)
0x16120003 (mobile, 4 connectors)
0x162B0004 (desktop, 3 connectors)
0x16260004 (desktop, 3 connectors)
0x16220007 (desktop, 3 connectors)
0x16260005 (mobile, 3 connectors)
0x16260006 (mobile, 3 connectors)
0x162B0008 (desktop, 2 connectors)
0x16260008 (desktop, 2 connectors)

ID: 16060000, STOLEN: 16 MB, FBMEM: 15 MB, VRAM: 1024 MB, Flags: 0x00000B06
TOTAL STOLEN: 32 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 64 MB, MAX OVERALL: 65 MB (68694016 bytes)
GPU Name: Intel Broadwell GT1
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30020000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 160E0000, STOLEN: 16 MB, FBMEM: 15 MB, VRAM: 1024 MB, Flags: 0x00000706
TOTAL STOLEN: 32 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 64 MB, MAX OVERALL: 65 MB (68694016 bytes)
GPU Name: Intel Broadwell GT1
Model Name(s): Unknown
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30020000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 16160000, STOLEN: 16 MB, FBMEM: 15 MB, VRAM: 1024 MB, Flags: 0x00000B06
TOTAL STOLEN: 32 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 64 MB, MAX OVERALL: 65 MB (68694016 bytes)
GPU Name: Intel HD Graphics 5500
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30020000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 161E0000, STOLEN: 16 MB, FBMEM: 15 MB, VRAM: 1024 MB, Flags: 0x00000716
TOTAL STOLEN: 32 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 64 MB, MAX OVERALL: 65 MB (68694016 bytes)
GPU Name: Intel HD Graphics 5300
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30020000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 16260000, STOLEN: 16 MB, FBMEM: 15 MB, VRAM: 1024 MB, Flags: 0x00000B06
TOTAL STOLEN: 32 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 64 MB, MAX OVERALL: 65 MB (68694016 bytes)
GPU Name: Intel HD Graphics 6000
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30020000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 162B0000, STOLEN: 16 MB, FBMEM: 15 MB, VRAM: 1024 MB, Flags: 0x00000B06
TOTAL STOLEN: 32 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 64 MB, MAX OVERALL: 65 MB (68694016 bytes)
GPU Name: Intel Iris Graphics 6100
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30020000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 16220000, STOLEN: 16 MB, FBMEM: 15 MB, VRAM: 1024 MB, Flags: 0x0000110E
TOTAL STOLEN: 32 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 64 MB, MAX OVERALL: 65 MB (68694016 bytes)
GPU Name: Intel Iris Pro Graphics 6200
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000004, flags: 0x00000004 - DigitalDVI
[2] busId: 0x04, pipe: 9, type: 0x00000800, flags: 0x00000082 - HDMI
00000800 02000000 30020000
01050900 04000000 04000000
02040900 00080000 82000000

ID: 160E0001, STOLEN: 38 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00000702
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 136 MB, MAX OVERALL: 137 MB (144191488 bytes)
GPU Name: Intel Broadwell GT1
Model Name(s): 
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00001001 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00003001 - DP
00000800 02000000 30020000
01050900 00040000 01100000
02040A00 00040000 01300000

ID: 161E0001, STOLEN: 38 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00000702
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 136 MB, MAX OVERALL: 137 MB (144191488 bytes)
GPU Name: Intel HD Graphics 5300
Model Name(s): MacBook8,1
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00001001 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00003001 - DP
00000800 02000000 30020000
01050900 00040000 01100000
02040A00 00040000 01300000

ID: 16060002, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00004B02
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel Broadwell GT1
Model Name(s): 
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 30020000
01050900 00040000 07050000
02040A00 00040000 07050000

ID: 16160002, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00004B02
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 5500
Model Name(s): 
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 30020000
01050900 00040000 07050000
02040A00 00040000 07050000

ID: 16260002, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00004B0A
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 6000
Model Name(s): 
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 30020000
01050900 00040000 07050000
02040A00 00040000 07050000

ID: 16220002, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00004B0A
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel Iris Pro Graphics 6200
Model Name(s): 
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 30020000
01050900 00040000 07050000
02040A00 00040000 07050000

ID: 162B0002, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00004B0A
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel Iris Graphics 6100
Model Name(s): MacBookPro12,1
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 30020000
01050900 00040000 07050000
02040A00 00040000 07050000

ID: 16120003, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00001306
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131612672 bytes)
GPU Name: Intel HD Graphics 5600
Model Name(s): 
Camelia: V1, Freq: 1953 Hz, FreqMax: 1953 Hz
Mobile: 1, PipeCount: 3, PortCount: 4, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 11, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 11, type: 0x00000400, flags: 0x00000507 - DP
[3] busId: 0x06, pipe: 3, type: 0x00000800, flags: 0x00000006 - HDMI
00000800 02000000 30020000
01050B00 00040000 07050000
02040B00 00040000 07050000
03060300 00080000 06000000

ID: 162B0004, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00040B46
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel Iris Graphics 6100
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000211 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 11020000
01050900 00040000 07050000
02040A00 00040000 07050000

ID: 16260004, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00040B46
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 6000
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000211 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 11020000
01050900 00040000 07050000
02040A00 00040000 07050000

ID: 16220007, STOLEN: 38 MB, FBMEM: 38 MB, VRAM: 1536 MB, Flags: 0x000BB306
TOTAL STOLEN: 77 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 153 MB, MAX OVERALL: 154 MB (162017280 bytes)
GPU Name: Intel Iris Pro Graphics 6200
Model Name(s): iMac16,2
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x00000011 - DP
01050900 00040000 07050000
02040A00 00040000 07050000
03060800 00040000 11000000

ID: 16260005, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00000B0B
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 6000
Model Name(s): 
Camelia: Disabled, Freq: 2777 Hz, FreqMax: 2777 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 11, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 11, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 30020000
01050B00 00040000 07050000
02040B00 00040000 07050000

ID: 16260006, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00000B0B
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 6000
Model Name(s): iMac16,1 MacBookAir7,1 MacBookAir7,2
Camelia: Disabled, Freq: 2777 Hz, FreqMax: 2777 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000230 - LVDS
[1] busId: 0x05, pipe: 11, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 11, type: 0x00000400, flags: 0x00000507 - DP
00000800 02000000 30020000
01050B00 00040000 07050000
02040B00 00040000 07050000

ID: 162B0008, STOLEN: 34 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x00002B0E
TOTAL STOLEN: 69 MB, TOTAL CURSOR: 1 MB, MAX STOLEN: 103 MB, MAX OVERALL: 104 MB (109060096 bytes)
GPU Name: Intel Iris Graphics 6100
Model Name(s): 
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 2, PortCount: 2, FBMemoryCount: 2
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
01050900 00040000 07050000
02040A00 00040000 07050000

ID: 16260008, STOLEN: 34 MB, FBMEM: 34 MB, VRAM: 1536 MB, Flags: 0x00002B0E
TOTAL STOLEN: 69 MB, TOTAL CURSOR: 1 MB, MAX STOLEN: 103 MB, MAX OVERALL: 104 MB (109060096 bytes)
GPU Name: Intel HD Graphics 6000
Model Name(s): Unknown
Camelia: Disabled, Freq: 5273 Hz, FreqMax: 5273 Hz
Mobile: 0, PipeCount: 2, PortCount: 2, FBMemoryCount: 2
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000507 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000507 - DP
01050900 00040000 07050000
02040A00 00040000 07050000
```

## Skylake

```ruby
0x191E0000 (mobile, 3 connectors)
0x19160000 (mobile, 3 connectors)
0x19260000 (mobile, 3 connectors)
0x19270000 (mobile, 3 connectors)
0x191B0000 (mobile, 3 connectors)
0x193B0000 (mobile, 3 connectors)
0x19120000 (mobile, 3 connectors)
0x19020001 (desktop, 0 connectors, no fbmem)
0x19170001 (desktop, 0 connectors, no fbmem)
0x19120001 (desktop, 0 connectors, no fbmem)
0x19320001 (desktop, 0 connectors, no fbmem)
0x19160002 (mobile, 3 connectors, no fbmem)
0x19260002 (mobile, 3 connectors, no fbmem)
0x191E0003 (mobile, 3 connectors, no fbmem)
0x19260004 (mobile, 3 connectors, no fbmem)
0x19270004 (mobile, 3 connectors, no fbmem)
0x193B0005 (mobile, 4 connectors, no fbmem)
0x191B0006 (mobile, 1 connectors, no fbmem)
0x19260007 (mobile, 3 connectors, no fbmem)

ID: 191E0000, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x0000050F
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 515
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 19160000, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x0000090F
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 520
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 19260000, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x0000090F
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel Iris Graphics 540
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 19270000, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x0000090F
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel Iris Graphics 550
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 191B0000, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x0000110F
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 530
Model Name(s): MacBookPro13,3
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 193B0000, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00001187
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel Iris Pro Graphics 580
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[2] busId: 0x04, pipe: 10, type: 0x00000800, flags: 0x00000187 - HDMI
[3] busId: 0x06, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
02040A00 00080000 87010000
03060A00 00040000 87010000

ID: 19120000, STOLEN: 34 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x0000110F
TOTAL STOLEN: 56 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 124 MB, MAX OVERALL: 125 MB (131608576 bytes)
GPU Name: Intel HD Graphics 530
Model Name(s): iMac17,1
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[-1] busId: 0x00, pipe: 0, type: 0x00000001, flags: 0x00000020 - Dummy
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
FF000000 01000000 20000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 19020001, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00040800
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel HD Graphics 510
Model Name(s): 
Camelia: Disabled, Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 19170001, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00040800
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel Skylake GT2f
Model Name(s): 
Camelia: Disabled, Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 19120001, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00040800
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel HD Graphics 530
Model Name(s): 
Camelia: Disabled, Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 19320001, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00040800
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel Iris Pro Graphics 580
Model Name(s): 
Camelia: Disabled, Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 19160002, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00830B02
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel HD Graphics 520
Model Name(s): 
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
00000800 02000000 98040000
01050900 00040000 C7030000
02040A00 00040000 C7030000

ID: 19260002, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00E30B0A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Iris Graphics 540
Model Name(s): MacBookPro13,1
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
00000800 02000000 98040000
01050900 00040000 C7030000
02040A00 00040000 C7030000

ID: 191E0003, STOLEN: 40 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x002B0702
TOTAL STOLEN: 41 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 121 MB, MAX OVERALL: 122 MB (128462848 bytes)
GPU Name: Intel HD Graphics 515
Model Name(s): MacBook9,1
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000181 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000181 - DP
00000800 02000000 98000000
01050900 00040000 81010000
02040A00 00040000 81010000

ID: 19260004, STOLEN: 34 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00030B0A
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 103 MB, MAX OVERALL: 104 MB (109588480 bytes)
GPU Name: Intel Iris Graphics 540
Model Name(s): 
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000001C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000001C7 - DP
00000800 02000000 98040000
01050900 00040000 C7010000
02040A00 00040000 C7010000

ID: 19270004, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00E30B0A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Iris Graphics 550
Model Name(s): MacBookPro13,2
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
00000800 02000000 98040000
01050900 00040000 C7030000
02040A00 00040000 C7030000

ID: 193B0005, STOLEN: 34 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0023130A
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 137 MB, MAX OVERALL: 138 MB (145244160 bytes)
GPU Name: Intel Iris Pro Graphics 580
Model Name(s): MacBookPro13,1
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 4, FBMemoryCount: 4
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000001C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000001C7 - DP
[3] busId: 0x06, pipe: 10, type: 0x00000400, flags: 0x000001C7 - DP
00000800 02000000 98000000
01050900 00040000 C7010000
02040A00 00040000 C7010000
03060A00 00040000 C7010000

ID: 191B0006, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00131302
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 512 KB, MAX STOLEN: 39 MB, MAX OVERALL: 39 MB (41422848 bytes)
GPU Name: Intel HD Graphics 530
Model Name(s): 
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 1, PortCount: 1, FBMemoryCount: 1
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
00000800 02000000 98040000

ID: 19260007, STOLEN: 34 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00031302
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 103 MB, MAX OVERALL: 104 MB (109588480 bytes)
GPU Name: Intel Iris Graphics 540
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000001C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000001C7 - DP
00000800 02000000 98000000
01050900 00040000 C7010000
02040A00 00040000 C7010000
```

## Kaby Lake

```ruby
0x591E0000 (mobile, 3 connectors, no fbmem)
0x59160000 (mobile, 3 connectors, no fbmem)
0x59230000 (desktop, 3 connectors, no fbmem)
0x59260000 (desktop, 3 connectors, no fbmem)
0x59270000 (desktop, 3 connectors, no fbmem)
0x59270009 (mobile, 3 connectors, no fbmem)
0x59120000 (desktop, 3 connectors, no fbmem)
0x591B0000 (mobile, 3 connectors)
0x591E0001 (mobile, 3 connectors, no fbmem)
0x59180002 (mobile, 0 connectors, no fbmem)
0x59120003 (mobile, 0 connectors, no fbmem)
0x59260007 (desktop, 3 connectors)
0x59270004 (mobile, 3 connectors, no fbmem)
0x59260002 (mobile, 3 connectors, no fbmem)
0x591B0006 (mobile, 1 connectors, no fbmem)

ID: 591E0000, STOLEN: 34 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0000078B
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 103 MB, MAX OVERALL: 104 MB (109588480 bytes)
GPU Name: Intel HD Graphics 615
Model Name(s): MacBook10,1
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 59160000, STOLEN: 34 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00000B0B
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 103 MB, MAX OVERALL: 104 MB (109588480 bytes)
GPU Name: Intel HD Graphics 620
Model Name(s): MacBookPro14,2
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000800, flags: 0x00000187 - HDMI
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00080000 87010000

ID: 59230000, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00030B8B
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 115 MB, MAX OVERALL: 116 MB (122171392 bytes)
GPU Name: Intel HD Graphics 635
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 59260000, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00030B8B
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 115 MB, MAX OVERALL: 116 MB (122171392 bytes)
GPU Name: Intel Iris Plus Graphics 640
Model Name(s): MacBookPro14,1 iMac18,1
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 59270000, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00030B8B
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 115 MB, MAX OVERALL: 116 MB (122171392 bytes)
GPU Name: Intel Iris Plus Graphics 650
Model Name(s): MacBookPro14,2
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 59270009, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00830B0A
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 115 MB, MAX OVERALL: 116 MB (122171392 bytes)
GPU Name: Intel Iris Plus Graphics 650
Model Name(s): 
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000001C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000001C7 - DP
00000800 02000000 98000000
01050900 00040000 C7010000
02040A00 00040000 C7010000

ID: 59120000, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0000110B
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 115 MB, MAX OVERALL: 116 MB (122171392 bytes)
GPU Name: Intel HD Graphics 630
Model Name(s): iMac18,2 iMac18,3
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
[3] busId: 0x06, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
01050900 00040000 87010000
02040A00 00040000 87010000
03060A00 00040000 87010000

ID: 591B0000, STOLEN: 38 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x0000130B
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 136 MB, MAX OVERALL: 137 MB (144191488 bytes)
GPU Name: Intel HD Graphics 630
Model Name(s): MacBookPro14,3
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[2] busId: 0x04, pipe: 10, type: 0x00000800, flags: 0x00000187 - HDMI
[3] busId: 0x06, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
02040A00 00080000 87010000
03060A00 00040000 87010000

ID: 591E0001, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x002B0702
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 115 MB, MAX OVERALL: 116 MB (122171392 bytes)
GPU Name: Intel HD Graphics 615
Model Name(s): MacBook10,1
Camelia: V2, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000181 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000181 - DP
00000800 02000000 98000000
01050900 00040000 81010000
02040A00 00040000 81010000

ID: 59180002, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00001000
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Unknown
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 59120003, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00001000
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel HD Graphics 630
Model Name(s): iMac18,2 iMac18,3
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 59260007, STOLEN: 57 MB, FBMEM: 21 MB, VRAM: 1536 MB, Flags: 0x00830B0E
TOTAL STOLEN: 79 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Iris Plus Graphics 640
Model Name(s): 
Camelia: Disabled, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
00000800 02000000 98000000
01050900 00040000 C7030000
02040A00 00040000 C7030000

ID: 59270004, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00E30B0A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Iris Plus Graphics 650
Model Name(s): MacBookPro14,2
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
00000800 02000000 98040000
01050900 00040000 C7030000
02040A00 00040000 C7030000

ID: 59260002, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00E30B0A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Iris Plus Graphics 640
Model Name(s): MacBookPro14,1 iMac18,1
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
00000800 02000000 98040000
01050900 00040000 C7030000
02040A00 00040000 C7030000

ID: 591B0006, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00031302
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 512 KB, MAX STOLEN: 39 MB, MAX OVERALL: 39 MB (41422848 bytes)
GPU Name: Intel HD Graphics 630
Model Name(s): 
Camelia: V3, Freq: 1388 Hz, FreqMax: 1388 Hz
Mobile: 1, PipeCount: 1, PortCount: 1, FBMemoryCount: 1
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
00000800 02000000 98040000
```

## Coffee Lake

```ruby
0x3EA50009 (mobile, 3 connectors, no fbmem)
0x3E920009 (mobile, 3 connectors, no fbmem)
0x3E9B0009 (mobile, 3 connectors, no fbmem)
0x3EA50000 (mobile, 3 connectors, no fbmem)
0x3E920000 (mobile, 3 connectors, no fbmem)
0x3E000000 (mobile, 3 connectors, no fbmem)
0x3E9B0000 (mobile, 3 connectors, no fbmem)
0x3EA50004 (mobile, 3 connectors, no fbmem)
0x3E9B0006 (mobile, 1 connectors, no fbmem)
0x3E9B0007 (desktop, 3 connectors, no fbmem)

ID: 3EA50009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00830B0A
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel HD Graphics CFL CRB
Camelia: CameliaV3 (3), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - ConnectorLVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000001C7 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000001C7 - ConnectorDP
00000800 02000000 98000000
01050900 00040000 C7010000
02040A00 00040000 C7010000

ID: 3E920009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0083130A
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel HD Graphics CFL CRB
Camelia: CameliaV3 (3), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - ConnectorLVDS
[255] busId: 0x00, pipe: 0, type: 0x00000001, flags: 0x00000020 - ConnectorDummy
[255] busId: 0x00, pipe: 0, type: 0x00000001, flags: 0x00000020 - ConnectorDummy
00000800 02000000 98000000
FF000000 01000000 20000000
FF000000 01000000 20000000

ID: 3E9B0009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0083130A
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel HD Graphics CFL CRB
Camelia: CameliaV3 (3), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - ConnectorLVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - ConnectorDP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3EA50000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00030B0B
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel HD Graphics CFL CRB
Camelia: CameliaDisabled (0), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - ConnectorLVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - ConnectorDP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3E920000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0000130B
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel HD Graphics CFL CRB
Camelia: CameliaDisabled (0), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - ConnectorLVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - ConnectorDP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3E000000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0000130B
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel HD Graphics CFL CRB
Camelia: CameliaDisabled (0), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - ConnectorLVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - ConnectorDP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3E9B0000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0000130B
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel HD Graphics CFL CRB
Camelia: CameliaDisabled (0), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - ConnectorLVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - ConnectorDP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3EA50004, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00E30B0A
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel Iris Plus Graphics 655
Camelia: CameliaV3 (3), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - ConnectorLVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
00000800 02000000 98040000
01050900 00040000 C7030000
02040A00 00040000 C7030000

ID: 3E9B0006, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00131302
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 512 KB, OVERALL: 39 MB (41422848 bytes)
Model name: Intel UHD Graphics 630
Camelia: CameliaV3 (3), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 1, PipeCount: 1, PortCount: 1, FBMemoryCount: 1
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - ConnectorLVDS
00000800 02000000 98040000

ID: 3E9B0007, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00801302
TOTAL STOLEN: 172 MB, TOTAL CURSOR: 1 MB (1572864 bytes), OVERALL: 173 MB (181940224 bytes)
Model name: Intel HD Graphics CFL
Camelia: CameliaDisabled (0), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000

Note, that without AAPL,ig-platform-id the following ID is assumed: 3EA50000
```

## Cannon Lake

```ruby
0x5A510009 (mobile, 3 connectors, no fbmem)
0x5A400009 (mobile, 3 connectors, no fbmem)
0x5A410009 (mobile, 3 connectors, no fbmem)
0x5A590009 (mobile, 3 connectors, no fbmem)
0x5A490009 (mobile, 3 connectors, no fbmem)
0x5A500009 (mobile, 3 connectors, no fbmem)
0x5A510000 (mobile, 3 connectors, no fbmem)
0x5A400000 (mobile, 3 connectors, no fbmem)
0x5A410000 (mobile, 3 connectors, no fbmem)
0x5A590000 (mobile, 3 connectors, no fbmem)
0x5A490000 (mobile, 3 connectors, no fbmem)
0x5A500000 (mobile, 3 connectors, no fbmem)
0x5A520000 (mobile, 3 connectors, no fbmem)
0x0A010000 (mobile, 1 connectors, no fbmem)

ID: 5A510009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT2
Model Name(s): Unknown
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x000009C7 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x000009C7 - DP
00000800 02000000 98000000
01010900 00040000 C7090000
02020A00 00040000 C7090000

ID: 5A400009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Unknown
Model Name(s): Unknown
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x000009C7 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x000009C7 - DP
00000800 02000000 98000000
01010900 00040000 C7090000
02020A00 00040000 C7090000

ID: 5A410009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT1
Model Name(s): Unknown
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x000009C7 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x000009C7 - DP
00000800 02000000 98000000
01010900 00040000 C7090000
02020A00 00040000 C7090000

ID: 5A590009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT1.5
Model Name(s): Unknown
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x000009C7 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x000009C7 - DP
00000800 02000000 98000000
01010900 00040000 C7090000
02020A00 00040000 C7090000

ID: 5A490009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT0.5
Model Name(s): Unknown
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x000009C7 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x000009C7 - DP
00000800 02000000 98000000
01010900 00040000 C7090000
02020A00 00040000 C7090000

ID: 5A500009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT2
Model Name(s): Unknown
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x000009C7 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x000009C7 - DP
00000800 02000000 98000000
01010900 00040000 C7090000
02020A00 00040000 C7090000

ID: 5A510000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT2
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x00000987 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x00000987 - DP
00000800 02000000 98000000
01010900 00040000 87090000
02020A00 00040000 87090000

ID: 5A400000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Unknown
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x00000987 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x00000987 - DP
00000800 02000000 98000000
01010900 00040000 87090000
02020A00 00040000 87090000

ID: 5A410000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT1
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x00000987 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x00000987 - DP
00000800 02000000 98000000
01010900 00040000 87090000
02020A00 00040000 87090000

ID: 5A590000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT1.5
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x00000987 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000800, flags: 0x00000986 - HDMI
00000800 02000000 98000000
01010900 00040000 87090000
02020A00 00080000 86090000

ID: 5A490000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT0.5
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x00000987 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x00000987 - DP
00000800 02000000 98000000
01010900 00040000 87090000
02020A00 00040000 87090000

ID: 5A500000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00A0070B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT2
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x00000987 - DP
[2] busId: 0x02, pipe: 10, type: 0x00000400, flags: 0x00000987 - DP
00000800 02000000 98000000
01010900 00040000 87090000
02020A00 00040000 87090000

ID: 5A520000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00000803
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Cannonlake GT2
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x01, pipe: 9, type: 0x00000400, flags: 0x00000987 - DP
[3] busId: 0x04, pipe: 10, type: 0x00000800, flags: 0x00000187 - HDMI
00000800 02000000 98000000
01010900 00040000 87090000
03040A00 00080000 87010000

ID: 0A010000, STOLEN: 34 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00000702
TOTAL STOLEN: 35 MB, TOTAL CURSOR: 512 KB, MAX STOLEN: 35 MB, MAX OVERALL: 35 MB (37228544 bytes)
GPU Name: Unknown
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 1, PortCount: 1, FBMemoryCount: 1
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
00000800 02000000 98000000
```

## Ice Lake (LP)

```ruby
0xFF050000 (mobile, 3 connectors, no fbmem)
0x8A700000 (mobile, 3 connectors, no fbmem)
0x8A510000 (mobile, 3 connectors, no fbmem)
0x8A5C0000 (mobile, 3 connectors, no fbmem)
0x8A5D0000 (mobile, 3 connectors, no fbmem)
0x8A520000 (mobile, 3 connectors, no fbmem)
0x8A5A0000 (mobile, 3 connectors, no fbmem)
0x8A5B0000 (mobile, 3 connectors, no fbmem)

ID: FF050000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00000602
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Unknown
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A700000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Unknown
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A510000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Ice Lake GT2
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A5C0000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Ice Lake GT1.5
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A5D0000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Ice Lake GT1
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A520000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Ice Lake GT2
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A5A0000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Ice Lake GT1.5
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A5B0000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Ice Lake GT1
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000
```

## Ice Lake(HP)

```ruby
0xFF050000 (mobile, 3 connectors, no fbmem)
0x8A510000 (mobile, 3 connectors, no fbmem)
0x8A520000 (mobile, 3 connectors, no fbmem)

ID: FF050000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00000602
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Unknown
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A510000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Ice Lake GT2
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000

ID: 8A520000, STOLEN: 64 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0001000B
TOTAL STOLEN: 65 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 193 MB, MAX OVERALL: 194 MB (203960320 bytes)
GPU Name: Intel Ice Lake GT2
Model Name(s): Unknown
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 0, type: 0x00000002, flags: 0x00000018 - LVDS
[1] busId: 0x02, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
[2] busId: 0x09, pipe: 1, type: 0x00000400, flags: 0x00000201 - DP
00000000 00000000 00000000 00000000 02000000 18000000
01000000 02000000 01000000 00000000 00040000 01020000
02000000 09000000 01000000 01000000 00040000 01020000
```

# macOS 10.14 Beta 4 (18A336e)

## Coffee Lake

```ruby
0x3EA50009 (mobile, 3 connectors, no fbmem)
0x3E920009 (mobile, 3 connectors, no fbmem)
0x3E9B0009 (mobile, 3 connectors, no fbmem)
0x3EA50000 (mobile, 3 connectors, no fbmem)
0x3E920000 (mobile, 3 connectors, no fbmem)
0x3E000000 (mobile, 3 connectors, no fbmem)
0x3E9B0000 (mobile, 3 connectors, no fbmem)
0x3EA50004 (mobile, 3 connectors, no fbmem)
0x3E9B0006 (mobile, 1 connectors, no fbmem)
0x3E9B0007 (desktop, 3 connectors, no fbmem)
0x3E920003 (desktop, 0 connectors, no fbmem)
0x3E910003 (desktop, 0 connectors, no fbmem)

ID: 3EA50009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00830B0A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Iris Plus Graphics 655
Model Name(s): 
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000001C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000001C7 - DP
00000800 02000000 98000000
01050900 00040000 C7010000
02040A00 00040000 C7010000

ID: 3E920009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0083130A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel UHD Graphics 630
Model Name(s): 
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[-1] busId: 0x00, pipe: 0, type: 0x00000001, flags: 0x00000020 - Dummy
[-1] busId: 0x00, pipe: 0, type: 0x00000001, flags: 0x00000020 - Dummy
00000800 02000000 98000000
FF000000 01000000 20000000
FF000000 01000000 20000000

ID: 3E9B0009, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0083130A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel UHD Graphics 630
Model Name(s): 
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3EA50000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00030B0B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Iris Plus Graphics 655
Model Name(s): 
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3E920000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0000130B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel UHD Graphics 630
Model Name(s): 
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3E000000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0000130B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Unknown
Model Name(s): 
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3E9B0000, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x0000130B
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel UHD Graphics 630
Model Name(s): MacBookPro15,1
Camelia: Disabled
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000098 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x00000187 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x00000187 - DP
00000800 02000000 98000000
01050900 00040000 87010000
02040A00 00040000 87010000

ID: 3EA50004, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00E30B0A
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel Iris Plus Graphics 655
Model Name(s): MacBookPro15,2
Camelia: V3
Mobile: 1, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
00000800 02000000 98040000
01050900 00040000 C7030000
02040A00 00040000 C7030000

ID: 3E9B0006, STOLEN: 38 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00131302
TOTAL STOLEN: 39 MB, TOTAL CURSOR: 512 KB, MAX STOLEN: 39 MB, MAX OVERALL: 39 MB (41422848 bytes)
GPU Name: Intel UHD Graphics 630
Model Name(s): 
Camelia: V3
Mobile: 1, PipeCount: 1, PortCount: 1, FBMemoryCount: 1
[0] busId: 0x00, pipe: 8, type: 0x00000002, flags: 0x00000498 - LVDS
00000800 02000000 98040000

ID: 3E9B0007, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00801302
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel UHD Graphics 630
Model Name(s): 
Camelia: Disabled
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000

ID: 3E920003, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00001000
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel UHD Graphics 630
Model Name(s): 
Camelia: Disabled
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0

ID: 3E910003, STOLEN: 0 bytes, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00001000
TOTAL STOLEN: 1 MB, TOTAL CURSOR: 0 bytes, MAX STOLEN: 1 MB, MAX OVERALL: 1 MB
GPU Name: Intel UHD Graphics 630
Model Name(s): 
Camelia: Disabled
Mobile: 0, PipeCount: 0, PortCount: 0, FBMemoryCount: 0
```

## 显示器接口数据格式

#### 原文链接：[https://www.tonymacx86.com/threads/guide-intel-framebuffer-patching-for-mojave.256490/#post-1780416](https://www.tonymacx86.com/threads/guide-intel-framebuffer-patching-for-mojave.256490/#post-1780416)



# 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:

331686786 [一起吃苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91) 2000人群
688324116 [一起黑苹果](https://shang.qq.com/wpa/qunwpa?idkey=6bf69a6f4b983dce94ab42e439f02195dfd19a1601522c10ad41f4df97e0da82)   500人群
257995340 [一起啃苹果](http://shang.qq.com/wpa/qunwpa?idkey=8a63c51acb2bb80184d788b9f419ffcc33aa1ed2080132c82173a3d881625be8)   500人群