---
title: MacOS系统下使用gpt命令修复损坏的EFI分区以及dd命令的基本用法
urlname: Use-the-gpt-command-to-repair-a-damaged-EFI-partition-under-Mac-OS-As-well-as-the-basic-usage-of-the-dd-command
date: 2017-10-07 22:39:16
tags:
- gpt
- MacOS
- EFI
- Fix
- 修复
categories:
- 教程
---

> 今天在远景论坛里看到有坛友将EFI的分区损坏，于是就跟帖回复，现将回复的内容整理下放到博客上，让更多遇到问题的人看到。

## 命令及用法
### 显示gpt分区
命令如下：

```sh
sudo gpt -r show disk0
    
       start        size  index  contents
           0           1         PMBR
           1           1         Pri GPT header
           2          32         Pri GPT table
          34        2014         
        2048      614400      1  GPT part - C12A7328-F81F-11D2-BA4B-00A0C93EC93B
      616448      409600      2  GPT part - E3C9E316-0B5C-4DB8-817D-F92DF00215AE
     1026048   157696000      3  GPT part - EBD0A0A2-B9E5-4433-87C0-68B6B72699C7
   158722048    32000000      4  GPT part - 48465300-0000-11AA-AA11-00306543ECAC
   190722048      262144         
   190984192   196116728      5  GPT part - 7C3457EF-0000-11AA-AA11-00306543ECAC
   387100920   400937448      6  GPT part - 48465300-0000-11AA-AA11-00306543ECAC
   788038368      262144         
   788300512     1280000      7  GPT part - 5361644D-6163-11AA-AA11-00306543ECAC
   789580512   129175576      8  GPT part - 48465300-0000-11AA-AA11-00306543ECAC
   918756088     1269536      9  GPT part - 426F6F74-0000-11AA-AA11-00306543ECAC
   920025624    19594968     10  GPT part - EBD0A0A2-B9E5-4433-87C0-68B6B72699C7
   939620592    59325048     11  GPT part - 48465300-0000-11AA-AA11-00306543ECAC
   998945640     1269536     12  GPT part - 426F6F74-0000-11AA-AA11-00306543ECAC
  1000215176           7         
  1000215183          32         Sec GPT table
  1000215215           1         Sec GPT header
```

其中：

* `C12A7328-F81F-11D2-BA4B-00A0C93EC93B` 是EFI系统分区(ESP)的标志
* `index` 是指磁盘分区，这里的数值是 `1` ，也就是说是设备 `disk0` 的第一个分区
* `start` 是指开始的扇区，这里的数值是: `2048`
* `size`  是指扇区的偏移量，这里的数值是: `614400`

### 删除“坏”的EFI分区，请先阅读下面的警告信息，再运行以下命令：
* **确保你知道你在做什么，然后再从这里开始 - 如果你搞砸，你可能会丢失数据。**
* 您无法使用 `gpt` 编辑分区表，而驱动器上的分区已装入，因此您需要从另一个驱动器（例如，使用OSX安装程序的USB记忆棒）引导，或者以目标磁盘模式运行mac并从另一个mac进行分区操作。 
* 您可能需要使用 `diskutil unmountDisk disk0` 卸载任何自动安装的卷，然后再继续执行下面的操作。

```sh
sudo gpt remove -i 1 disk0
```

* **确保disk0真的是要更改的磁盘 - 数字可以在重新启动之间更改。**
*  而且，只有在EFI系统分区(ESP)已经存在的情况下才能运行，如果没有，则删除分区1可能是灾难性的！ 在这种情况下，您需要移动索引，因为我认为ESP必须具有索引 `1`

### 重新添加分区与正确的布局和类型：

```sh
sudo gpt add -b 2048 -i 1 -s 614400 -t C12A7328-F81F-11D2-BA4B-00A0C93EC93B disk3
```
执行完这三条命令，您的EFI系统分区(ESP)也就恢复正常了。

## 写在最后
其实在做修复之前，也可以使用 `dd` 命令将EFI分区做个备份，尤其是准备在同一块磁盘里面安装Windows和MacOS的同学，更应该先做个EFI分区的备份，以便EFI被 *玩坏* 后可以恢复如初。

### EFI分区备份到文件，命令如下：

```sh
sudo dd if=/dev/rdisk0s1 of=~/Desktop/ESP.img   # 将EFI分区备份到用户目录-桌面，文件名为：ESP.img
```

### 从备份文件恢复到ESP分区，命令如下：

```sh
sudo dd if=~/Desktop/ESP.img of=/dev/rdisk0s1   # 将备份文件ESP.img恢复到EFI分区
```

## QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)

