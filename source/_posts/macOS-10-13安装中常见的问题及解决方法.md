---
title: macOS 10.13安装中常见的问题及解决方法
urlname: macOS-10.13-installation-of-common-problems-and-solutions
date: 2017-09-28 09:50:25
top: 100
tags:
- 10.13
- High Sierra
- 安装
- 常见问题
- 屏蔽独显
- EDID
- 花屏
- 黑屏
categories:
- 教程
---


## 去掉`Lilu`的输出信息,还原10.13 内核崩溃(kernel pance)的真相
> 援引:如果你有一个`kernel panic`，请确保你有一个DEBUG版本的扩展，并且已经添加了`-v keepyms = 1 debug = 0x100`引导参数。 在10.13上，为了避免kext名字在崩溃日志(panic log)中滚动，你也应该[修补你的内核]

10.13的系统引导中,万一发生了`kernel panic`,也就是内核崩溃后,`Lilu`输出的信息过多,造成无法看清内核崩溃时的问题所在,这里教大家一种方法,去掉`Lilu`的输出信息,还原造成内核崩溃后面的真相

### 解决方法1:
使用文本编辑器打开`config.plist`文件,在

```xml
<key>KernelToPatch</key>
```

下面添加:

```xml
        <array>
            <dict>
                <key>Comment</key>
                <string>Disable panic kext logging on 10.13 Debug kernel</string>
                <key>Disabled</key>
                <false/>
                <key>Find</key>
                <data>
                sABMi1Xw
                </data>
                <key>MatchOS</key>
                <string>10.13</string>
                <key>Replace</key>
                <data>
                SIPEQF3D
                </data>
            </dict>
            <dict>
                <key>Comment</key>
                <string>Disable panic kext logging on 10.13 Release kernel</string>
                <key>Disabled</key>
                <false/>
                <key>Find</key>
                <data>
                igKEwHRE
                </data>
                <key>MatchOS</key>
                <string>10.13</string>
                <key>Replace</key>
                <data>
                igKEwOtE
                </data>
            </dict>
        </array>
```

### 解决方法2:
使用`Clover Configurator`打开`config.plist` - `Kernel and Kext Patches` - `kernelToPatch`，新添加：

```xml
Comment:    Disable panic kext logging on 10.13 Debug kernel
Find:       b0004c8b 55f0
Replace:    4883c440 5dc3
MatchOS:    10.13

Comment:    Disable panic kext logging on 10.13 Release kernel
Find:       8a0284c0 7444
Replace:    8a0284c0 eb44
MatchOS:    10.13
```

## 安装10.13时卡在`Service only ran for 0 seconds. Pushing respawn out by 10 second`
> 此种现象常见于笔记本机型，由于10.13中的DSDT屏蔽独显方式失效，现使用 `hotpatch` 方式进行独显屏蔽。

### 使用方法：
将 `SSDT-Disable-DGPU.aml` 复制到 `/EFI/CLOVER/ACPI/patched` 目录下即可
### 下载链接：[https://pan.baidu.com/s/1skRcIyL](https://pan.baidu.com/s/1skRcIyL)

## 解决安装时提示 `OSInstall.mpkg似乎已缺失或已损坏` 的问题
### 解决方法：
删除 `/EFI/CLOVER/drivers64UEFI/EmuVariableUefi-64.efi` 和 `/EFI/` 分区根目录下的 `nvram.plist`

