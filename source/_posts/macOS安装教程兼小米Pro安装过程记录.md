---
title: macOS安装教程兼小米Pro安装过程记录
date: 2017-11-26 14:43:42
urlname: MacOS-installation-tutorial-XiaoMi-Pro-installation-process-records
tags:
- 安装
- 教程
- 小米
categories:
- 教程
---

> 引言
> 一直以来就想写个`macOS`的安装教程,可惜没有`TransMac`以及`BIOS`设置的截图,正好[小米PRO黑苹果高级群](https://shang.qq.com/wpa/qunwpa?idkey=7b6d1bfaf933337e2e6fa024cb947af43c2752537fb680f18fab001bd87c05e8)的班长@原味菠萝最近一直在写小米Pro安装黑苹果的教程,由于他工作繁忙,一直也没有完稿,我就在他写作的基础上将这篇教程完善.

# Windows下制作macOS安装盘

## 准备工具
* U盘大于8G
* U 盘大小不限做 PE 盘
* TransMac
* 小米PRO专用EFI文件
* 系统镜像

## 在 `Windows` 下安装 `TransMac` 
安装完成后，右键→管理员权限运行 `TransMac`

## 利用 `TransMac` 制作`macOS`安装USB盘
1. 打开`TransMac`,选择欲制作的`USB`盘符
![TransMac1](http://ous2s14vo.bkt.clouddn.com/TransMac1.png)

2. 右键选择`Restore with Disk Image`,选择下载好的dmg文件,会弹出窗口,提示将要格式化USB磁盘,点击OK按钮继续
![TransMac2](http://ous2s14vo.bkt.clouddn.com/TransMac2.png)

3. 在此期间,您可以去给自己泡杯咖啡喝,耐心等待写盘的完成.
![TransMac3](http://ous2s14vo.bkt.clouddn.com/TransMac3.png)

4. 写入完成，系统弹出将其格式化，点击取消
![TransMac4](http://ous2s14vo.bkt.clouddn.com/TransMac4.png)

# macOS下制作USB安装盘
如果您已经有了macOS的使用环境,那么制作用于安装的macOS将会更加方便.

## 准备工具

* 下载好的dmg镜像
* 用于安装macOS的USB盘,容量8GB以上
* 磁盘工具

## 制作过程
> 为便于截屏及加快制作时间,我没有使用USB制作,而是生成一个8GB的镜像做演示
 
1. 打开欲制作的dmg镜像,两种方法:
    * 使用磁盘工具,选择`File`-`Open Disk Image`
    * 直接通过`Finder`双击dmg打开
![DiskUtility](http://ous2s14vo.bkt.clouddn.com/DiskUtility.png)


2. 打开`磁盘工具`,选择`SANDISK 8GB USB`
![DiskUtility2](http://ous2s14vo.bkt.clouddn.com/DiskUtility2.png)

3. 点击`恢复/Restore`按钮,选择`XiaoMiPro 10131`,点击`恢复/Restore`
![DiskUtility3](http://ous2s14vo.bkt.clouddn.com/DiskUtility3.png)
它会开始执行恢复镜像到USB的动作,恢复速度取决于你的USB盘
![DiskUtility4](http://ous2s14vo.bkt.clouddn.com/DiskUtility4.png)

4. 镜像恢复完成后,它会显示如图所示
![DiskUtility5](http://ous2s14vo.bkt.clouddn.com/DiskUtility5.png)
点击`完成/Done`按钮后,会显示完成后的USB磁盘信息
![DiskUtility6](http://ous2s14vo.bkt.clouddn.com/DiskUtility6.png)

安装镜像的制作到这里就完成了,下一步,我们需要将EFI复制进刚制作好的USB磁盘的EFI分区里

## 将镜像里的EFI复制到USB安装盘的EFI分区下
### 显示磁盘分区信息
打开终端,输入命令:`diskutil list`,它会显示类似的信息:

```xml
/dev/disk4 (disk image):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        +8.0 GB     disk4
   1:                        EFI EFI                     209.7 MB   disk4s1
   2:                  Apple_HFS XiaoMiPro 10131         7.7 GB     disk4s2

/dev/disk5 (disk image):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        +7.0 GB     disk5
   1:                        EFI EFI                     209.7 MB   disk5s1
   2:                  Apple_HFS XiaoMiPro 10131         6.7 GB     disk5s2
```

这里显示的`8.0 GB`的磁盘设备为:`disk4`,也就是我们刚才制作的安装磁盘,`EFI`分区的设备为:`disk4s1`;
`7.0 GB`的磁盘设备为:`disk5`,这个是我们刚才打开的磁盘镜像,它包含的`EFI`分区的设备为:`disk5s1`;

### 挂载EFI分区
我们使用`diskutil`命令分别挂载这两个`EFI`分区,命令如下:

```sh
diskutil mount disk4s1  # 挂载USB的EFI分区
Volume EFI on disk4s1 mounted
diskutil mount disk5s1  # 挂载安装镜像的EFI分区
Volume EFI on disk5s1 mounted
open .                  # 在当前位置打开Finder
```

### 复制/替换EFI
将EFI复制进USB的EFI分区下即可,至于你想替换EFI也可以参考此方法操作

# 小米`BIOS`设置
小米笔记本的BIOS默认开启了安全认证,UEFI引导需要关闭安全启动`Secure Boot Mode`方式,否则无法加载UEFI引导设备,比如刚制作好的macOS安装USB盘
## 操作方法:

1. 开机按`F2`进入`BIOS`设置,光标移动到`Security`,点击`Set Supervisor Password`设置一个`BIOS`密码,输入两次相同的密码,点击`YES`保存
![XiaoMi-Bios1](http://ous2s14vo.bkt.clouddn.com/XiaoMi-Bios1.png)
![XiaoMi-Bios2](http://ous2s14vo.bkt.clouddn.com/XiaoMi-Bios2.png)
`Supervisor Password`由`Not Installed`变为`Installed`

2. 关闭安全启动

![XiaoMi-Bios3](http://ous2s14vo.bkt.clouddn.com/XiaoMi-Bios3.png)
点击`Secure Boot Mode`,设置为`Disabled`关闭安全启动
![XiaoMi-Bios4](http://ous2s14vo.bkt.clouddn.com/XiaoMi-Bios4.png)

3. 按`F10`保存设置


# 安装macOS
开机按`F12`键进入`Boot Manager`引导管理,选择`EFI USB Device`,回车
![XiaoMi-Bios5](http://ous2s14vo.bkt.clouddn.com/XiaoMi-Bios5.png)

进入`Clover`主菜单
![bootFormInstaller](http://ous2s14vo.bkt.clouddn.com/bootFormInstaller.png)
移动光标到`Boot OS X Install from Install macOS High Sierra`回车
如果无法进入安装界面,需要打开啰嗦模式进行排错,具体的操作方法请参考[Clover使用教程](https://blog.daliansky.net/clover-user-manual.html)

11-26-2017 19:25更新

未完待续

