---
title: macOS 10.13安装中常见的问题及解决方法
urlname: macOS-10.13-installation-of-common-problems-and-solutions
date: 2017-09-28 09:50:25
top: 98
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

```ruby
Comment:    Disable panic kext logging on 10.13 Debug kernel
Find:       b0004c8b 55f0
Replace:    4883c440 5dc3
MatchOS:    10.13

Comment:    Disable panic kext logging on 10.13 Release kernel
Find:       8a0284c0 7444
Replace:    8a0284c0 eb44
MatchOS:    10.13
```

## 8750h核显黑屏的临时解决方法：

```ruby
Comment	8750h黑屏补丁
Find	00000800 02000000 98000000
Name	com.apple.driver.AppleIntelKBLGraphicsFramebuffer
Replace	00000800 02000000 87010000
```

将内屏设置成外屏后，亮度值不可调，可以通过`Clover Configurator`里面的`SystemParameters`-`BacklightLevel`设置亮度值：`0x00c8`，这个亮度值可以调整成你喜欢的亮度。

原帖出处:https://www.tonymacx86.com/threads/help-black-screen-when-uhd630-run-with-internal-screen.250577/page-5#post-1762999

## 10.13.0/1/2/3 改变USB端口限制补丁

```ruby
Comment	10.13.0/1/2/3 USB Port 10->26
Find	837D8C10
Name	com.apple.driver.usb.AppleUSBXHCI
Replace	837D8C1B
MatchOS	10.13.0,10.13.1,10.13.2,10.13.3
```

## 10.13.4/5 关闭USB端口限制补丁

```ruby
Comment	disable USB Port Limit Patch (PMheart)
Find	837D940F 0F839704 0000
Name	com.apple.driver.usb.AppleUSBXHCI
Replace	837D940F 90909090 9090
MatchOS	10.13.x
```

## 10.13.6 改变USB端口限制补丁

```ruby
Comment	USB Port 15->26
Find	837d880f 0f83a704
Name	com.apple.driver.usb.AppleUSBXHCI
Replace	837d881a 0f83a704
MatchOS	10.13.6
```