## 解决10.13 NVIDIA安装Web Driver黑屏问题
### 解决方法：
在 `/EFI/CLOVER/kexts/Other` 目录下添加驱动： [NvidiaGraphicsFixup](https://sourceforge.net/p/nvidiagraphicsfixup) 该驱动依赖于 [Lilu](https://github.com/vit9696/Lilu/releases) 
> 更多基于[Lilu](https://github.com/vit9696/Lilu/)的插件列表请移步：[Lilu插件列表](https://blog.daliansky.net/Existing-Lilu-Plugins.html)

## 解决10.13下某些机械硬盘无法读取的问题
使用`Clover Configurator`打开`config.plist` - `Kernel and Kext Patches` - `KextsToPatch`，新添加：

```sh
Name:       AppleAHCIPort
Comment:    修复ICH10芯片 I/O Error 错误
Find:       4585F60F 95C289C8 83E0FE66 85C9780F 84D2750B
Replace:    89C883E0 FE6685C9 0F98C141 08CC9090 9090750B
MatchOS:    10.13.x
```
另一种格式：

```xml
        <dict>
            <key>Comment</key>
            <string>修复ICH10芯片 I/O Error 错误</string>
            <key>Disabled</key>
            <false/>
            <key>Find</key>
           <data>RYX2D5XCiciD4P5mhcl4D4TSdQs=</data>
            <key>MatchOS</key>
            <string>10.13.x</string>
            <key>Name</key>
            <string>AppleAHCIPort</string>
            <key>Replace</key>
            <data>iciD4P5mhckPmMFBCMyQkJCQdQs=</data>
         </dict>
```

## 解决10.13(High Sierra)/10.12(Sierra) Clover开机出现8个苹果
使用`Clover Configurator`打开`config.plist` - `Kernel and Kext Patches` - `KextsToPatch`，新添加：

```sh
Name:       IOGraphicsFamily
Comment:    10.12+-第二阶段花屏
Find:       01000075 25
Replace:    010000eb 25
MatchOS:    10.12.x
```

```sh
Name:       IOGraphicsFamily
Comment:    10.13+-第二阶段花屏
Find:       01000075 22
Replace:    010000eb 22
MatchOS:    10.13.x
```
另一种格式：

```xml
			<dict>
				<key>Comment</key>
				<string>10.12+-第二阶段花屏补丁</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<data>
				AQAAdSU=
				</data>
				<key>MatchOS</key>
				<string>10.12.x</string>
				<key>Name</key>
				<string>IOGraphicsFamily</string>
				<key>Replace</key>
				<data>
				AQAA6yU=
				</data>
			</dict>
			<dict>
				<key>Comment</key>
				<string>10.13+-第二阶段花屏补丁</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<data>
				AQAAdSI=
				</data>
				<key>MatchOS</key>
				<string>10.13.x</string>
				<key>Name</key>
				<string>IOGraphicsFamily</string>
				<key>Replace</key>
				<data>
				AQAA6yI=
				</data>
			</dict>
```

## 不使用任何程序教你提取显示器的EDID，解决笔记本显示器内屏黑屏/花屏的问题
> 经常有网友需要解决笔记本显示器内屏黑屏问题，尤其新发布的10.13的系统会出现睡眠唤醒后屏幕花屏问题。

目前最简单的方案就是通过clover注入显示器的EDID信息，之前网上的教程都是使用Windows下的应用程序进行操作。
其实显示器的EDID信息都会在显卡正确驱动后存在于ioreg中的。

### 最简单的命令是：

```bash
ioreg -lw0 | grep -i "IODisplayEDID" | sed -e 's/.*<//' -e 's/>//'
```
### 显示信息如下：

` 00ffffffffffff000daee01500000000161a0104952213780228659759548e271e505400000001010101010101010101010101010101b43b804a713834405036680058c11000001ac32f804a713834405036680058c11000001a000000fe0035324b4636803135364843410a000000000000413196011000000a010a202000e8
`
### 接着输入下面的两条命令：
```bash
ioreg -l | grep "DisplayVendorID"  
    "DisplayVendorID" = 3502
    
ioreg -l | grep "DisplayProductID"  
    "DisplayProductID" = 5600
```
其中<>里面的内容就是显示器的EDID信息，将提取出来的EDID信息粘贴到clover的 `config.plist` 中，顺便将 `VendorID` 和 `ProductID` 填入相应的位置，然后保存重启你的电脑。
![EDID注入](http://ous2s14vo.bkt.clouddn.com/EDID注入.png)


## 选择-v时出现`Attempting system restart...MACH Reboot`的解决方法
> 在安装High Sierra启动过程中，选择-v跑时会出现"Attempting system restart...MACH Reboot”，而不用-v图跑直接显示苹果标志时则不会出现。

### 解决方法
在`config.plist`配置文件`DropTables`下添加以下代码：

```xml
<key>ACPI</key>
<key>DropTables</key>
<array>
  <dict>
    <key>Signature</key>
    <string>MATS</string>
  </dict>
  <dict>
    <key>Signature</key>
    <string>DMAR</string>
  </dict>
</array>
```

## 关于开机出现`Welcome to Clover xxxx user settings`卡住不动的解决方法
> 根源是`Clover`目录下自带的`config.plist`它并不适用于你的系统

### 解决方法
* 删除`config.plist`,找个适合你的机型的配置文件改名为:`config.plist`
* 如果还是卡住的话,就把`ACPI/patched`目录下除了`SSDT-Disable-DGPU.aml`的所有文件全部删除.
* 或者使用与您相同机型的EFI直接替换


## 写在最后
> 本文会不定期更新
> 最后更新：11-22-2017

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)



