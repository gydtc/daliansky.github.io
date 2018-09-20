---
title: macOS Mojave 10.14安装中常见的问题及解决方法
date: 2018-08-05 09:05:51
urlname: Common-problems-and-solutions-in-macOS-Mojave-10.14-installation
top: 100
tags:
- 10.14
- Mojave
- 安装
- 常见问题
categories:
- 教程
---

> 随着macOS Mojave(莫哈韦) 10.14发行正式版本的临近，各种安装常见问题也需要同步更新，本篇文章就是针对10.14的常见问题的汇总，我会持续不间断更新，敬请期待

## 关于`Clover Bootloader`的版本

想要正确地安装macOS Mojave 10.14，它要求你的`Clover Bootloader`版本不低于r4515，截止到目前为止，`Clover Bootloader`的版本已经更新为v2.4k r4636。[Clover Bootloader最新版本下载](https://github.com/Dids/clover-builder/releases)



## 关于HD3000平台

macOS Mojave 10.14已经不支持Sandy Bridge平台的安装使用，解决方法有两个：

- 在引导标志(boot args)添加`-no_compat_check`跳过兼容性检查
- 修改SMBIOS为：`MacBookAir5,1`

## Kaby Lake UHD 620显卡特别说明

部分基于类似`AAPL` `GfxYTile`的注入参数在macOS Mojave 10.14中会失效，它要求将`Clover Bootloader`版本至少更新到r4587或以上，[Clover Bootloader最新版本下载](https://github.com/Dids/clover-builder/releases)

## 关于声卡注入的ID

Apple已从macOS Mojave 10.14上的`AppleHDA.kext`中删除了大量的Layouts，因此很多人需要修改/修补当前的AppleHDA.kext / AudioInjector才能使音频恢复到工作状态。
Apple在macOS Mojave上删除的布局ID为：
Layout1,3,8,9,11,12,13,18,22,23,24,25,26,27,28,29,30,31,32,34,36,37,38,39,41， 42,43,44,45,46,47,48,49,50等
要查看已删除的布局的完整列表以及可用于替换已删除的布局的列表，下面是一张可以使用并可在macOS Mojave 10.14上使用的可用布局的图片：

![10.14_layoutid](http://7.daliansky.net/10.14/10.14_layoutid.jpg)

好消息是vit9696通过更新他的`AppleALC`解决了影响去除布局的问题。`AppleALC`最新版本的下载：[https://github.com/acidanthera/AppleALC/releases ](https://github.com/acidanthera/AppleALC/releases)

## minStolenSize新补丁，用于`Broadwell`, `Skylake` 以及`Kabylake`

- Kaby Lake

  ```ruby
  Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.14 Credits (Sniki)
  Name: com.apple.driver.AppleIntelKBLGraphicsFramebuffer
  Find: 764648FF 05
  Replace: EB4648FF 05
  ```

- Sky Lake

  ```ruby
  Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.14 Credits (Sniki)
  Name: com.apple.driver.AppleIntelSKLGraphicsFramebuffer
  Find: 764048FF 05
  Replace: EB4048FF 05
  ```

- Broadwall

  ```ruby
  Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.14 Credits (Sniki)
  Name: com.apple.driver.AppleIntelBDWGraphicsFramebuffer
  Find: 764048FF 05
  Replace: EB4048FF 05
  ```

  

## USB解除端口限制补丁

```ruby
Comment: USB Port limit patch 10.14 (credits FredWst)
Name: com.apple.driver.usb.AppleUSBXHCI
Find: 83 FB 0F 0F 83 03 05 00 00
Replace: 83 FB 0F 90 90 90 90 90 90
```

## Intel HD3000显卡驱动

由于macOS Mojave 10.14中已经将`AppleIntelHD3000Graphics.kext`等相关驱动移除，一个折衷的解决方案是复制一份`macOS Sierra 10.12.x`的驱动到`/System/Library/Extensions`，重建缓存后重启即可享用。详见https://www.tonymacx86.com/threads/success-lenovo-b570e.255129/page-2#post-1770059

## 找回丢失的DW1560/Brcm94352Z驱动

Mojave系统下的蓝牙会失效，截止到目前的解决方法是：将文件`BrcmFirmwareData.kext`和`BrcmPatchRAM2.kext`复制到`/Library/Extensions`目录下

当然，在重启前，还要重建一下系统的缓存，命令为：

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

如果嫌输入命令麻烦，也可以使用应用`Kext Utility`重建缓存。

重启你的系统，检查WIFI/蓝牙是否工作正常。

## 关于10.14高通无线失效无法驱动的问题的解决方案[来自套路]

升级到Mojave的大家应该都看到了，14的驱动删掉了好多，最惹人注意的就是A卡的一堆、hd3000的几个、N卡的几个加上高通的无线网卡驱动，用了很久也琢磨了好久后，终于找到了解决高通无线挂的解决方案，下面是方法：

由于14系统内删除了Airport40的驱动，而ath9k插件又正是对其起的作用，因此前提条件是我们需要将13的这个kext拿来用，后面我会给出附件，ath9k插件的作者很久没有维护了，目前为止，作者源码只支持到10.13，因此需要我们手动修改源码使其能够支持到10.14，这里不做过多介绍，有兴趣的可以在下面评论，我会尽量解答，这里只把需要的附件做简要说明，大家也就不用再去clone源码修改编译了，附件主要包括3个，第一个是AtherosAirport40驱动，是我从13.6beta4中提取出来的，大家直接将其安装到/Library/Extensions/即可，然后就是我基于作者源码修改后的ath9k插件和最新的lilu（也是最新源码修改的），将这两个插件放到CLOVER，最后，为了保险起见，在config加上两个boot参数，分别是`-lilubetaall` 和 `-ath9565`，当然这是9565的参数，其余参数参见ath9k的说明文档，下面有链接，然后重建缓存、修复权限重启就可以了。详见：http://bbs.pcbeta.com/viewthread-1790406-1-1.html 感谢套路[athlonreg](https://github.com/athlonreg)

## APFS转换解决方法

Apple已经删除了我们必须避免APFS转换的选项，常规的方法已经无法避免安装过程中自动将分区转换为APFS格式，包括在硬盘上安装以及SSD上面安装。
以下是一些目前已知的替代品：
1.使用`Carbon Copy Cloner`（CCC）应用程序格式驱动器备份到HFS + J并恢复备份。
2.使用此应用程序将APFS分区转换为HFS + J：https：//www.paragon-software.com/home/apfs-hfs-converter/
3.使用USB转SATA电缆从外部卸下HDD / SSD并安装macOS（似乎避免了APFS转换）。
4.修补安装程序，由你来找到这个方法。

## 安装中出现的`IOConsoleUsers: time(0) 0->0, lin 0, llk 1, IOConsoleUsers: gIOScreenLockState 3, hs 0, bs 0, nov 0, sm 0x0`错误的临时解决方法

群里最常见的安装过程中出现的一个错误是：

```bash
IOConsoleUsers: time(0) 0->0, lin 0, llk 1,
IOConsoleUsers: gIOScreenLockState 3, hs 0, bs 0, nov 0, sm 0x0
```

原因是系统无法识别出你的显卡驱动，临时的解决方法是：

- 取消勾选`Inject Intel`
- 或者将`platform-id`修改为`0x12345678`
- 两种方法二选一，不知道如何操作的请移步[Clover使用教程](https://blog.daliansky.net/clover-user-manual.html)

![platform-id_0x12345678](http://7.daliansky.net/10.14/platform-id_0x12345678.jpg)

安装完成后再通过`Clover Configurator`设置正确的`FakeID`和`ig-plaform-id`驱动你的显卡。

## 去掉`Lilu`的输出信息,还原10.14 内核崩溃(kernel pance)的真相

**方法1：**使用文本编辑器，在`KernelToPatch`段落添加内容：

```xml
		<key>KernelToPatch</key>
		<array>
			<dict>
				<key>Comment</key>
				<string>Disable panic kext logging on 10.14 Release kernel (c) vit9696</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<data>
				igKEwHRC
				</data>
				<key>MatchOS</key>
				<string>10.14.x</string>
				<key>Replace</key>
				<data>
				igKEwOtC
				</data>
			</dict>
		</array>
```



**方法2：**使用`Clover Configurator`打开`config.plist` - `Kernel and Kext Patches` - `kernelToPatch`，新添加：

```ruby
Comment:    Disable panic kext logging on 10.13 Release kernel
Find:       8a0284c0 7442
Replace:    8a0284c0 eb42
MatchOS:    10.14.x
```

## 其它的内核补丁备用，请自行食用：

```ruby
cpuid_set_info_rdmsr (c) vit9696
B9A00100 000F32
B9A00100 0031C0
10.12.x,10.13.x,10.14.x
 
xcpm_idle_wrmsr (c) Pike R. Alpha
B9E20000 000F30
B9E20000 009090
10.12.x,10.13.x,10.14.x
 
xcpm_assert_rdmsr (c) Sherlocks
B9980100 000F32
B9980100 0031C0
10.12.x,10.13.x,10.14.x
 
xcpm_SMT_scope_msrs (c) Pike R. Alpha
BE0B0000 005DE908 000000
BE0B0000 005DC390 909090
10.12.x,10.13.x,10.14.x
 
cpuid_set_info (c) Pike R. Alpha
04723CD0
04XX3CD0 
10.13.x,10.14.x
- XX: need value you want
﻿  
xcpm_bootstrap (c) Pike R. Alpha
89D804C4 3C22
89D804XX 3C22
10.13.x,10.14.x
- XX: need value you want
 
xcpm_assert_wrmsr (c) Sherlocks
B9990100 000F30
B9990100 009090
10.13.x,10.14.x
 
xcpm_core_scope_msrs (c) Pike R. Alpha
BE030000 0031D2E8 79FCFFFF
BE030000 0031D290 90909090
 
xcpm_pkg_scope_msrs (c) Pike R. Alpha
BE070000 0031D2E8 91FCFFFF
BE070000 0031D290 90909090
10.14.x
 
xcpm_program_msrs (c) Pike R. Alpha
554889E5 41574156 41554154 53504189 D64889FB 4189F54C 8D3D6387
C39089E5 41574156 41554154 53504189 D64889FB 4189F54C 8D3D6387
10.14.x
 
xcpm_SMT_scope_msrs (c) Pike R. Alpha
BE0B0000 0031D2E8 66FCFFFF
BE0B0000 0031D290 90909090
10.14.x
```

## Block injected kexts 禁用无效的、未知的驱动程序

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

## 选择-v时出现`Attempting system restart...MACH Reboot`的解决方法

在安装High Sierra启动过程中，选择-v跑时会出现

```bash
Attempting system restart...MACH Reboot
```

而不用-v图跑直接显示苹果标志时则不会出现。

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

## 抹盘时提示"MediaKit报告设备上的空间不足以执行请求的操作"的原因及解决方法

> 群里遇到最多的问题就是抹盘时提示"MediaKit报告设备上的空间不足以执行请求的操作",一直想就此写个解决方法

### 原因

出现该提示最根本的原因就是你之前的磁盘分区中`ESP`分区的尺寸小于200MB

### 解决方法

- `Windows`下使用`diskgenius`删除掉`MSR`分区,将多出来的分区合并到`ESP`,正好凑成200MB,以满足安装`macOS`的基本需求.
- `macOS`下可以直接使用`磁盘工具`进行抹盘,它会自动生成一个200MB的EFI分区,当然前提条件是你需要先备份好磁盘里的数据,否则会造成全盘数据的丢失,请谨慎操作.

## 关于macOS Mojave 10.14下修改显存以及帧缓存、显示接口

请移步另一篇教程：[Coffee Lake帧缓冲区补丁及UHD630 Coffee Lake ig-platform-id数据整理](https://blog.daliansky.net/Coffee-Lake-frame-buffer-patch-and-UHD630-Coffee-Lake-ig-platform-id-data-finishing.html)

## 教你将U盘上的EFI复制到磁盘的EFI分区,脱离USB运行[macOS篇]

> 新的系统安装成功后，EFI还位于U盘里，总不能一直挂着U盘使用系统吧。这个时候如果你想将U盘里的EFI复制到磁盘的EFI分区里，却苦于找不到看不见EFI分区，这个时候是该让`diskutil`登场了。

`diskutil`命令的基本用法：

### 查看磁盘分区表

```bash
diskutil list
```

/dev/disk0(internal, physical):

| #:   |                  TYPE | NAME  | SIZE     | IDENTIFIER |
| ---- | --------------------: | ----- | -------- | ---------- |
| 0:   | GUID_partition_scheme |       | 256 GB   | disk0      |
| 1:   |                   EFI | EFI   | 200 MB   | disk0s1    |
| 2:   |             Apple_HFS | MAC   | 128 GB   | disk0s2    |
| 3:   |  Microsoft Basic Data | WIN10 | 127.7 GB | disk0s3    |

/dev/disk1(internal, physical):

| #:   |                  TYPE | NAME                 | SIZE    | IDENTIFIER |
| ---- | --------------------: | -------------------- | ------- | ---------- |
| 0:   | GUID_partition_scheme |                      | 16 GB   | disk1      |
| 1:   |                   EFI | EFI                  | 200 MB  | disk1s1    |
| 2:   |             Apple_HFS | Install macOS Sierra | 15.8 GB | disk1s2    |

### 挂载磁盘EFI分区

```bash
sudo diskutil mount disk0s1
```

### 挂载U盘EFI分区

```bash
sudo diskutil mount disk1s1
```

 打开Finder，注意后面有个`.`

```bash
open .
```

左侧会显示挂载了两个EFI分区，将U盘EFI目录全部复制到磁盘的EFI分区即可。

### 合并EFI分区

**这里有一点需要注意**:*如果之前安装过Windows系统的话,会存在EFI的目录,只是EFI的目录下面只有BOOT和Microsoft这两个目录,如果希望添加macOS的Clover引导的话,可以将USB的EFI分区里面的EFI目录下面的CLOVER复制到磁盘里的EFI目录下,也就是执行的是***合并***的操作,让EFI同时支持WINDOWS和macOS的引导.千万不要全部复制,否则有可能造成EFI无法启动Windows.*

### 复制EFI分区

如果磁盘上的EFI分区里为空的,可以直接将USB的EFI分区下面的EFI目录直接复制到磁盘上的EFI分区里.

## 教你将U盘上的EFI复制到磁盘的EFI分区,脱离USB运行[Windows篇]

### 挂载EFI分区

Windows操作系统下面,打开`cmd`窗口,输入命令:

```sh
diskpart
list disk           # 磁盘列表
select disk n       # 选择EFI分区所在的磁盘，n为磁盘号
list partition      # 磁盘分区列表
select partition n  # 选择EFI分区，n为EFI分区号
set id="ebd0a0a2-b9e5-4433-87c0-68b6b72699c7"	# 设置为EFI分区
assign letter=X     # x为EFI分区盘符
```

您可以重复输入命令同时挂载USB的EFI分区和磁盘的EFI分区
打开资源管理器，会出现一个盘符为X的磁盘，格式化为fat32格式,将USB的EFI分区下面的EFI目录复制到安装磁盘的EFI分区下

### 合并EFI分区

**这里有一点需要注意**:*如果之前安装过Windows系统的话,会存在EFI的目录,只是EFI的目录下面只有BOOT和Microsoft这两个目录,如果希望添加macOS的Clover引导的话,可以将USB的EFI分区里面的EFI目录下面的CLOVER复制到磁盘里的EFI目录下,也就是执行的是***合并***的操作,让EFI同时支持WINDOWS和macOS的引导.千万不要全部复制,否则有可能造成EFI无法启动Windows.*

### 复制EFI分区

如果磁盘上的EFI分区里为空的,可以直接将USB的EFI分区下面的EFI目录直接复制到磁盘上的EFI分区里.

## 添加UEFI引导选项

使用工具:BOOTICE

### 操作过程:

1. 打开BOOTICE软件,选择`物理磁盘`,选择欲操作的目标磁盘,点击`分区管理`,弹出分区管理的窗口,点击`分配盘符`,为`ESP`分区分配一个盘符,点击确定
   ![BOOTICE1](http://7.daliansky.net/BOOTICE1.jpg)
2. 选择`UEFI`,点击`修改启动序列`,点击`添加`按钮,菜单标题填写:`CLOVER`,选择`启动文件`,在打开的窗口里选择`ESP`分区下的目录`\EFI\CLOVER\CLOVERX64.EFI`,点击`保存当前启动项设置`
   ![BOOTICE2](http://7.daliansky.net/BOOTICE2.jpg)

## 

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
> 最后更新：8-5-2018

## 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

## QQ群:

331686786 [一起吃苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)[会员群到期，只出不进，,请加其它群]
688324116 [一起黑苹果](https://shang.qq.com/wpa/qunwpa?idkey=6bf69a6f4b983dce94ab42e439f02195dfd19a1601522c10ad41f4df97e0da82)
257995340 [一起啃苹果](http://shang.qq.com/wpa/qunwpa?idkey=8a63c51acb2bb80184d788b9f419ffcc33aa1ed2080132c82173a3d881625be8)