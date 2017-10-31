---
title: 'Mac常用到的命令[持续更新]'
date: 2017-08-17 10:24:00
urlname: Mac-frequently-used-to-the-command---continuous-update
categories:
- 教程
tags:
- shell
- spctl
- diskutil
- trimforce
- ioreg
- EDID
- APFS
- HFS+
---
# Mac常用命令
## 序言
熟练使用Mac终端操作的常用命令，可以让你更快、更加高效地进行系统操作，shell就是你的瑞士军刀
<!-- more -->
# 隐藏“允许任何来源的应用”选项问题
> 新的系统安装好后，通常你打开一个dmg文件准备安装的时候，系统会提示你`不允许打开未知来源的应用`，这是因为从macOS Sierra开始增强了GateKeeper的安全性，所以“`允许任何来源的应用`”选项被隐藏，目的在于避免除Mac AppStore和正规签名外的未知或未签名App在系统内被任意执行，从而威胁用户隐私和系统安全。但这也造成了很多不便。
**操作方法**：打开终端，输入命令：

```bash
sudo spctl --master-disable
```
验证口令后即可。

# 磁盘分区的基本操作：教你将U盘上的EFI复制到磁盘的EFI分区
> 新的系统安装成功后，EFI还位于U盘里，总不能一直挂着U盘使用系统吧。这个时候如果你想将U盘里的EFI复制到磁盘的EFI分区里，却苦于找不到看不见EFI分区，这个时候是该让`diskutil`登场了。

`diskutil`命令的基本用法：

## 查看磁盘分区表

```bash
diskutil list
```
/dev/disk0(internal, physical):

|#:|TYPE|NAME|SIZE|IDENTIFIER|
|---|--:|---|---|---|---|
|0:|GUID_partition_scheme||256 GB|disk0|
|1:|EFI|EFI|200 MB|disk0s1|
|2:|Apple_HFS|MAC|128 GB|disk0s2|
|3:|Microsoft Basic Data|WIN10|127.7 GB|disk0s3|

/dev/disk1(internal, physical):

|#:|TYPE|NAME|SIZE|IDENTIFIER|
|---|--:|---|---|---|---|
|0:|GUID_partition_scheme||16 GB|disk1|
|1:|EFI|EFI|200 MB|disk1s1|
|2:|Apple_HFS|Install macOS Sierra|15.8 GB|disk1s2|

## 挂载磁盘EFI分区
```bash
diskutil mount disk0s1
```
## 挂载U盘EFI分区

```bash
diskutil mount disk1s1
```
## 打开Finder，注意后面有个`.`

```bash
open .
```
左侧会显示挂载了两个EFI分区，将U盘EFI目录全部复制到磁盘的EFI分区即可。
## 收工


