---
title: 【黑果小兵】macOS High Sierra 10.13.4 17E199 正式版 with Clover 4418原版镜像
date: 2018-03-24 10:49:36
urlname: macOS-High-Sierra-10.13.4-17E199-Release-Version-and-Clover-4418-Original-Image
categories:
- 下载
- 镜像
tags:
- 10.13.4
- 17E199
- High Sierra
- 镜像
- 下载
- dmg
---

# 【黑果小兵】macOS High Sierra 10.13.4(17E199)正式版 with Clover 4418原版镜像

> 10.13.4镜像的制作比较坑人，之前所有的制作方法都无法正常安装，详见[解决10.13.4制作镜像出现的安装盘找不到和显卡代码刷屏问题](http://bbs.pcbeta.com/viewthread-1780071-1-1.html)

- 本镜像采用官方原版app制作，集成Clover 4418，支持UEFI启动安装;`Drivers64UEFI/`目录下只保留的`AptioMemoryFix.efi`以解决卡+++问题；

- 所有配置文件中默认去掉`Lilu`的输出信息,[让你看清10.13 内核崩溃(kernel pance)的真相](https://blog.daliansky.net/macOS-10.13-installation-of-common-problems-and-solutions.html);

- 更新`apfs.efi`到`10.13.4`正式版；

- 更新`IntelGraphicsFixup` 到V1.2.7，原生支持UHD620/UHD630等八代核显，不需要注入`platform-id`

  ![http://7.daliansky.net/dell/IntelGraphicsFixup.jpg](http://7.daliansky.net/dell/IntelGraphicsFixup.jpg)

- 特别增加笔记本常用屏蔽独立显卡补丁，以解决安装10.13时会卡在`Service only ran for 0 seconds. Pushing respawn out by 10 second`的问题，特别感谢` @宪武 `的搜集整理**[最新的macOS 10.13.4可以不需要屏蔽独显而进行安装使用]**；

- Clover默认配置文件`config.plist`原生支持七代HD620/HD630、八代UHD620/UHD630，`platform-id` 使用自动侦测；

- config_DalianSky.plist为部分机型增加`Drop Tables`,如果默认的`config.plist`无法进入安装界面,可以试试这个

- 其它配置文件包括：HD520/530/540，HD550/P530,HD5000/5100/5200/5300/5500/6000,HD4000/4200/4400/4600,HD3000；所有config配置文件都可通过Clover引导界面-Options-configs进行选择；

- 如果无法引导到安装界面，可于Clover主界面-Options-Graphics进行显卡仿冒；

- 本镜像集成的EFI如果无法安装，请根据自己的机型寻找相应的EFI进行替换，请参考：[macOS High Sierra区笔记本安装情况集合帖](http://bbs.pcbeta.com/viewthread-1753483-1-1.html)

- 支持[BCM94352z无线网卡](https://blog.daliansky.net/Broadcom-BCM94352z-DW1560-drive-new-posture.html#more)，支持Realtek8111系列有线网卡，支持Intel板载有线网卡；

- 已更新Lilu(1.2.3)、AppleALC(1.2.3)、IntelGraphicsFixup(1.2.7)等驱动；

- 本镜像已经过本人安装测试，若您在使用中遇到问题，可通过爬楼自行解决。本人才疏学浅，所学知识都来自于远景社区，感谢远景各位大咖一直以来对 `黑果小兵` 的大力支持，由于人员众多，恕不一一列名致谢！

- 挂载EFI分区

  Windows操作系统下面,以系统管理员身份打开`cmd`窗口,输入命令:

  ```sh
  c:\>diskpart
  list disk           # 磁盘列表
  select disk n       # 选择EFI分区所在的磁盘，n为磁盘号
  list partition      # 磁盘分区列表
  select partition n  # 选择EFI分区，n为EFI分区号
  set id="C12A7328-F81F-11D2-BA4B-00A0C93EC93B"	# 设置为EFI分区
  assign letter=X     # x为EFI分区盘符
  exit				# 退出diskpart
  notepad				# 打开记事本程序，点击文件->打开，即可访问EFI分区
  ```

  您可以重复输入命令同时挂载USB的EFI分区和磁盘的EFI分区

- 本镜像发布站点：远景论坛/ [黑果小兵的部落阁](https://blog.daliansky.net)

# 截图：

![10.13.4_17E199.jpg](http://7.daliansky.net/10.13.4/10.13.4_17E199.jpg)
![Audio.jpg](http://7.daliansky.net/10.13.4/Audio.jpg)
![BlueTooth.jpg](http://7.daliansky.net/10.13.4/BlueTooth.jpg)
![Displays.jpg](http://7.daliansky.net/10.13.4/Displays.jpg)
![HD620.jpg](http://7.daliansky.net/10.13.4/HD620.jpg)
![HDMI_Audio.jpg](http://7.daliansky.net/10.13.4/HDMI_Audio.jpg)
![KEXTS.jpg](http://7.daliansky.net/10.13.4/KEXTS.jpg)
![PCI_List.jpg](http://7.daliansky.net/10.13.4/PCI_List.jpg)
![SATA.jpg](http://7.daliansky.net/10.13.4/SATA.jpg)
![Storage.jpg](http://7.daliansky.net/10.13.4/Storage.jpg)
![USB.jpg](http://7.daliansky.net/10.13.4/USB.jpg)
![WIFI.jpg](http://7.daliansky.net/10.13.4/WIFI.jpg)

# 下载链接

迅雷离线下载：[请点击下载](https://mirrors.dtops.cc/iso/MacOS/daliansky_macos/macOS%20High%20Sierra%2010.13.4%2817E199%29%20Installer%20with%20Clover%204418.dmg) 感谢`@难忘情怀`提供下载资源

http下载链接:[请点击下载](https://mirrors.dtops.cc/iso/MacOS/daliansky_macos/) 感谢`@难忘情怀`提供下载资源

百毒云下载链接：[请点击下载](https://pan.baidu.com/s/1UbqIbltVRDAAY7zQPIHtrw)

Mega网盘下载链接:[请点击下载](https://mega.nz/#!B5kxmZgb!yP3SDWns61V82WHElF7hJvxvapGjNkhZJmfWCbBBSBk)

> 如果mega无法下载,请进群下载`hosts_mega.txt`

迅雷下载链接:[请点击下载](https://mirrors.dtops.cc/iso/MAC%20OS/黑果小兵/) 感谢`@难忘情怀`提供下载资源

MD5 (macOS High Sierra 10.13.4(17E199) Installer with Clover 4418.dmg) = e1d1fb0f036c35582a016d50035fc1a3

# 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

