---
title: 借助VoodooHDA自带的getdump找出有效节点和路径
date: 2017-11-13 10:35:55
urlname: With-VoodooHDA-comes-getdump-find-valid-nodes-and-paths
tags:
- 声卡仿冒
- AppleALC
- VoodooHDA
- getdump
categories:
- 教程
---

# 借助VoodooHDA自带的getdump找出有效节点和路径
声卡驱动了,音量调节的图标也显示正常,就是不发声怎么办
如果您的声卡使用了AppleALC,也注入了正确的ID后不发声怎么办呢?这个问题就出现在有效节点和路径不正确上面.
所谓条条大路通罗马,我们总不能在同一棵树上吊死吧.现在可以请出[VoodooHDA[教程]](https://github.com/daliansky/VoodooHDA-2.9.0-Clover)万能声卡驱动程序[下载链接](https://github.com/daliansky/VoodooHDA-2.9.0-Clover/releases/download/V12/VoodooHDA.2.9.0.Clover-V12.pkg)了,说它万能是不正确的,如果它万能了估计就没`AppleALC`啥事儿了吧.
## VoodooHDA Clover版安装教程

你需要有现成的Clover，它只会安装VoodooHDA和其他必需的组件来正常运行。

### 方法一:通过Clover UEFI/ESP驱动

请点击下载:[VoodooHDA 2.9.0 Clover-V12.dmg](https://github.com/daliansky/VoodooHDA-2.9.0-Clover/releases/download/V12/VoodooHDA.2.9.0.Clover-V12.pkg)
这个安装程序会自动安装到`/ESP/EFI/CLOVER/kexts/`以及下面的目录里10.14/10.13/10.12/10.11/10.10/10.9/10.8/10.7/10.6
安装目录取决于你安装的macOS系统决定.
**这个驱动将通过Clover加载而不需要安装到`/System/Library/Extensions/`,同时它也不会删除系统自带的`AppleHDA.kext`,您甚至无需备份`/Others/AppleALC.kext**`

### 方法二:Clover传统模式

你也可以安装VoodooHDA.kext内核扩展程序到/EFI/Clover/kexts/10.14/10.1310.12/10.11/10.10/10.9/10.8/10.7/10.6 
这个驱动将通过Clover加载.

### 方法三: 经典方法

您也可以选择10.6到10.12的Clasic方法，这将在系统库扩展上安装VoodooHDA.kext + AppleHDADisabler.kext

这将在应用程序上安装VoodooHdaSettingsLoader.app，在Library / PreferencePanes上安装VoodooHDA.prefPane 
在这两种方法中，在`usr/local/bin/getdump`上安装getdump。

注意：对于所有OS X系统，VoodooHDA.prefPane安装在Library / PreferancesPanes中

### 视频教程请点击下方

```
                   ⟱
```

[![Modular Image Creation](https://i95.servimg.com/u/f95/18/50/18/69/video_10.png)



## getdump用法

这里可以借助`VoodooHDA`自带的应用程序:[getdump](https://github.com/daliansky/VoodooHDA-2.9.0-Clover-V10/raw/master/getdump),使用方法:打开终端,输入命令:

```sh
sudo cp ~/Downloads/getdump /usr/local/bin  # 将getdump命令复制到/usr/local/bin目录下
sudo chmod +x /usr/local/bin/getdump    	# 为getdump添加执行权限
getdump > ~/Desktop/voodoo_dump.txt
```

用它可以生成一份`voodoo_dump.txt`的文件,里面会有两段以`DUMPING Playback/Record Paths`开头的文字描述,这里面即包括了有效节点,同时也包括了有效的路径
![path1](http://7.daliansky.net/path1.png)
![path2](http://7.daliansky.net/path2.png)从上面的两张截图中,可以将有效的节点和路径整理出下面的表格:

| 有效节点 | 10进制 | 设备名称        | 路径                            |
| -------- | ------ | --------------- | ------------------------------- |
| 0x14     | 20     | Speaker out     | **20->12->2**                   |
| 0x21     | 33     | HP out          | **33->13->3**                   |
| 0x19     | 25     | Headset Mic in  | **8->35->24** **8->35->29备用** |
| 0x12     | 18     | Internal Mic in | **9->34->18** **9->34->29备用** |

有了这个表格,再结合`configdata`,找出有效的ID,编译`AppleALC`,注入ID并使用声卡驱动.

# 备注
该种方法摘自[使用AppleALC声卡仿冒驱动AppleHDA的正确姿势](https://blog.daliansky.net/Use-AppleALC-sound-card-to-drive-the-correct-posture-of-AppleHDA.html)的部分内容,之所以单独发布就是想让更多的人看到

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