# 磁盘分区的进阶操作：教你将apfs分区转换回hfs+
> 随着macOS High Sierra发布日期的临近，苹果公司新推出的`apfs`文件格式已经频繁地出现在我们的面前，假如你还不了解`apfs`文件的前世今生，请阅读[苹果文件系统](https://zh.wikipedia.org/wiki/苹果文件系统)。**友情提示：** *`APFS` 在 macOS High Sierra（10.13）之后将成为默认的文件格式*
> 那么问题来了，万一我的分区格式已经是`apfs`，我想转换成`HFS+`有什么办法吗？当然可以了，只是这个命令隐藏得比较深，这个命令还是：`diskutil`

## diskutil命令的进阶操作
查看磁盘分区表：

```bash
diskutil list
```
/dev/disk0(internal, physical):

|#:|TYPE|NAME|SIZE|IDENTIFIER|
|---|--:|:--|---|---|---|
|0:|GUID_partition_scheme||512 GB|disk0|
|1:|EFI|EFI|200 MB|disk0s1|
|2:|Apple_HFS|MAC|128 GB|disk0s2|
|...|...|...|...|...|
|10:|Apple_APFS|Container disk1|29.2 GB|disk0s10|

/dev/disk1 (synthesized):

|#:|TYPE|NAME|SIZE|IDENTIFIER|
|---|--:|:--|---|---|---|
|0:|APFS Container Scheme|-<br>Physical Store disk0s5|+29.2 GB|disk1|
|1:| APFS Volume|test|9.8 GB|disk1s1|
|2:| APFS Volume|Preboot|20.6 MB|disk1s2|
|3:| APFS Volume|Recovery|519.6 MB|disk1s3|
|4:| APFS Volume|VM|1.1 GB|disk1s4|

查看`apfs`分区表

```bash
diskutil apfs list
```

显示结果：

```
APFS Containers (2 found)
|
+-- Container disk1 90B9C430-E60A-4174-8F1B-B8ED6E486D8B
|   ====================================================
|   APFS Container Reference:     disk1
|   Capacity Ceiling (Size):      29194424320 B (29.2 GB)
|   Capacity In Use By Volumes:   11533049856 B (11.5 GB) (39.5% used)
|   Capacity Available:           17661374464 B (17.7 GB) (60.5% free)
|   |
|   +-< Physical Store disk0s10 CF77604A-0F78-4512-9563-AD2E944353C8
|   |   ------------------------------------------------------------
|   |   APFS Physical Store Disk:   disk0s10
|   |   Size:                       29194424320 B (29.2 GB)
|   |
|   +-> Volume disk1s1 12C9B3A9-0D9B-3E75-B0EF-D829FFE4D438
|   |   ---------------------------------------------------
|   |   APFS Volume Disk (Role):   disk1s1 (No specific role)
|   |   Name:                      test (Case-insensitive)
|   |   Mount Point:               /Volumes/test
|   |   Capacity Consumed:         9848913920 B (9.8 GB)
|   |   Encrypted:                 No
|   |
|   +-> Volume disk1s2 2316B0D9-6798-4564-A3CE-5C5D1124AE5B
|   |   ---------------------------------------------------
|   |   APFS Volume Disk (Role):   disk1s2 (Preboot)
|   |   Name:                      Preboot (Case-insensitive)
|   |   Mount Point:               Not Mounted
|   |   Capacity Consumed:         20631552 B (20.6 MB)
|   |   Encrypted:                 No
|   |
|   +-> Volume disk1s3 1B6EBD7A-EE58-48A7-97A8-4E31C18BE5EC
|   |   ---------------------------------------------------
|   |   APFS Volume Disk (Role):   disk1s3 (Recovery)
|   |   Name:                      Recovery (Case-insensitive)
|   |   Mount Point:               Not Mounted
|   |   Capacity Consumed:         519573504 B (519.6 MB)
|   |   Encrypted:                 No
|   |
|   +-> Volume disk1s4 560E6B74-04B3-4083-8730-A7FB7A0116A2
|       ---------------------------------------------------
|       APFS Volume Disk (Role):   disk1s4 (VM)
|       Name:                      VM (Case-insensitive)
|       Mount Point:               Not Mounted
|       Capacity Consumed:         1073762304 B (1.1 GB)
|       Encrypted:                 No
|
+-- Container disk2 15E113C0-6AC5-4DA5-960C-A29A3C3B418A
    ====================================================
    APFS Container Reference:     disk2
    Capacity Ceiling (Size):      100411764736 B (100.4 GB)
    Capacity In Use By Volumes:   59094196224 B (59.1 GB) (58.9% used)
    Capacity Available:           41317568512 B (41.3 GB) (41.1% free)
    |
    +-< Physical Store disk0s5 987E8152-DD9D-4148-8314-CDA8A28323D5
    |   -----------------------------------------------------------
    |   APFS Physical Store Disk:   disk0s5
    |   Size:                       100411764736 B (100.4 GB)
    |
    +-> Volume disk2s1 931C738D-C5A4-3A43-823A-210C3E9AF123
    |   ---------------------------------------------------
    |   APFS Volume Disk (Role):   disk2s1 (No specific role)
    |   Name:                      MAC (Case-insensitive)
    |   Mount Point:               /
    |   Capacity Consumed:         57355460608 B (57.4 GB)
    |   Encrypted:                 No
    |
    +-> Volume disk2s2 95F73DEF-D85F-4F43-B35F-D8914ED4A95F
    |   ---------------------------------------------------
    |   APFS Volume Disk (Role):   disk2s2 (Preboot)
    |   Name:                      Preboot (Case-insensitive)
    |   Mount Point:               Not Mounted
    |   Capacity Consumed:         20959232 B (21.0 MB)
    |   Encrypted:                 No
    |
    +-> Volume disk2s3 CDF460DC-38FE-4E79-A04C-C7A5242BD091
    |   ---------------------------------------------------
    |   APFS Volume Disk (Role):   disk2s3 (Recovery)
    |   Name:                      Recovery (Case-insensitive)
    |   Mount Point:               Not Mounted
    |   Capacity Consumed:         519573504 B (519.6 MB)
    |   Encrypted:                 No
    |
    +-> Volume disk2s4 25CC995F-FB04-4617-900A-955B423A675F
        ---------------------------------------------------
        APFS Volume Disk (Role):   disk2s4 (VM)
        Name:                      VM (Case-insensitive)
        Mount Point:               /private/var/vm
        Capacity Consumed:         1073762304 B (1.1 GB)
        Encrypted:                 No
```

以我的磁盘为例：我的磁盘中存在两个`APFS`容器，分别是：`Container disk1`和`Container disk2`，disk1对应的是我的test卷，它是我测试用的，我演示下使用`diskutil`命令将`apfs`转换为`hfs+`，并且将转换的`hfs+`分区重新命名为：test
**[提示:]执行该命令之前请保存你的数据，该命令会直接删除之前该分区存在的数据**
## 命令：
```bash
diskutil apfs deleteContainer disk1 test
```
显示结果：

```
Started APFS operation on disk1
Deleting APFS Container with all of its APFS Volumes
Unmounting Volumes
Unmounting Volume "test" on disk1s1
Unmounting Volume "Preboot" on disk1s2
Unmounting Volume "Recovery" on disk1s3
Unmounting Volume "VM" on disk1s4
Deleting Volumes
Deleting Container
Wiping former APFS disks
Switching content types
Reformatting former APFS disks
Initialized /dev/rdisk0s10 as a 27 GB case-insensitive HFS Plus volume with a 8192k journal
Mounting disk
1 new disk created or changed due to APFS operation
Disk from APFS operation: disk0s10
Finished APFS operation on disk1
```

## 检查：
```bash
diskutil list
```
/dev/disk0(internal, physical):

|#:|TYPE|NAME|SIZE|IDENTIFIER|
|---|--:|:--|---|---|---|
|0:|GUID_partition_scheme||512 GB|disk0|
|1:|EFI|EFI|200 MB|disk0s1|
|2:|Apple_HFS|MAC|128 GB|disk0s2|
|...|...|...|...|...|
|8:|Apple_HFS|test|29.1 GB|disk0s10|
可以看到test的分区格式已经变回`hfs+`了。

本教程结束，更多的命令用法请使用命令：`man diskutil`

## 收工

# 如何开启原生SSD Trim功能
```bash
sudo trimforce enable
```
因为是系统原生工具，此方法无需开启rootless=0，更不会改变已有驱动的签名，也就是说不需要kext-dev-mode=1，白果也可用此方法开启Trim。


# 不使用任何程序教你提取显示器的EDID，解决笔记本显示器内屏黑屏/花屏的问题
> 经常有网友需要解决笔记本显示器内屏黑屏问题，尤其新发布的10.13的系统会出现睡眠唤醒后屏幕花屏问题。

目前最简单的方案就是通过clover注入显示器的EDID信息，之前网上的教程都是使用Windows下的应用程序进行操作。
其实显示器的EDID信息都会在显卡正确驱动后存在于ioreg中的。

## 最简单的命令是：

```bash
ioreg -lw0 | grep -i "IODisplayEDID" | sed -e 's/.*<//' -e 's/>//'
```
## 显示信息如下：

` 00ffffffffffff000daee01500000000161a0104952213780228659759548e271e505400000001010101010101010101010101010101b43b804a713834405036680058c11000001ac32f804a713834405036680058c11000001a000000fe0035324b4636803135364843410a000000000000413196011000000a010a202000e8
`
## 接着输入下面的两条命令：
```bash
ioreg -l | grep "DisplayVendorID"  
    "DisplayVendorID" = 3502
    
ioreg -l | grep "DisplayProductID"  
    "DisplayProductID" = 5600
```
其中<>里面的内容就是显示器的EDID信息，将提取出来的EDID信息粘贴到clover的 `config.plist` 中，顺便将 `VendorID` 和 `ProductID` 填入相应的位置，然后保存重启你的电脑。
![EDID注入](http://ous2s14vo.bkt.clouddn.com/EDID注入.png)

# MacOS系统下导出man手册内容
经常使用shell命令的时候需要翻看man查询命令的用法以及参数，想把使用手册导出来查看。比如我想查看10.13系统下 `log show`命令的具体用法，使用以下命令：

```sh
man log | col -b > ~/Desktop/log_manual.txt
```

* 命令中 `col -b`是导出一个纯文本版本格式的手册且显示正常

# 使用log show检查AppleALC和Lilu是否工作正常
(内容暂未添加)
命令格式：
`log show --predicate 'process == "kernel" AND (eventMessage CONTAINS "AppleALC" OR eventMessage CONTAINS "Lilu")' --style syslog --source`

# 一条命令教你如何确认自己的机型及如何开启 `HWP`
> HWP是什么？HWP是Hardware Work Package的简称，翻译过来叫做：硬件标准部件
> 在macOS下,HWP是指Intel SpeedShift，开启全功率的电源管理，更多的解释请参阅[原文](http://www.insanelymac.com/forum/topic/321021-guide-hwpintel-speed-shift-enable-with-full-power-management/)

* 用到的工具： `freqVectorsEdit.sh`
* 用法：
    * 打开终端，复制下面命令：
    
    `cd /tmp && curl -s https://raw.githubusercontent.com/Piker-Alpha/freqVectorsEdit.sh/master/freqVectorsEdit.sh > /tmp/freqVectorsEdit.sh && chmod +x freqVectorsEdit.sh && /tmp/freqVectorsEdit.sh && sudo rm -rf /tmp/freqVectorsEdit.sh && sudo rm -rf /tmp/Mac-*.bin`
    
    * **注意上面的命令为一条，须全部复制**
    * 系统会使用 `curl` 自动下载一个程序，保存到 `/tmp` ,之后自动执行，期间需要你输入自己的用户密码，程序执行完后会自动清除临时文件；
    * 屏幕会输出40个机型，其中亮白加粗为你当时设置的机型，带 `绿色` 显示的那三行前面括号里的机型为可选机型，带 `HWP` 字样的为可以开启 `HWPEnable`
    ![HWP](http://ous2s14vo.bkt.clouddn.com/HWP.png)
    * 输入方括号里面的数字并回车，可以修改相对应的机型，同时开启 `HWP`
    * 本文不讨论开启 `HWP` 的步骤及用法，更多的信息请参阅其它文章
   

## 收工

# ———— 未完待续 ————

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)




