---
title: 不需要制作安装盘！教你在MacOS系统下安装High Sierra系统到另一个分区
urlname: Do-not-need-to-make-installation-disk-Teach-you-to-install-the-High-Sierra-system-on-another-MacOS-system-to-another-partition
date: 2017-08-16 22:11:02
updated: 2017-08-28 11:08:02
categories:
- 教程
tags:
- 安装
- High Sierra
---
### 不需要制作安装盘！教你在MacOS系统下安装High Sierra系统到另一个分区
#### *此方法不支持APFS分区*。 只有HFS分区才能通过此安装High Sierra。 而且，您还需要一个GUID分区表来安装它。

> 我无法通过我的安装USB启动macOS High Sierra安装程序。 尝试了很多方法，但没有一个实际上使其启动，所以我发现一种新的方式通过我现在使用的实际引导的macOS在HFS日志分区上安装macOS High Sierra成功。 
> 通过这种方式，您不需要创建可引导的U盘，甚至不需要重新启动。 

#### 开始
1. 通过App Store下载macOS High Sierra Developer Beta / Public Beta安装程序。
2. 在要使用磁盘实用程序安装测试版的驱动器上创建HFS日志分区（名称不能包含空格）。
3. 打开应用程序目录，右键单击macOS Beta安装程序，然后单击显示包内容。 转到`Contents>Shared Support`，然后双击`InstallESD.dmg`和`BaseSystem.dmg`挂载它们。
4. 打开安装的`InstallESD.dmg`，打开Packages文件夹，然后打开`OSInstall.mpkg`文件。 这将打开macOS安装程序。 是的，现在您可以从启动的MacOS系统桌面安装High Sierra Beta。 选择您创建的分区以安装它[备注：如果无法安装请执行：`diskutil umount HighSierra` `diskutil mount HighSierra` `HighSierra`是指卷名]；安装完成后，按照步骤5。
5. 打开已安装的`BaseSystem.dmg`并将boot.efi从/System/Library/CoreServices复制到同一位置的High Sierra分区（`/System/Library/CoreServices`）
6. 虽然安装了HS测试版，但它尚不可启动。 要使其可引导，请打开`终端`并键入以下命令：`[假设安装分区为：HighSierra]`


##### 命令1：
```bash
sudo bless --folder "/Volumes/HighSierra/System/Library/CoreServices"
```
##### 命令2：
```bash
sudo bless --mount "/Volumes/HighSierra" --setBoot
```
##### 命令3：检查分区是否可引导。 为此，键入以下命令：

```bash
bless --info /Volumes/HighSierra
```
##### 输出类似结果：

`
Siddharths-MacBook-Pro:~ siddharth$ bless --info /Volumes/HighSierra
finderinfo[0]: 564434 => Blessed System Folder is /Volumes/HighSierra/System/Library/CoreServices
finderinfo[1]: 838066 => Blessed System File is /Volumes/HighSierra/System/Library/CoreServices/boot.efi
finderinfo[2]:      0 => Open-folder linked list empty
finderinfo[3]:      0 => No alternate OS blessed file/folder
finderinfo[4]:      0 => Unused field unset
finderinfo[5]: 564434 => OS X blessed folder is /Volumes/HighSierra/System/Library/CoreServices
64-bit VSDB volume id:  0x9E0F1563A37473E4
`

##### 收工

#### QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)





