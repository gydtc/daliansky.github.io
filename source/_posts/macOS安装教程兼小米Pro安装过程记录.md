---
title: macOS安装教程兼小米Pro安装过程记录
date: 2017-11-26 06:43:42
urlname: MacOS-installation-tutorial-XiaoMi-Pro-installation-process-records
top: 100
tags:
- macOS
- 安装
- 教程
- 小米Pro
- XiaoMi-Pro
- XiaoMiPro
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

# 小米BIOS设置

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

   ​
# 安装macOS

开机按`F12`键进入`Boot Manager`引导管理,选择`EFI USB Device`,回车![XiaoMi-Bios5](http://ous2s14vo.bkt.clouddn.com/XiaoMi-Bios5.png)

进入`Clover`主菜单
![XiaoMiCloverboot](http://ous2s14vo.bkt.clouddn.com/XiaoMiCloverboot.png)


移动光标到`Boot OS X Install from XiaoMiPro 10131`回车
如果无法进入安装界面,需要打开啰嗦模式进行排错,具体的操作方法请参考[Clover使用教程](https://blog.daliansky.net/clover-user-manual.html)

11-26-2017 19:25更新

未完待续



## 安装第一阶段

###  开始引导macOS系统

![ParallelsPicture](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture.png)

这个过程需要1-2分钟,耐心等待进入安装程序,出现语言选择界面

### 语言选择

选择简体中文
![ParallelsPicture1](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture1.png)

出现`macOS实用工具`界面,选择磁盘工具

### 磁盘工具

![ParallelsPicture0](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture0.png)
选择`显示所有设备`:
![ParallelsPicture2](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture2.png)
选择`SSD Media`,点击`抹掉`按钮,选择默认的`Mac OS扩展(日志型)`,将名称修改为`Macintosh HD`,点击`抹掉`按钮

 ***假设您的磁盘是空的且数据是已经备份过的,别怪我没提醒你!!!***

![ParallelsPicture6](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture6.png)
抹盘成功后,它会自动生成一个200MB的EFI分区,这样做的好处是不会出现安装过程中的由于EFI分区尺寸小于200MB而引起的无法安装的错误.当然前提是你的磁盘中没有重要的数据,或者您的数据已经提前备份过了.
![ParallelsPicture7](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture7.png)
到这里,磁盘工具的动作就已经结束了.退出磁盘工具进入安装界面,进行系统的安装了.



### 安装macOS



![ParallelsPicture8](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture8.png)
进入安装界面
![ParallelsPicture11](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture11.png)
选择继续
![ParallelsPicture12](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture12.png)
![ParallelsPicture13](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture13.png)
点击同意,选择`Macintosh HD`
![ParallelsPicture 14](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture 14.png)
选择安装
![ParallelsPicture 15](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture 15.png)
期间,它会把USB安装盘上的安装文件预复制到要安装的系统分区里,这个过程在小米Pro的笔记本上它跑得飞快,数据复制完后,它会自动重启
![ParallelsPicture16](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture16.png)
然后进行第二阶段的安装

## 安装第二阶段

第二阶段的安装会有两种界面,一种是不进安装界面直接安装,另一种是先进入安装界面直接安装,需要注意的是,无论是哪一种界面下,安装的过程中全程是禁用鼠标和键盘的,需要你做的只是耐心等待它安装完成

![ParallelsPicture 17](http://ous2s14vo.bkt.clouddn.com/ParallelsPicture 17.png)

安装速度取决于你的磁盘速度,第二阶段的安装已经与USB安装盘没什么关系了.macOS 10.13的安装完全区别于10.12,它不能免二次安装,甚至还需要重启多次,这些都是正常现象,请不要大惊小怪的.
系统安装完成后,重启进入系统设置向导

## 设置向导

### 国家选择

![Installer3](http://ous2s14vo.bkt.clouddn.com/Installer3.png)
首先让你选择国家,这里我选择中国
![Installer4](http://ous2s14vo.bkt.clouddn.com/Installer4.png)
点击`继续`,设置键盘

### 设置键盘

![Installer5](http://ous2s14vo.bkt.clouddn.com/Installer5.png)
这里询问你`是否传输信息到这台Mac`

### 数据恢复

可以从Mac或者Time Machine备份恢复

![Installer6](http://ous2s14vo.bkt.clouddn.com/Installer6.png)
我选择`现在不传输任何信息`,点击`继续`

### Apple ID登录

![Installer7](http://ous2s14vo.bkt.clouddn.com/Installer7.png)
选择是否`使用您的Apple ID登录`,如何想现在就登录到`Apple ID`,请输入`Apple ID`和密码登录,否则选择`不登录`,进入系统后也可以设置登录到`iCloud`,点击`继续`
![Installer8](http://ous2s14vo.bkt.clouddn.com/Installer8.png)
阅读条款与条件,选择`同意`继续
![Installer9](http://ous2s14vo.bkt.clouddn.com/Installer9.png)
出现`创建电脑用户`的窗口,输入用户名和密码,点击`继续`

### 创建电脑用户

![Installer10](http://ous2s14vo.bkt.clouddn.com/Installer10.png)
系统会创建初始用户
![Installer11](http://ous2s14vo.bkt.clouddn.com/Installer11.png)
用户创建成功后,弹出`iCloud`的`正在设置用户`的窗口
![Installer12](http://ous2s14vo.bkt.clouddn.com/Installer12.png)
紧接着弹出设置`iClound钥匙串`的设置窗口,选择`稍候设置`,点击`继续`

### 设置iCloud钥匙串

![Installer13](http://ous2s14vo.bkt.clouddn.com/Installer13.png)
出现`快捷设置`,点击`继续`

### 快捷设置

自定义设置定位以及数据反馈,请根据自己的喜好进行设置

![Installer14](http://ous2s14vo.bkt.clouddn.com/Installer14.png)
出现`iCloud中的所有文件`,如果你需要`将文稿和桌面上的文件储存在 iCloud Drive中`,请勾选,否则取消勾选,点击继续

### iCloud文件同步设置

![Installer16](http://ous2s14vo.bkt.clouddn.com/Installer16.png)
出现`FileVault磁盘加密`,如果你需要`打开 Filevault 磁盘加密`,请勾选,否则取消勾选,点击继续

### FileVault磁盘加密设置

![Installer17](http://ous2s14vo.bkt.clouddn.com/Installer17.png)
出现`正在设置您的Mac`,请稍候完成设置向导

### 设置向导完成

![Installer18](http://ous2s14vo.bkt.clouddn.com/Installer18.png)
出现桌面后,整个的安装向导就完成了.
![Installer19](http://ous2s14vo.bkt.clouddn.com/Installer19.png)

更新于 11-27-2017 21:15
未完待续

# 安装后的系统设置

系统安装后,你可以先喝杯咖啡兴奋会儿,马上还有更艰巨的任务在等着你呢
## 教你将U盘上的EFI复制到磁盘的EFI分区,脱离USB运行[macOS篇]

> 新的系统安装成功后，EFI还位于U盘里，总不能一直挂着U盘使用系统吧。这个时候如果你想将U盘里的EFI复制到磁盘的EFI分区里，却苦于找不到看不见EFI分区，这个时候是该让`diskutil`登场了。

`diskutil`命令的基本用法：

### 查看磁盘分区表

```bash
diskutil list
```
/dev/disk0(internal, physical):

| #:   |                  TYPE | NAME  | SIZE     | IDENTIFIER |
| ---- | --------------------: | ----- | -------- | ---------- |
| 0:   | GUID_partition_scheme |       | 256 GB   | disk0      |
| 1:   |                   EFI | EFI   | 200 MB   | disk0s1    |
| 2:   |             Apple_HFS | MAC   | 128 GB   | disk0s2    |
| 3:   |  Microsoft Basic Data | WIN10 | 127.7 GB | disk0s3    |

/dev/disk1(internal, physical):

| #:   |                  TYPE | NAME                 | SIZE    | IDENTIFIER |
| ---- | --------------------: | -------------------- | ------- | ---------- |
| 0:   | GUID_partition_scheme |                      | 16 GB   | disk1      |
| 1:   |                   EFI | EFI                  | 200 MB  | disk1s1    |
| 2:   |             Apple_HFS | Install macOS Sierra | 15.8 GB | disk1s2    |

### 挂载磁盘EFI分区
```bash
diskutil mount disk0s1
```
### 挂载U盘EFI分区

```bash
diskutil mount disk1s1
```
 打开Finder，注意后面有个`.`

```bash
open .
```
左侧会显示挂载了两个EFI分区，将U盘EFI目录全部复制到磁盘的EFI分区即可。


### 合并EFI分区
**这里有一点需要注意**:*如果之前安装过Windows系统的话,会存在EFI的目录,只是EFI的目录下面只有BOOT和Microsoft这两个目录,如果希望添加macOS的Clover引导的话,可以将USB的EFI分区里面的EFI目录下面的CLOVER复制到磁盘里的EFI目录下,也就是执行的是***合并***的操作,让EFI同时支持WINDOWS和macOS的引导.千万不要全部复制,否则有可能造成EFI无法启动Windows.*

### 复制EFI分区
如果磁盘上的EFI分区里为空的,可以直接将USB的EFI分区下面的EFI目录直接复制到磁盘上的EFI分区里.

## 教你将U盘上的EFI复制到磁盘的EFI分区,脱离USB运行[Windows篇]
### 挂载EFI分区
Windows操作系统下面,打开`cmd`窗口,输入命令:

```sh
diskpart
list disk           # 磁盘列表
select disk n       # 选择EFI分区所在的磁盘，n为磁盘号
list partition      # 磁盘分区列表
select partition n  # 选择EFI分区，n为EFI分区号
assign letter=X     # x为EFI分区盘符
```
您可以重复输入命令同时挂载USB的EFI分区和磁盘的EFI分区
打开资源管理器，会出现一个盘符为X的磁盘，格式化为fat32格式,将USB的EFI分区下面的EFI目录复制到安装磁盘的EFI分区下

### 合并EFI分区
**这里有一点需要注意**:*如果之前安装过Windows系统的话,会存在EFI的目录,只是EFI的目录下面只有BOOT和Microsoft这两个目录,如果希望添加macOS的Clover引导的话,可以将USB的EFI分区里面的EFI目录下面的CLOVER复制到磁盘里的EFI目录下,也就是执行的是***合并***的操作,让EFI同时支持WINDOWS和macOS的引导.千万不要全部复制,否则有可能造成EFI无法启动Windows.*

### 复制EFI分区
如果磁盘上的EFI分区里为空的,可以直接将USB的EFI分区下面的EFI目录直接复制到磁盘上的EFI分区里.

## 添加UEFI引导选项
使用工具:BOOTICE
### 操作过程:
1. 打开BOOTICE软件,选择`物理磁盘`,选择欲操作的目标磁盘,点击`分区管理`,弹出分区管理的窗口,点击`分配盘符`,为`ESP`分区分配一个盘符,点击确定
  ![BOOTICE1](http://ous2s14vo.bkt.clouddn.com/BOOTICE1.jpg)
2. 选择`UEFI`,点击`修改启动序列`,点击`添加`按钮,菜单标题填写:`CLOVER`,选择`启动文件`,在打开的窗口里选择`ESP`分区下的目录`\EFI\CLOVER\CLOVERX64.EFI`,点击`保存当前启动项设置`
  ![BOOTICE2](http://ous2s14vo.bkt.clouddn.com/BOOTICE2.jpg)


## 完善驱动
小米Pro的专用镜像已经包括了笔记本本身的所有的驱动.由于众所周知的原因,小米板载的INTEL无线网卡是焊死在主板上的,扩展槽又无法添加WIFI无线网卡,所以选择一个外置的USB无线网卡是种无奈之举.
### USB无线网卡及安装驱动程序
补充

最后更新:11-28-2017 AM11:30

# 特别鸣谢:
`@原味菠萝` `@(￣(工)￣)_小哥哥` `@_` 为本教程提供的部分素材

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


