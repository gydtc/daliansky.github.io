---
title: 【黑果小兵】macOS High Sierra 10.13.6(17G2112)特别版 with Clover 4606原版镜像
date: 2018-07-18 19:57:50
urlname: macOS-High-Sierra-10.13.6-17G2112-Release-Special-with-Clover-4606-original-mirror
top: 90
categories:
- 下载
- 镜像
tags:
- 10.13.6
- 17G2112
- High Sierra
- 镜像
- 下载
- dmg

---

# 【黑果小兵】macOS High Sierra 10.13.6(17G2112)特别版 with Clover 4606原版镜像

- 随着苹果发布了最新的MacBookPro 15,1/15,2这两款产品，macOS也更新到了10.13.6 17G2112版本，它原生支持第八代核显;**众多的8750H CPU的朋友们可以彻底告别黑屏的痛苦**

- 本镜像采用官方原版app制作，集成Clover 4606，支持UEFI启动安装;`Drivers64UEFI/`目录下只保留的`AptioMemoryFix.efi`以解决卡+++问题；添加`ApfsDriverLoader-64.efi`，自动加载`apfs.efi`驱动，同时去除日志显示；

- Clover集成了本人修改的全新主题，不喜欢的可以于安装系统后自行替换；![Clover_Main.png](http://7.daliansky.net/10.13.5/Clover_Main.png)

- 所有配置文件中默认去掉`Lilu`的输出信息,[让你看清10.13 内核崩溃(kernel pance)的真相](https://blog.daliansky.net/macOS-10.13-installation-of-common-problems-and-solutions.html);

- 更新`WhateverGreen`到V1.2.0，原生支持UHD620/UHD630等八代核显，不需要注入`platform-id`， 同时它也支持NVIDIA和AMD的显卡，以及整合了SHIKI的驱动，现在是三合一了；

  ![http://7.daliansky.net/dell/IntelGraphicsFixup.jpg](http://7.daliansky.net/dell/IntelGraphicsFixup.jpg)

- 特别增加笔记本常用屏蔽独立显卡补丁，以解决安装10.13时会卡在`Service only ran for 0 seconds. Pushing respawn out by 10 second`的问题，特别感谢` @宪武 `的搜集整理**[最新的macOS 10.13.4及以后的版本可以不需要屏蔽独显而进行安装使用]**；

- Clover默认配置文件`config.plist`原生支持七代HD620/HD630、八代UHD620/UHD630，`platform-id` 使用自动侦测；

- **Nvidia显卡驱动方法**：

  - 打开终端，输入命令：

  - ```bash
    bash <(curl -s https://raw.githubusercontent.com/Benjamin-Dobell/nvidia-update/master/nvidia-update.sh)
    ```

- 添加了`config_ASUS_B360_PRIME_UHD630.plist`，B360主板的可以试用；

- 其它配置文件包括：HD520/530/540，HD550/P530,HD5000/5100/5200/5300/5500/6000,HD4200/4400/4600；所有config配置文件都可通过Clover引导界面-Options-configs进行选择；

- 如果无法引导到安装界面，可于Clover主界面-Options-Graphics进行显卡仿冒；

- 本镜像集成的EFI如果无法安装，请根据自己的机型寻找相应的EFI进行替换，请参考：[macOS High Sierra区笔记本安装情况集合帖](http://bbs.pcbeta.com/viewthread-1753483-1-1.html)

- 支持[BCM94352z无线网卡](https://blog.daliansky.net/Broadcom-BCM94352z-DW1560-drive-new-posture.html#more)，支持Realtek8111系列有线网卡，支持Intel板载有线网卡；

- 已更新Lilu(v1.2.5)、AppleALC(v1.3.0)、WhateverGreen(v1.2.0)等驱动；

- 本镜像已经过本人安装测试，若您在使用中遇到问题，可通过爬楼自行解决。本人才疏学浅，所学知识都来自于远景社区，感谢远景各位大咖一直以来对 `黑果小兵` 的大力支持，由于人员众多，恕不一一列名致谢！

- 挂载EFI分区

  Windows操作系统下面,以系统管理员身份打开`cmd`窗口,输入命令:

  ```sh
  c:\>diskpart
  list disk           # 磁盘列表
  select disk n       # 选择EFI分区所在的磁盘，n为磁盘号
  list partition      # 磁盘分区列表
  select partition n  # 选择EFI分区，n为EFI分区号
  set id="ebd0a0a2-b9e5-4433-87c0-68b6b72699c7"	# 设置为基本数据分区
  assign letter=X     # x为EFI分区盘符
  exit				# 退出diskpart
  notepad				# 打开记事本程序，点击文件->打开，即可访问EFI分区
  ```

  您可以重复输入命令同时挂载USB的EFI分区和磁盘的EFI分区

- 本镜像发布站点：远景论坛/ [黑果小兵的部落阁](https://blog.daliansky.net)

# 截图：

![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/17G2112.jpg)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/CNLFB.png)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/IGPU.jpg)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/audio.jpg)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/battery.jpg)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/displays.jpg)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/hidpi.jpg)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/igcfl_igcnl.jpg)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/pci.jpg)
![macOS10.13.6_17G2112](http://7.daliansky.net/10.13.6_17G2112/usb.jpg)

# 下载链接

迅雷离线下载：[请点击下载](https://mirrors.dtops.cc/iso/MacOS/daliansky_macos/macOS%20High%20Sierra%2010.13.6%2817G2112%29%20Installer%20with%20Clover%204606.dmg) 感谢`@难忘情怀`提供下载资源

http下载链接:[请点击下载](https://mirrors.dtops.cc/iso/MacOS/daliansky_macos/) 感谢`@难忘情怀`提供下载资源

百毒云：[请点击下载](https://pan.baidu.com/s/1_dh7nwnDPWtRWLczw5tEoQ)

MD5 (macOS High Sierra 10.13.6(17G2112) Installer with Clover 4606.dmg) = 23c01542c04d67109e3ec76c43973e56

# 17G2208更新

## 苹果承认新MacBook Pro过热降频，于是发布一个新补丁：17G2208更新

前段时间，苹果发布了2018款  **MacBook Pro**  ，其中，搭载英特尔Core i9处理器的顶配版MacBook Pro被众多网友爆出存在过热降频的问题，在运行大型软件时，并不能发挥其全部的性能。 

过热降频是哪儿出了问题？ 

针对新MBP出现的问题，苹果现在已经确定为系统散热的管理软件中的BUG导致，目前，苹果已经推出  **macOS High Sierra 10.13.6**  版本的补充更新补丁，解决现在高配版本的MacBook Pro 上出现的过热降频的问题。 

在今天早些时候，苹果也针对2018款 MacBook Pro出现的发热降频问题给出了答复，在声明中，苹果表示：  **“在大量工作负载下进行了广泛的性能测试之后，我们发现在固件中有个缺失的数字密钥，它会影响热管理系统，并可能在新MacBook Pro的高热负载下降低时钟速度。今天的macOS High Sierra10.13.6补充更新中包含了漏洞修复程序，建议用户进行更新。我们向任何在新系统中体验不到最佳性能的客户道歉。”** 

**哪些机器可以进行升级？ **

在此次更新的macOS High Sierra 10.13.6版本中，适用于2018年新款所有13英寸和15英寸配备  **Touch Bar**  触控条的机型。包括所有搭载Intel 第八代“coffee Lake”架构的Core i5/i7/i9处理器的机型，更新版本号为  **17G2208。**

**在哪儿更新？ **

在上述所涉及到的2018款MacBook Pro机型中，用户现在已经可以通过Mac APP Store 应用商店下载安装更新。

建议`Intel`及`AMD`的用户直接更新，`Nvidia`由于没有新的驱动程序，不建议更新。[下载链接](https://support.apple.com/kb/DL1973?locale=zh_CN)

**更新之后性能有多大提升？** 

苹果宣称，修复这个BUG之后，2018款的MacBook Pro 会达到之前宣传的性能提升的效果，15英寸的MacBook Pro 性能会整体提升  **70%。

# 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