补丁出处：[insanelymac.com](https://www.insanelymac.com/forum/topic/334239-pre-release-macos-high-sierra-10136-beta-17g31f/?do=findComment&comment=2615919)

## macOS升级后应该先插入啥？

有些群友通过`App Store`更新了系统后，就会在群里提出更新后某些功能不正常了，我的方法是直接使用`Kext Utility`重建缓存再重启，包治百病！比如：HDMI Audio输出没了，内屏背光亮度不可调等等。

## 安装过程中出现错误信息`good.win.HWPEnabler（1.1）`
该问题是由于新版的CLOVER中集成了HWPEnabler这个新平台的变频程序，如果你的机器比较老旧，那么就需要禁用掉这个驱动以使安装程序得以进行。那么如何操作呢？现在就让我们搬出CLOVER自带的`Block Injected kexts`吧
### Block injected kexts 禁用无效的、未知的驱动程序

当你面对这么一堆驱动的时候，如何让它们有条不紊地正常工作呢？万一出现问题的时候又如何让这些驱动在Clover引导的时候禁用它们呢？这个时候 `Block injected kexts` 就派上用场了。新版的 `Clover Bootloader` 已经将 `Block injected kexts` 放到了 `macOS` 系统分区的图标下面了。

- 操作方法：
  - 开机进入clover引导界面，要引导的分区卷标上按 `空格` 即可进入
    ![1-main](http://7.daliansky.net/1-main.png)
  - 光标移动到 `Block injected kexts` 回车进入
    ![kim](http://7.daliansky.net/Blockinjectedkexts.png)
  - 选择当前系统加载的驱动程序目录
    ![kimselect](http://7.daliansky.net/BIKSelect.png)
  - 勾选禁用的驱动程序
    ![kimoptions](http://7.daliansky.net/BIKChoose.png)
  - 按 `ESC` 退出该子菜单

## 误食了偏方进不了系统怎么办？

> 经常会有群友说是安装了`ALCPlugFix`后重启无法进入系统的问题，这是由于新的10.13.2及以后的重建缓存的命令发生了改变，部分机器会出现类似的问题。现在我把恢复的方法公布出来，让更多的人看到，同时也在此提醒大家使用`KEXT UTILITY`这个应用程序来重建缓存。请及时更新各声卡驱动所配套的`ALCPlugFix`，我发布的程序中已经使用新的重建缓存的命令。

### 恢复方法：

- 在` Clover` 主界面选择`Recovery`进入恢复模式，如果没有`Recovery`的图标，请按下`F3`

- 打开终端，依次输入这三条命令：

  ```bash
  rm -rf /Volumes/MAC/System/Library/Caches/com.apple.kext.caches/Startup/kernelcache
  rm -rf /Volumes/MAC/System/Library/PrelinkedKernels/prelinkedkernel
  touch  /Volumes/MAC/System/Library/Extensions/ && kextcache -u /Volumes/MAC
  ```

  ​	其中的`MAC`是你安装`macOS`的卷标，请替换成你自己的

- 重启

### 挂载EFI分区

Windows操作系统下面,以系统管理员身份打开`cmd`,输入命令:

```sh
c:\>diskpart
list disk           # 磁盘列表
select disk n       # 选择EFI分区所在的磁盘，n为磁盘号
list partition      # 磁盘分区列表
select partition n  # 选择EFI分区，n为EFI分区号
set id="ebd0a0a2-b9e5-4433-87c0-68b6b72699c7"	# 设置为EFI分区
assign letter=X     # x为EFI分区盘符
exit				# 退出diskpart
notepad				# 打开记事本程序，点击文件->打开，即可访问EFI分区
```

您可以重复输入命令同时挂载USB的EFI分区和磁盘的EFI分区

## 安装10.13时卡在`Service only ran for 0 seconds. Pushing respawn out by 10 second`

> 此种现象常见于笔记本机型，由于10.13中的DSDT屏蔽独显方式失效，现使用 `hotpatch` 方式进行独显屏蔽。

### 使用方法：
将 `SSDT-Disable-DGPU.aml` 复制到 `/EFI/CLOVER/ACPI/patched` 目录下即可
### 下载链接：[https://pan.baidu.com/s/1skRcIyL](https://pan.baidu.com/s/1skRcIyL)

## 解决安装时提示 `OSInstall.mpkg似乎已缺失或已损坏` 的问题
### 解决方法：
#### 删除 `/EFI/CLOVER/drivers64UEFI/EmuVariableUefi-64.efi` 和 `/EFI/` 分区根目录下的 `nvram.plist`
#### 修改`SMBIOS`,使用`Clover Configurator`将机型设置为2012年及以后机型

## 解决10.13 NVIDIA安装Web Driver黑屏问题

### 解决方法：

在 `/EFI/CLOVER/kexts/Other` 目录下添加驱动： [NvidiaGraphicsFixup](https://sourceforge.net/p/nvidiagraphicsfixup) 该驱动依赖于 [Lilu](https://github.com/vit9696/Lilu/releases) 
> 更多基于[Lilu](https://github.com/vit9696/Lilu/)的插件列表请移步：[Lilu插件列表](https://blog.daliansky.net/Existing-Lilu-Plugins.html)

## 解决10.13下某些机械硬盘无法读取的问题
使用`Clover Configurator`打开`config.plist` - `Kernel and Kext Patches` - `KextsToPatch`，新添加：

```ruby
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

```Ruby
Name:       IOGraphicsFamily
Comment:    10.12+-第二阶段花屏
Find:       01000075 25
Replace:    010000eb 25
MatchOS:    10.12.x
```

```Ruby
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
![EDID注入](http://7.daliansky.net/EDID注入.png)


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
  <dict>
    <key>Signature</key>
    <string>BGRT</string>
  </dict>
</array>
```

## 关于开机出现`Welcome to Clover xxxx user settings`卡住不动的解决方法

> 根源是`Clover`目录下自带的`config.plist`它并不适用于你的系统

### 解决方法
* 删除`config.plist`,找个适合你的机型的配置文件改名为:`config.plist`
* 如果还是卡住的话,就把`ACPI/patched`目录下除了`SSDT-Disable-DGPU.aml`的所有文件全部删除.
* 或者使用与您相同机型的EFI直接替换




## 抹盘时提示"MediaKit报告设备上的空间不足以执行请求的操作"的原因及解决方法

> 群里遇到最多的问题就是抹盘时提示"MediaKit报告设备上的空间不足以执行请求的操作",一直想就此写个解决方法

### 原因

出现该提示最根本的原因就是你之前的磁盘分区中`ESP`分区的尺寸小于200MB

### 解决方法

- `Windows`下使用`diskgenius`删除掉`MSR`分区,将多出来的分区合并到`ESP`,正好凑成200MB,以满足安装`macOS`的基本需求.
- `macOS`下可以直接使用`磁盘工具`进行抹盘,它会自动生成一个200MB的EFI分区,当然前提条件是你需要先备份好磁盘里的数据,否则会造成全盘数据的丢失,请谨慎操作.




## macOS下使用`brew`安装`android-platform-tools`工具连接安卓设备

> 有群友反馈说`HandShark`无法连接安卓手机进行管理,于是将`macOS`下安装`Android`驱动的过程写下来,目的是为了让大家都能使用`macOS`管理安卓设备

### 什么是 ADB?

Android调试桥（ adb ）是一个开发工具，帮助安卓设备和个人计算机之间的通信。 这种通信大多是在USB电缆下进行，但是也支持Wi-Fi连接。 adb 还可被用来与电脑上运行的安卓模拟器交流通信。 adb 对于安卓开发来说就像一把“瑞士军刀”。

`macOS`可以通过`brew`安装`android-platform-tools`驱动,用于连接安卓设备,方法如下:

- 安装`Homebrew`工具:打开终端,输入命令:

  ```bash
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

  它会自动安装brew及依赖包,同时也会安装`XCODE Command Line Tools`,出现密码请输入你的用户密码

- 安装`android-platform-tools`

  ```bash
  brew cask install android-platform-tools
  ```

  这个过程有些漫长,请耐心等待.

- 安装完成后,连接安卓设备,输入命令:

  ```bash
  adb devices
  ```

  正常情况下,它会显示出如下的信息:

  ```xml
  3HX7N17114012345	device
  ```

  也有可能需要在手机上确认允许来自`macOS`的连接

- 使用`HandShark`管理你的手机吧.


## 关于本机CPU处理器显示`未知`的解决方法：

打开终端，输入：

```bash
cd /System/Library/PrivateFrameworks/AppleSystemInfo.framework/Versions/A/Resources/zh_CN.lproj/
cp AppleSystemInfo.strings ~/Desktop
```

使用编辑器`BBEdit`打开`AppleSystemInfo.strings`，将

```xml
	<key>UnknownCPUKind</key>
	<string>未知</string>
```

修改为：

```xml
	<key>UnknownCPUKind</key>
	<string>Intel Core i7-8700K</string>
```

保存后退出。打开终端，输入：

```bash
sudo cp ~/Desktop/AppleSystemInfo.strings /System/Library/PrivateFrameworks/AppleSystemInfo.framework/Versions/A/Resources/zh_CN.lproj/
```

输入用户密码，收工。
![关于本机](http://7.daliansky.net/10.13.4/About.png)

## Nvidia WebDriver驱动小版本更新后使用之前版本的命令

### 方法：

打开终端，输入命令：

```bash
sudo plutil -replace IOKitPersonalities.NVDAStartup.NVDARequiredOS -string $(sw_vers -buildVersion) /S*/L*/E*/NVDAStartupWeb.kext/C*/Info.plist
```

收工

## 重建缓存的命令

打开终端，输入命令：

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

## 写在最后

> 本文会不定期更新
> 最后更新：8-22-2018

## 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

