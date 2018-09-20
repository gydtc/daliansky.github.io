---
title: 【黑果小兵】CLOVER v2.4 r4438集成小米笔记本PRO EFI安装说明
date: 2018-04-13 13:10:15
urlname: CLOVER-v2-4-r4438-Integrated-Millet-Notebook-PRO-EFI-Installation-Instructions
tags:
- CLOVER
- 小米PRO
- 教程
categories:
- 教程

---

## 运行`Clover_v2.4k_r4438.pkg`安装程序

下载链接：[Clover_v2.4k_r4438.pkg](https://raw.githubusercontent.com/daliansky/XiaoMi-Pro/master/Clover_v2.4k_r4438.pkg)

> 本安装程序会覆盖你的EFI，所以请事先备份EFI，再执行改名或者删除的操作，安装程序会安装全新的EFI到你的ESP分区（其实Clover会自动在你的macOS系统根目录下创建EFI-Backups并且自动备份）

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/1.png)

点击`继续`

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/2.png)

请先阅读更新内容，然后点击`继续`

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/3.png)

如果是更新安装的情况下是不需要更改安装位置的，由于我是测试安装，所以点击`更改安装位置`

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/4.png)

本例中，我选择的安装位置是`EFI_TEST`，点击`继续`

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/5.png)

勾选`仅安装UEFI开机版本`，勾选`安装Clover到EFI系统区`，勾选附带的三套`开机主题`，点击`Drivers64UEFI`

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/6.png)

勾选`HFSPlus` `apfs` `AptioMemoryFix`

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/7.png)

勾选`安装全部RC scripts到全部可开机的OSX磁区`，点击`安装`

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/8.png)

安装开始，系统会要求输入用户密码，请输入密码，之后点击`安装软件`

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/9.png)

程序会自动将包含小米笔记本PRO的EFI安装到`ESP`分区

![Clover_v2.4k_r4438](http://7.daliansky.net/clover4438/10.png)

安装完成，请点击`关闭`

## 将`config_4-13.plist`重命名为`config.plist`

打开终端，输入命令：

```bash
diskutil mount ESP		# 挂载ESP分区，假如你的ESP分区名称为：ESP
```

如果`ESP`分区没有命名的话，可以使用以下命令：

```bash
diskutil list
```

命令输出信息：

```Xml
/dev/disk4 (disk image):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        +6.0 GB     disk4
   1:                        EFI EFI                     209.7 MB   disk4s1
   2:                  Apple_HFS EFI_TEST                5.7 GB     disk4s2
```

系统显示`disk4s1`为`EFI`分区，使用重命名命令：

```bash
diskutil rename disk4s1 ESP		# 将disk4s1重命名为ESP
diskutil mount ESP				# 挂载ESP分区
```

在本例子中，我使用的是`disk image`，也就是新建了个包含EFI分区的镜像做演示，你的设备名很有可能是`disk0s1`

当然你也可以直接使用应用程序`CLOVER CONFIGURATOR`至于如何重命名这个就不需要我多说了吧。

## EFI下载/更新

https://github.com/daliansky/XiaoMi-Pro

## 教程结束

## 特别鸣谢:

`@Steve` `@风之痕` `@烎⁵⁷` 提供的EFI测试及部分素材

## 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

## QQ群:

247451054 [小米PRO黑苹果高级群](http://shang.qq.com/wpa/qunwpa?idkey=6223ea12a7f7efe58d5972d241000dd59cbd0260db2fdede52836ca220f7f20e)[群已满，请加其它群]
137188006 [小米PRO黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=c17e190b9466a73cf12e8caec36e87124fce9e231a895353ee817e9921fdd74e)
689011732 小米笔记本Pro黑苹果