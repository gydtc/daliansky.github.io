---
title: 使用AppleALC声卡仿冒驱动AppleHDA的正确姿势
date: 2017-11-09 09:23:23
urlname: Use-AppleALC-sound-card-to-drive-the-correct-posture-of-AppleHDA
tags:
- AppleALC
- AppleHDA
- 声卡仿冒
categories:
- 教程
---

# 大纲,写作中
# 前言
经常给网友仿冒声卡驱动, 一直都没有将过程写下来,鉴于每天会有许多人问如何仿冒声卡,就想将过程记录下来,供大家参考学习
# 提取codec
## 通过linux提取codec
### 制作Ubuntu Linux启动U盘:

* 下载Ubuntu Linux镜像,可以选择国内开源镜像站点下载:
[网易](http://mirrors.163.com/ubuntu-releases/) [搜狐](http://mirrors.sohu.com/ubuntu-releases/) [阿里云](https://mirrors.aliyun.com/ubuntu-releases/) 
    * 如果你只是想通过Linux提取codec的话,可以随便下载个旧的版本即可,比如这个[ubuntu 14.04.5LTS](https://mirrors.aliyun.com/ubuntu-releases/14.04/ubuntu-14.04.5-desktop-amd64.iso),如果想作为日后的生产力工具的话,我推荐你下载最新发布的[ubuntu 17.10](https://mirrors.aliyun.com/ubuntu-releases/17.10/ubuntu-17.10-desktop-amd64.iso)
* 制作Ubuntu Linux安装盘 
    * Windows下请使用工具`UltraISO`,方法略
    * macOS下制作过程:
        * 插入U盘,确定设备名,方法为打开磁盘工具,选择U盘,可以看到U盘下面有两个分区:`disk4s1`和`disk4s2`,那么U盘的设备名就是:`disk4`![diskutil_disk4](http://ous2s14vo.bkt.clouddn.com/diskutil_disk4.png)

        * 当然最简单的方法还是直接使用命令查看:`diskutil list`,输出的信息为:
        
        ```sh
 /dev/disk4 (internal, physical):
   #:                  TYPE NAME      SIZE IDENTIFIER
   0:     Apple_partition_scheme   *2.0 GB disk4
   1:        Apple_partition_map    4.1 KB disk4s1
   2:                  Apple_HFS    2.4 MB disk4s2
        ```
        这个`disk4`就是你要操作的设备名,后面我们会用到它
        
        * 卸载U盘,准备写入镜像,输入命令:
        `diskutil umountDisk disk4` # 卸载U盘
        * 使用`dd`命令将下载的Ubuntu Linux镜像恢复到U盘上,操作之前我有必要**提醒各位小白,万一你不小心输入错了设备名,那么你连哭的机会都没有,因为dd是按扇区直接物理写入磁盘,别到时候找不到数据了再悔不当初没有认真看到这段文字**
        
            ```sh
            sudo dd if=/Users/sky/Downloads/ISO/ubuntu-17.10-desktop-amd64.iso of=/dev/disk4 bs=1m
            ```
            命令输入完后,请仔细认真检查下,尤其是`of=/dev/disk4`这里,再三确认后回车执行,输入用户密码后请耐心等待6-7分钟,写盘速度取决于你的U盘,镜像恢复的过程中不会有任何的文字输出,U盘写入成功后会显示下面类似的输出信息:
        
            ```sh
~ % diskutil umountDisk disk4
Unmount of all volumes on disk4 was successful
~ % sudo dd if=/Users/sky/Downloads/ISO/ubuntu-17.10-desktop-amd64.iso of=/dev/disk4 bs=1m
Password:
1431+1 records in
1431+1 records out
1501102080 bytes transferred in 906.101477 secs (1656660 bytes/sec)
            ```
            *我的U盘竟然写了906秒(15分钟),我先找个地方哭会儿去*
            同时系统会弹出一个警告窗口,显示类似的信息:
            ![dd_error](http://ous2s14vo.bkt.clouddn.com/dd_error.png)

            那是因为Linux的分区格式是ext,在macOS系统下无法识别才会报错,但是其实一个支持UEFI引导的Ubuntu Linux 17.10启动U盘已经制作成功了.点击`Ignore`忽略或者`Eject`退出U盘
        * 现在您可以使用这个新制作的Ubuntu Linux安装U盘引导Linux去提取codec
## 提取codec
开机按引导设备快捷键`F12`或者`F8`进入引导设备选单,选择`Ubuntu Linux`所在的USB盘回车
![Boot_select](http://ous2s14vo.bkt.clouddn.com/Boot_select.jpg)
出现Ubuntu Linux的引导界面,选择`Try Ubuntu without installing`,该选项可以在不安装的情况下试用Ubuntu
![Ubuntu_boot](http://ous2s14vo.bkt.clouddn.com/Ubuntu_boot.jpg)
回车后稍候会进入Ubuntu桌面:
![ubuntu1](http://ous2s14vo.bkt.clouddn.com/ubuntu1.png)
按组合键`CTRL+ALT+t`打开终端,输入以下命令:

            ```sh
cd Desktop/ # 进入用户桌面
cp /proc/asound/card0/codec#0 . # 将codec#0复制到当时位置
sudo cp -R /sys/firmware/acpi/tables .  # 将acpi/tables目录复制到当时位置,tables目录包括了全部的DSDT和SSDT
ls -l   # 列表
sudo chown -R ubuntu:ubuntu *   # 将当前目录下所有文件及目录所有人修改为ubuntu
ls -l   # 列表
            ```
显示输出信息如下:
![ubuntu_codec_and_DSDT](http://ous2s14vo.bkt.clouddn.com/ubuntu_codec_and_DSDT.png)
将桌面上的codec#0和tables目录复制到LINUX以外的支持写入的盘符下,Linux下面的工作已经完成,您可以继续试用或者重启/关机.

# 整理有效节点
使用到的工具：`verbit.sh`,[下载链接](https://github.com/daliansky/dell7000/blob/master/hda-tools/verbit.sh)
用法: `verbit.sh codec#0`,它会生成如下显示的信息:

```xml
Verbs from Linux Codec Dump File: codec#0

Codec: Realtek ALC3246   Address: 0   DevID: 283902550 (0x10ec0256)

   Jack   Color  Description                  Node     PinDefault             Original Verbs
--------------------------------------------------------------------------------------------------------
Digital Unknown  Mic at Int N/A              18 0x12   0x90a60170   01271c70 01271d01 01271ea6 01271f90
Unknown Unknown  Line Out at Ext N/A         19 0x13   0x40000000   01371c00 01371d00 01371e00 01371f40
 Analog Unknown  Speaker at Int N/A          20 0x14   0x90170120   01471c20 01471d01 01471e17 01471f90
    1/8   Black  Speaker at Ext Rear         24 0x18   0x411111f0   01871cf0 01871d11 01871e11 01871f41
    1/8   Black  Speaker at Ext Rear         25 0x19   0x411111f0   01971cf0 01971d11 01971e11 01971f41
    1/8   Black  Speaker at Ext Rear         26 0x1a   0x411111f0   01a71cf0 01a71d11 01a71e11 01a71f41
 Speaker at Ext Rear    0x1b 0x1b                        1091637744 01b71cf0 01b71d11     01b71e11 01b71f41  
 Analog    Pink  Modem Hand at Ext N/A       29 0x1d   0x40779a2d   01d71c2d 01d71d9a 01d71e77 01d71f40
    1/8   Black  Speaker at Ext Rear         30 0x1e   0x411111f0   01e71cf0 01e71d11 01e71e11 01e71f41
    1/8   Black  HP Out at Ext Front         33 0x21   0x02211030   02171c30 02171d10 02171e21 02171f02
--------------------------------------------------------------------------------------------------------


   Jack   Color  Description                  Node     PinDefault             Modified Verbs
--------------------------------------------------------------------------------------------------------
Digital Unknown  Mic at Int N/A              18 0x12   0x90a60170   01271c70 01271d00 01271ea6 01271f90
Unknown Unknown  Line Out at Ext N/A         19 0x13   0x40000000   01371c00 01371d00 01371e00 01371f40
 Analog Unknown  Speaker at Int N/A          20 0x14   0x90170120   01471c20 01471d00 01471e17 01471f90
 Analog    Pink  Modem Hand at Ext N/A       29 0x1d   0x40779a2d   01d71c40 01d71d90 01d71e77 01d71f40
    1/8   Black  HP Out at Ext Front         33 0x21   0x02211030   02171c30 02171d10 02171e21 02171f01
--------------------------------------------------------------------------------------------------------

Modified Verbs in One Line: 01271c70 01271d00 01271ea6 01271f90 01371c00 01371d00 01371e00 01371f40 01471c20 01471d00 01471e17 01471f90 01d71c40 01d71d90 01d71e77 01d71f40 02171c30 02171d10 02171e21 02171f01
--------------------------------------------------------------------------------------------------------
```
如果你希望将输出结果保存下来,可以将命令改为:

```sh
verbit.sh codec#0 > ALC256_dump.txt
```
这个ALC256_dump.txt就是上面显示的输出信息,你可以使用其它的文字编辑器打开它.
重要的信息不能漏掉了,后面我们在编译声卡驱动的时候会经常用到它们:

```xml
Codec: Realtek ALC3246   Address: 0   DevID: 283902550 (0x10ec0256)
```
其中的:

| 名称 | 解释 |
|---|---|
|Codec: Realtek ALC3246|是告诉了你的声卡型号是ALC3246(ALC256)|
|Address: 0 | 会告诉你生成configdata的数据的前缀是0,比如上面显示输出信息最后一行的`Modified Verbs in One Line:`后面所有的数据中,每组数据的第一位就是这个 `0` ,如果`Address: 2`,那么每组数据的第一位就是 `2` ,这个后面我们会用到它 |
|DevID: 283902550 (0x10ec0256) | 283902550是0x10ec0256的10进制值,0x10ec 是指vendorID(芯片供应商ID),是REALTEK的设备标识,0256是指型号,去掉前面的0,您的声卡型号就是:ALC256|
    
    
过去的教程会告诉你,通过运行`verbit.sh`整理出来的节点是:

```xml
18 0x12 Mic at Int
20 0x14 Speaker at Int
33 0x21 HP Out at Ext Front
```
至于上面输出信息里显示的0x13 0x1d都是无效的节点.而且它只有三个有效的节点,我的声卡ALC256是用于笔记本,按理说它至少还应该存在另一个Mic Ext的节点,我需要找出它来.看来使用传统的方法已经无法满足我的求知欲了.
既然使用Linux可以提取codec,那么有没有可能 
# *通过Linux找出有效的节点*
呢?
为了测试我的声卡存在第四个节点,我需要找出耳机的Mic输入节点,于是乎重新引导进入Linux,插上耳机,它弹出了这个窗口:
![SelectAudioDevice](http://ous2s14vo.bkt.clouddn.com/SelectAudioDevice.png)
这三个选项的意思是让我选择声音设备,既然我希望找出耳机麦克风的输入,我就选择了中间带有耳麦的图标
进入`Sound Settings`,点击 `Input`,选择`Headset Microphone`,调节`Input volume`,对着耳麦说话,发现有输入电平了,再切换到内置麦克风`Internal Microphone`,也有输入电平,那么至少说明我的声卡功能是完整的,至少在Linux下它工作的很好.
![SoundInputDeviceSelect](http://ous2s14vo.bkt.clouddn.com/SoundInputDeviceSelect.png)
测试结果已经出来了,我想要知道耳麦的有效节点是什么,使用组合键`CTRL+ALT+t`打开终端,输入命令:`dmesg`看看它会有什么变化,结果我就看到了下面的文字:

```sh
[    5.040591] snd_hda_codec_realtek hdaudioC0D0: autoconfig for ALC3246: line_outs=1 (0x14/0x0/0x0/0x0/0x0) type:speaker
[    5.040593] snd_hda_codec_realtek hdaudioC0D0:    speaker_outs=0 (0x0/0x0/0x0/0x0/0x0)
[    5.040595] snd_hda_codec_realtek hdaudioC0D0:    hp_outs=1 (0x21/0x0/0x0/0x0/0x0)
[    5.040595] snd_hda_codec_realtek hdaudioC0D0:    mono: mono_out=0x0
[    5.040596] snd_hda_codec_realtek hdaudioC0D0:    inputs:
[    5.040598] snd_hda_codec_realtek hdaudioC0D0:      Headset Mic=0x19
[    5.040599] snd_hda_codec_realtek hdaudioC0D0:      Headphone Mic=0x1a
[    5.040600] snd_hda_codec_realtek hdaudioC0D0:      Internal Mic=0x12
```
我不想看到其它的输出信息,我只需要得到我想要的信息,于是将命令改为:

```bash
sky@sky-Inspiron-7560:~$ dmesg | grep snd_hda_codec_realtek
[    5.040591] snd_hda_codec_realtek hdaudioC0D0: autoconfig for ALC3246: line_outs=1 (0x14/0x0/0x0/0x0/0x0) type:speaker
[    5.040593] snd_hda_codec_realtek hdaudioC0D0:    speaker_outs=0 (0x0/0x0/0x0/0x0/0x0)
[    5.040595] snd_hda_codec_realtek hdaudioC0D0:    hp_outs=1 (0x21/0x0/0x0/0x0/0x0)
[    5.040595] snd_hda_codec_realtek hdaudioC0D0:    mono: mono_out=0x0
[    5.040596] snd_hda_codec_realtek hdaudioC0D0:    inputs:
[    5.040598] snd_hda_codec_realtek hdaudioC0D0:      Headset Mic=0x19
[    5.040599] snd_hda_codec_realtek hdaudioC0D0:      Headphone Mic=0x1a
[    5.040600] snd_hda_codec_realtek hdaudioC0D0:      Internal Mic=0x12
```
得到的输出结果跟上面的相同,于是我发现了在Linux下我的声卡的有效节点分别为:

* 0x14 Speaker out
* 0x21 HP out 
* 0x19 Headset Mic in
* 0x1a Headphone Mic in
* 0x12 Internal Mic in

暂且不讨论我的声卡是几节点,我发现通过linux完全可以得出声卡的有效节点,而且这种方式好像也不需要使用什么专用的工具,只是在linux下面通过内部命令`dmesg`无意中就被我发现了声卡中最挠头的找有效节点的打怪秘籍,这种方法在整个Hackintosh社区里还没见有人用过.看来这跟我之前使用linux经常会通过`dmesg`排错的使用习惯是分不开的,这里要由衷地给自己点一个大大的
# 赞
# 赞
# 赞

在这个特别的日子里`11.11`,没有陪女朋友的小伙伴们,都可以使用我刚get到的新技能愉快地打怪升级啦!

暂更于此,做个记号 2017年11月11日

-------
继续更新

先将节点整理成一个表格,这个表格里会包括之前整理出的数据

|有效节点|10进制|设备名称|
|---|---|---|
| 0x14 | 20 | Speaker out
| 0x21 | 21 | HP out 
| 0x19 | 25 | Headset Mic in
| 0x1a | 26 | Headphone Mic in
| 0x12 | 18 | Internal Mic in

之所以加上转换后的10进制,就是为了以后制作pathmap做准备

# 整理有效路径
使用codecgraph生成pathmap图
命令如下:

```sh
$ codecgraph codec\#0
Codec: Realtek ALC3246
Generating codec#0.svg
```
如果出现`error: dot executable not found (did you install graphviz?)`的错误提示的话,那么还需要执行下面的动作,打开终端,输入命令:

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" # 安装brew
```
安装`brew`的过程中会提醒你安装`Xcode Command Tools`,请选择`yes`.
安装完`brew`之后,继续执行:

```sh
brew install graphviz   # 安装codecgraph所需要的依赖程序
```

这个生成的codec#0.svg就是声卡的pathmap,使用`Sketch.app`打开它
![codec](http://ous2s14vo.bkt.clouddn.com/codec.png)
是不是看了头老大?没错,我刚开始看的时候也是一头的雾水,看多了后就会总结出经验来
还记得我们在前面整理出的有效节点吧?!
还是以我的声卡为例,上文中我已经整理出5个节点,按照顺序来:
    0x14,这个是Speaker的节点,也就是喇叭,我们也俗称为外放,如果想让它正确地发声,就需要看看跟它连接的节点都有哪些,在图片里找到0x14位于图片的最下方,我把它放大下:
    ![node_output](http://ous2s14vo.bkt.clouddn.com/node_output.png)
通过观察我们会发现,0x14与0x02连接,转换成10进制就是20->2,同样的,0x21与0x03连接,转换成10进制就是33->3,我们把它放到表格中

|有效节点|10进制|设备名称|路径|
|---|---|---|---|
| 0x14 | 20 | Speaker out|**20->2**|
| 0x21 | 33 | HP out |**33->3**|
| 0x19 | 25 | Headset Mic in|
| 0x1a | 26 | Headphone Mic in|
| 0x12 | 18 | Internal Mic in|
怎么样?也没想像的那么复杂吧?两个输出设备的节点和路径已经整理出来,下一步,我们要把输入设备和节点整理出来
![node_input](http://ous2s14vo.bkt.clouddn.com/node_input.png)
再来看图片的上半部,最右侧的0x08和0x09是两个声音输入的节点,0x23和0x22是两个混音设备,最前方是设备节点,这个就是输入设备的路径.
我的声卡的0x12声音输入路径包括了3个节点;为了便于理解,被我圈起来的红线部分就是0x12(Mic in)的路径(pathmap),8->35->18就是路径,照样还是要将数据放到表格里
![node12_pathmap](http://ous2s14vo.bkt.clouddn.com/node12_pathmap.png)

|有效节点|10进制|设备名称|路径|
|---|---|---|---|
| 0x14 | 20 | Speaker out|**20->2**
| 0x21 | 33 | HP out |**33->3**|
| 0x19 | 25 | Headset Mic in||
| 0x1a | 26 | Headphone Mic in||
| 0x12 | 18 | Internal Mic in|**8->35->18**|
还记得文章前面通过linux找出来的有效节点不?我的耳麦可是支持输入的,节点也找出来了,是0x19(Headset Mic in),我需要将路径找出来,我发现0x19同时连接了两个节点:0x23和0x22,相应地路径为:8->35->25和9->34->25,顺手也把0x1a的路径也整理出来备用,将这两组数据补充进表格里

|有效节点|10进制|设备名称|路径|
|---|---|---|---|
| 0x14 | 20 | Speaker out|**20->2**
| 0x21 | 33 | HP out |**33->3**|
| 0x19 | 25 | Headset Mic in|**8->35->25** **9->34->25**|
| 0x1a | 26 | Headphone Mic in|**8->35->26** **9->34->26**|
| 0x12 | 18 | Internal Mic in|**8->35->18**|

至于0x1a是否有效暂且放到一边,一个包括了有效节点/设备名称/路径的表格就整理完成了,这里***需要强调的一点是:路径数值使用10进制***


# 整理configdata兼治去除底噪

# 找出适合你的id
|设备名称|有效节点|路径|
|---|---|---|
| HP Out      | 0x16  |  0x22->0x16 |
| Speaker Out | 0x17  |  0x23->0x17 |
| Mic In      | 0x1a  |  0x26<-0x19  0x26<-0x20 |
| Line In     | 0x19  |  0x25<-0x20  0x26<-0x19 |
# 编译AppleALC
使用xcode
通过lilu联合编译
# 注入id
# 测试
# 其它问题
耳机切换
睡眠唤醒
## 声卡驱动了,音量调节的图标也显示正常,就是不发声怎么办
如果您的声卡使用了AppleALC,也注入了正确的ID后不发声怎么办呢?这个问题就出现在有效节点和路径不正确上面.
所谓条条大路通罗马,我们总不能在同一棵树上吊死吧.现在可以请出[VoodooHDA](https://github.com/daliansky/VoodooHDA-2.9.0-Clover-V10)万能声卡驱动程序了,说它万能是不正确的,如果它万能了估计就没`AppleALC`啥事儿了吧.这里可以借助`VoodooHDA`自带的应用程序:[getdump](https://github.com/daliansky/VoodooHDA-2.9.0-Clover-V10/raw/master/getdump),使用方法:打开终端,输入命令:

```sh
getdump > ~/Desktop/voodoo_dump.txt
```
用它可以生成一份`voodoo_dump.txt`的文件,里面会有两段以`DUMPING Playback/Record Paths`开头的文字描述,这里面即包括了有效节点,同时也包括了有效的路径
![path1](http://ous2s14vo.bkt.clouddn.com/path1.png)
![path2](http://ous2s14vo.bkt.clouddn.com/path2.png)
从上面的两张截图中,可以将有效的节点和路径整理出下面的表格:

|有效节点|10进制|设备名称|路径|
|---|---|---|---|
| 0x14 | 20 | Speaker out|**20->12->2**
| 0x21 | 33 | HP out |**33->13->3**|
| 0x19 | 25 | Headset Mic in|**8->35->24** **8->35->29备用**|
| 0x12 | 18 | Internal Mic in|**9->34->18** **9->34->29备用**|
有了这个表格,再结合`configdata`,找出有效的ID,编译`AppleALC`,注入ID并使用声卡驱动.

# HDA工具下载及使用
制作声卡仿冒需要用到的工具,我已经同步到仓库,您可以打包下载也可以通过git同步到本地

* 下载链接:[https://github.com/daliansky/dell7000/tree/master/hda-tools](https://github.com/daliansky/dell7000/tree/master/hda-tools)
* 如何安装
    * 将`hda-tools`目录下的所有文件复制到`/usr/local/bin`下,如果`/usr/local/bin`目录不存在,需要新建立,命令如下:
    
    ```sh
sudo mkdir /usr/local/bin   # 建立/usr/local/bin子目录
sudo cp ~/Downloads/hda-tools/* /usr/local/bin  # 将hda-tools目录下所有的应用程序复制到/usr/local/bin目录下
```
* 如何使用
    * 打开终端,输入命令,直接执行.例如:

    ```sh 
    verbit.sh codec#0 > codec_dump.txt    # 有效节点格式化
    codecgraph codec#0    # 自动生成pathmap图,文件位于codec#0相同目录下
    hda-verb 0x19 0x707 0x20    # 耳机睡眠唤醒无声修正
    widget_dump.sh  # 读取SET_PIN_WIDGET_CONTROL数值 
    ```
    
# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)

