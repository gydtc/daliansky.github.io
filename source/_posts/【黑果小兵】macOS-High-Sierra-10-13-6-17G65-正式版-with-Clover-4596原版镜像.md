---
title: 【黑果小兵】macOS High Sierra 10.13.6(17G65)正式版 with Clover 4596原版镜像
date: 2018-07-10 19:57:50
urlname: macOS-High-Sierra-10.13.6-17G65-Release-Version-with-Clover-4596-original-mirror
top: 
categories:
- 下载
- 镜像
tags:
- 10.13.6
- 17G65
- High Sierra
- 镜像
- 下载
- dmg

---

# 【黑果小兵】macOS High Sierra 10.13.6(17G65)正式版 with Clover 4596原版镜像

- **重要提示：由于CLOVER新版的缘故，原来的HD3000/HD4000的配置文件不支持新版，会造成进CLOVER后卡住的情况，请降低CLOVER版本，或者直接删除掉所有的HD3000/HD4000开头的配置文件；**

- 本镜像采用官方原版app制作，集成Clover 4596，支持UEFI启动安装;`Drivers64UEFI/`目录下只保留的`AptioMemoryFix.efi`以解决卡+++问题；添加`ApfsDriverLoader-64.efi`，自动加载`apfs.efi`驱动，同时去除日志显示；

- Clover集成了本人修改的全新主题，不喜欢的可以于安装系统后自行替换；![Clover_Main.png](http://7.daliansky.net/10.13.5/Clover_Main.png)

- 所有配置文件中默认去掉`Lilu`的输出信息,[让你看清10.13 内核崩溃(kernel pance)的真相](https://blog.daliansky.net/macOS-10.13-installation-of-common-problems-and-solutions.html);

- 更新`IntelGraphicsFixup` 到V1.2.7，原生支持UHD620/UHD630等八代核显，不需要注入`platform-id`

  ![http://7.daliansky.net/dell/IntelGraphicsFixup.jpg](http://7.daliansky.net/dell/IntelGraphicsFixup.jpg)

- 特别增加笔记本常用屏蔽独立显卡补丁，以解决安装10.13时会卡在`Service only ran for 0 seconds. Pushing respawn out by 10 second`的问题，特别感谢` @宪武 `的搜集整理**[最新的macOS 10.13.4及以后的版本可以不需要屏蔽独显而进行安装使用]**；

- Clover默认配置文件`config.plist`原生支持七代HD620/HD630、八代UHD620/UHD630，`platform-id` 使用自动侦测；

- 添加了`config_ASUS_B360_PRIME_UHD630.plist`，B360主板的可以试用；

- 其它配置文件包括：HD520/530/540，HD550/P530,HD5000/5100/5200/5300/5500/6000,HD4000/4200/4400/4600,HD3000；所有config配置文件都可通过Clover引导界面-Options-configs进行选择；

- 如果无法引导到安装界面，可于Clover主界面-Options-Graphics进行显卡仿冒；

- 本镜像集成的EFI如果无法安装，请根据自己的机型寻找相应的EFI进行替换，请参考：[macOS High Sierra区笔记本安装情况集合帖](http://bbs.pcbeta.com/viewthread-1753483-1-1.html)

- 支持[BCM94352z无线网卡](https://blog.daliansky.net/Broadcom-BCM94352z-DW1560-drive-new-posture.html#more)，支持Realtek8111系列有线网卡，支持Intel板载有线网卡；

- 已更新Lilu(1.2.4)、AppleALC(1.2.8)、IntelGraphicsFixup(1.2.7)、Shiki(2.2.7)等驱动；

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

![Clover_Main.png](http://7.daliansky.net/10.13.6/10.13.6.jpg)
![Clover_Main.png](http://7.daliansky.net/10.13.6/bluetooth.jpg)
![Clover_Main.png](http://7.daliansky.net/10.13.6/igpu.jpg)
![Clover_Main.png](http://7.daliansky.net/10.13.6/bluetooth.jpg)
![Clover_Main.png](http://7.daliansky.net/10.13.6/wifi.jpg)
![Clover_Main.png](http://7.daliansky.net/10.13.6/17G65.jpg)
![Clover_Main.png](http://7.daliansky.net/10.13.5/Clover_10.13.5.png)

# 下载链接

迅雷离线下载：[请点击下载](https://mirrors.dtops.cc/iso/MacOS/daliansky_macos/macOS%20High%20Sierra%2010.13.6%2817G65%29%20Installer%20with%20Clover%204596.dmg) 感谢`@难忘情怀`提供下载资源

http下载链接:[请点击下载](https://mirrors.dtops.cc/iso/MacOS/daliansky_macos/) 感谢`@难忘情怀`提供下载资源

百毒云：[请点击下载](https://pan.baidu.com/s/1Ujfi8X6hBDuQVlSWuulNbw)

MD5 (macOS High Sierra 10.13.6(17G65) Installer with Clover 4596.dmg) = 04ef77a1c6df1ccc4930802cd9aceee0

# 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

