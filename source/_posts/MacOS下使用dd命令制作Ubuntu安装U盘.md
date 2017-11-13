---
title: MacOS下使用dd命令制作Ubuntu安装USB盘
date: 2017-11-10 11:11:27
urlname: MacOS-use-the-dd-command-to-make-Ubuntu-install-USB-disk
tags:
- Ubuntu
- Linux
- dd
- diskutil
- USB
categories:
- 教程
---

# MacOS下使用DD命令制作Ubuntu Linux启动USB盘:

* 下载Ubuntu Linux镜像,可以选择国内开源镜像站点下载:
[网易](http://mirrors.163.com/ubuntu-releases/) [搜狐](http://mirrors.sohu.com/ubuntu-releases/) [阿里云](https://mirrors.aliyun.com/ubuntu-releases/) 
    * 如果你只是想通过Linux提取codec的话,可以随便下载个旧的版本即可,比如这个[ubuntu 14.04.5LTS](https://mirrors.aliyun.com/ubuntu-releases/14.04/ubuntu-14.04.5-desktop-amd64.iso),如果想做为日后的生产力工具的话,我推荐你下载最新发布的[ubuntu 17.10](https://mirrors.aliyun.com/ubuntu-releases/17.10/ubuntu-17.10-desktop-amd64.iso)
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
            同时系统会弹出一个错误的窗口,显示类似的信息:
            ![dd_error](http://ous2s14vo.bkt.clouddn.com/dd_error.png)

            那是因为Linux的分区格式是ext,在macOS系统下无法识别才会报错,但是其实一个支持UEFI引导的Ubuntu Linux 17.10启动U盘已经制作成功了.点击`Ignore`忽略或者`Eject`退出U盘
        * 现在您可以使用这个新制作的Ubuntu Linux安装U盘引导Linux快乐地玩耍啦

## 收工喽

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)

