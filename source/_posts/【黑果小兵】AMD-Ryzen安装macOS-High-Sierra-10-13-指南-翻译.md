---
title: '【黑果小兵】AMD Ryzen安装macOS High Sierra(10.13)指南[授权翻译]'
date: 2018-01-23 09:42:05
urlname: Fresh-installing-macOS-High-Sierra(10.13)-on-AMD-Ryzen-Hackintosh-Guide
tags:
- 教程
- AMD
- Ryzen
- High Sierra
- 安装指南
categories:
- 教程
---
### 【黑果小兵】AMD Ryzen安装macOS High Sierra(10.13)指南[授权翻译]

> 这是一个基本指南，可以用来得到一台运行macOS High Sierra 10.13.x的Ryzen台式电脑。 在AMD版本上安装macOS有更多的步骤，也更难以为初学者工作，所以我尽可能地简化了这个过程，并尽可能使本指南更容易理解。

如果你有一个基于Intel的系统，请参阅： **[macOS安装教程兼小米Pro安装过程记录](https://blog.daliansky.net/MacOS-installation-tutorial-XiaoMi-Pro-installation-process-records.html)**，因为本指南仅适用于Ryzen。

**使用这个Ryzen High Sierra指南的基本步骤，以下设备工作正常：**

- 声卡
- 以太网络
- 所有USB端口
- USB3速度
- Nvidia GPU
- AMD GPU
- 睡眠唤醒

### Ryzen High Sierra Hackintosh概述

稍微额外的努力，Ryzen可以在黑客行业工作，虽然它不会像英特尔的机器那样流畅，但是这是Mac的基础。

本指南基于Clover方法，并使用在Ryzen兼容性安装期间应用的定制Ryzen内核。 与英特尔的机器相比，安装的时间还要长得多。 

您只需要一个备用闪存驱动器，硬盘驱动器以及能够运行虚拟机来完成此操作的Mac或Windows / Linux计算机。 我已经包含一个EFI文件夹以及执行安装所需的PreInstall＆PostInstall文件夹。 安装完成后，声音应该工作我使用`VoodooHDA.kext`驱动程序，USB 2/3端口工作正常，使用`USBInjectAll.kext` /`GenericUSBXHCI.kext`，而对于以太网我包含了所有的可能的驱动文件，我可以想到Ryzen主板使用的，所以安装完成后也要工作。

使用本指南中包含的步骤和文件，我可以同时获得AMD RX和Nvidia GTX显卡的功能。 使用Ryzen CPU会出现一些图形化的性能下降。更新的AMD显卡的性能下降了10-15%，而对于Nvidia来说，性能下降了50%，fps下降了50%。

睡眠也适用于我是否插入了AMD或Nvidia显卡。在Ryzen + Nvidia上使用睡眠工具已经导致其他人重新启动问题，而不是正常唤醒，但似乎从High Sierra 10.13开始已经解决。包括10.13.1 build (17B1003)和10.13.2 (Beta)，因为我没有遇到这个问题与我的GTX 1050钛使用本指南中包含的文件。 

Ryzen hackintosh的一个**重要问题是无法安装macOS更新**。 例如，当我尝试时，我无法运行更新安装程序从10.13.1到10.13.2。 例如，当苹果有macOS的[根问题](https://www.macrumors.com/2017/11/29/apple-fixes-root-password-bug-security-update/)时，小的更新可以工作10.13.1我能够更新到更新的版本10.13.1。 但是要升级到 10.13.2，我唯一的选择就是在应用商店下载更新后的版本，然后创建另一个USB安装程序，重新安装High Sierra。

这个和更慢的图形性能，特别是在我看来与Nvidia显卡配对时，是使用Ryzen黑金刚的最不方便的部分。 如果你还没有购买你的电脑零件，并计划使用macOS作为你的主要操作系统，我建议与英特尔一起，只为了更平滑的体验，但如果你已经有一台像我这样的Ryzen PC，让我们开始吧...

### Part 1 - 创建一个Ryzen安装程序

要创建Ryzen hackintosh，您需要创建一个备用的8GB +闪存驱动器来安装High Sierra安装程序。

另外需要一个mac或没有Mac的人，你需要创建一个[运行macOS](http://hackintosher.com/guides/virtual-macos-use-macos-sierra-virtual-machine-vmware/)的[虚拟机](http://hackintosher.com/guides/virtual-macos-use-macos-sierra-virtual-machine-vmware/)

这是一个书面指南，但是如果你喜欢视频教程请参阅[XLNC**](https://www.youtube.com/watch?v=ydHyAmxPb_Y)创建的[**视频**](https://www.youtube.com/watch?v=ydHyAmxPb_Y)

#### 1. 创建一个High Sierra USB安装程序

学习如何做到如下： [如何创建MacOS系统安装U盘](http://hackintosher.com/guides/make-macos-flash-drive-installer/) 

#### 2. Ryzen内核设置

现在我们手中已经有了High Sierra的安装程序，我们需要将其配置为更友好的方式，方法是放入修改好的内核[**Bronya @ InsanelyMac**](https://translate.googleusercontent.com/translate_c?depth=1&hl=zh-CN&ie=UTF8&prev=_t&rurl=translate.google.com.hk&sl=en&sp=nmt4&tl=zh-CN&u=http://wiki.osx86project.org/wiki/index.php/Patched_Kernels&usg=ALkJrhivT46WUjtPLEE1rPwlo5O7TUjmTQ)和由**XLNC**创建的`PreInstall`/`PostInstall`的脚本。

##### 2.1 文件夹可见性

AMD内核文件被添加到默认情况下在macOS上隐藏的文件夹，所以让我们取消隐藏这些文件夹：

1. 打开**终端**
2. 输入以下两行命令：

```
defaults write com.apple.Finder AppleShowAllFiles true
killall Finder
```
​	屏幕输出如下：
![Xnip2018-01-23_16-12-00](http://7.daliansky.net/Xnip2018-01-23_16-12-00.jpg)

3. **重新启动** macOS，以便在编辑默认值后显示隐藏的文件。
4. 打开你在步骤1中所做的闪存驱动器**Install macOS High Sierra**你看到一堆半透明的文件夹。 这些是我们将要更改的隐藏文件夹。
     ![Xnip2018-01-23_16-40-02](http://7.daliansky.net/Xnip2018-01-23_16-40-02.jpg)
       注意文件夹`.IABootFiles`和`System` ，这是你将要添加东西的目录。

##### 2.2 添加AMD修补的内核
现在我们要开始将粘贴文件从可下载的文件夹复制到USB闪存驱动器
1. 下载[Ryzen_Kernel_10.13.zip](https://mega.nz/#!U89kjQJQ!7gsIIySHfxpsv43YrM8Dp_5mw_Gi6qjzliO1yH01hIg)
2. 解压`Ryzen_Kernel_10.13`
3. 进入`Ryzen_Kernel_10.13/PreInstall/Prelinkedkernel/`目录
4. 复制`prelinkedkernel` （*注意：是文件而不是文件夹*）
5. 我们将使用`prelinkedkernel`的补丁版本来替换安装`macOS High Sierra`上现有的Apple版本。 在以下位置粘贴并替换`prelinkedkernel`
   1. **/Volumes/Install macOS High Sierra/.IABootFiles/**
   2. **/Volumes/Install macOS High Sierra/System/Library/PrelinkedKernels/**
6. 导航回Ryzen_Kernel_10.13文件夹
7. 复制PreInstall和PostInstall文件夹
8. 将它们粘贴到闪存驱动器`/Volumes/Install macOS High Sierra/`




#### 第3步。EFI分区配置

现在，必须通过添加预配置的EFI文件夹来配置闪存驱动器的启动分区。

1. **装载EFI分区：**
   1. 下载[Clover配置器](https://translate.googleusercontent.com/translate_c?depth=1&hl=zh-CN&ie=UTF8&prev=_t&rurl=translate.google.com.hk&sl=en&sp=nmt4&tl=zh-CN&u=http://mackie100projects.altervista.org/download-clover-configurator/&usg=ALkJrhhbSCnKKZ2-Wdfn59Q5lXNkwKRoAw)
   2. 打开**三叶草配置程序**
   3. 在工具下选择**装载EFI**
   4. 单击**安装分区**以安装macOS ...。
   5. 点击**打开分区**
2. 如果在挂载的分区中存在，则选择名为**EFI**的文件夹。
3. 下载**Ryzen_High_Sierra_10.13_EFI.zip**
4. **解压** **Ryzen_High_Sierra_10.13_EFI.zip**
5. **复制**解压缩的**EFI**文件夹
6. 将复制的**EFI**粘贴到已装入的EFI分区或**/卷/ EFI中**

### 第2部分 - 在Ryzen上安装High Sierra

在Ryzen上安装High Sierra相对于兼容的英特尔机器来说更难执行，主要是因为需要时间加载各个部件，而且由于需要耐心处理失败的靴子，您可能经常遇到这个着名的屏幕：

![img](http://hackintosher.com/wp-content/uploads/2017/12/hqdefault.jpg)

不用担心，只需重新启动系统，然后重试。 在启动Ryzen hackintosh的时候，斜线的圆/失败的启动图标也可能会出现，然后安装后，虽然它应该比安装发生的频率低。 如果你睡觉了，而不是把它关掉，那么这个问题不应该是一个大问题，这对AMD和Nvidia显卡都适用。

#### 步骤1. BIOS设置

现在USB安装程序已经完成了，现在可以配置BIOS以兼容macOS。

1. 重新启动机器并进入BIOS，热键将为F8，F10，F11或F12
2. 转过“退出”部分并将BIOS设置重置为“默认”
3. 我建议将闪存驱动器的UEFI：分区设置为在Boot的引导部分下找不到的Boot＃1
4. 设置以下BIOS设置：（您可能没有所有这些设置，这没关系）
   1. AMD-V / SVM =禁用（可以重新启用后 
      如果需要安装）
   2. SATA端口= AHCI
   3. IOMMU =禁用
   4. APU =禁用
   5. HPET =启用
   6. EHCI Hands-off =已启用
   7. XHCI Hands-off =已启用
   8. 串行端口=禁用
   9. 并行端口=禁用

#### 第2步。启动USB安装程序

启动到MacOS USB闪存驱动器安装程序的UEFI以加载Clover启动菜单。

![img](http://hackintosher.com/wp-content/uploads/2017/10/1.-Boot-OS-X-Install.jpg)如果USB驱动器没有设置为默认启动音量，则在启动屏幕出现时更改临时启动设备，需要按下的按钮通常为F10，F11或F12。 出现临时选择屏幕时选择UEFI :( USB设备名称）。

1. 你现在在三叶草菜单。 使用箭头键验证**Boot OS X安装从安装**选择**macOS High Sierra**
2. 按**Enter键**
3. *安装程序现在将缓慢加载...如果您得到香烟十字标志而不是下面的图像，只需重新启动并再次尝试。* *当我通过安装程序的步骤时，发生了几次这样的事情，只是再次尝试让我解决这个问题。* **

![img](http://hackintosher.com/wp-content/uploads/2017/10/Boot-Progress-Bar.jpg)

当安装程序加载时，我们希望在开始安装之前将磁盘格式化为适合黑客可用性的GUID。

1. 安装程序出现时按**继续**

2. 选择你的语言

3. 从安装菜单中选择**磁盘工具**

4. 按下左上角左上角的查看按钮，从下拉菜单中选择**显示所有设备** 。 （注意： [NVME驱动器不显示？](https://translate.googleusercontent.com/translate_c?depth=1&hl=zh-CN&ie=UTF8&prev=_t&rurl=translate.google.com.hk&sl=en&sp=nmt4&tl=zh-CN&u=http://hackintosher.com/blog/get-nvme-m-2-ssds-show-high-sierra-hackintosh-install/&usg=ALkJrhhKFyGyZOKxRVJOIAdhalwOH9Vlzw) ）

5. 选择要安装macOS的磁盘，并使用以下设置删除它：

   - 名称:(可以任意命名）
   - 格式： **Mac OS扩展（日志式）**
   - Scheme： **GUID分区映射**

   ​

   ![img](http://hackintosher.com/wp-content/uploads/2017/10/GUID-High-Sierra-1024x683.jpg)记住为AMD内核选择的驱动器名称和禁用APFS转换非常重要。

6. 按**擦除**

7. 关闭**磁盘工具**

8. **安装macOS High Sierra**

注意：在安装macOS时，屏幕可能会变黑，显示屏正在睡眠，您可以按住键盘上的某个键或摇动鼠标来唤醒屏幕

![img](http://hackintosher.com/wp-content/uploads/2017/10/High-Sierra-Disk-Install-1024x683.jpg)

安装程序完成后，计算机将重新启动，您将希望返回到Clover菜单。 

#### 步骤3. AMD PreInstall内核执行

Clover现在有了第二个选项，但是在我们做这个之前，我们必须先做AMD内核的预安装部分

![img](http://hackintosher.com/wp-content/uploads/2017/10/2.-Boot-OS-X-Terminal.png)

1. 选择**引导OS X从安装macOS高山**再次**安装**

2. 一旦安装程序完成加载，在顶部菜单栏中通过实用程序打开**终端** 。

3. **（可选） 禁用终端的APFS**

4. 如果您忘记了您的驱动器名称，请键入以下内容：

  ```bash
    ls -1 /Volumes
  ```
  *`ls -1 /Volumes`将列出可用卷。* *我们需要在步骤4.2中为下面一行设置的驱动器的名称*

5. 在**终端中输入以下命令：

   ```
     /Volumes/Image\ Volume/PreInstall/pre 
   ```

6. 按**Enter键**

7. **卷名称：**是您格式化时命名的驱动器。 所以输入并按回车。

8. **让它运行...**

9. 在终端中提示您**重新启动**计算机时，将从顶部的银色菜单栏中**重新启动**计算机

#### 第4步 完成安装程序

![img](http://hackintosher.com/wp-content/uploads/2017/10/3.-Boot-macOS-Install.png)

1. 在重新启动时重新进入Clover菜单
2. **从“Hackintosh”**选择**启动macOS安装**
3. *安装程序将完成High Sierra安装...如果您在灰色屏幕重新启动，并再次尝试，直到它加载底部图像成功。* *另外这部分花了我很长时间才完成，我被困在“约18分钟”，等了约10分钟。*

![img](http://hackintosher.com/wp-content/uploads/2017/10/High-Sierra-Hackintosh-Loading-1024x683.jpg)检查出[High Sierra fix - “macOS无法安装在您的计算机上”，](http://hackintosher.com/guides/high-sierra-fix-macos-not-installed-computer/)如果你得到一个重新启动错误提示，而不是这张照片。

#### 步骤5. AMD Post安装内核执行

1. 选择**Boot OS X Install from Install macOS High Sierra**再次**进行安装**

2. 一旦安装程序完成加载，在顶部菜单栏中通过实用程序打开**终端** 。

3. 在**终端中**键入以下内容：

   ```
   /Volumes/Image\ Volume/PostInstall/kernel_kext_install_only 
   ```

4. 按**Enter键**

5. 输入**卷名称的**驱动器**名称：**

6. **让它运行...**

7. 在终端中提示您**重新启动**计算机时，将从顶部的银色菜单栏中**重新启动**计算机

#### 第6步。Ryzen最终安装和第一次启动

安装完成后电脑会自动重启。

![img](http://hackintosher.com/wp-content/uploads/2017/10/4.-Boot-macOS-High-Sierra.png)

1. **从“Hackintosh”中**选择**Boot macOS**
2. 选择**语言**
3. 选择**键盘**
4. 选择**我的电脑没有连接到互联网**
5. 选择**不传输任何信息**
6. **同意**条款和条件
7. 填写**登录信息**
8. （可选）如果您不希望被跟踪，请在快速设置中选择**自定义设置** 。
9. *macOS High Sierra将首次启动...*

### 第3部分 - Ryzen Hackintosh后安装

还有很多事情可以从硬盘驱动器而不是闪存驱动器启动，并从图形卡获得适当的视频加速必须完成。

![img](http://hackintosher.com/wp-content/uploads/2017/10/High-Sierra-Install-1024x576.jpg)

#### 步骤1.配置EFI分区

现在我们在macOS中，我们希望能够在没有USB闪存驱动器插件的情况下加载macOS。为了能够从驱动器启动macOS，它需要被复制到启动驱动器的EFI分区上。 你也应该有互联网接入。

1. 打开**三叶草配置程序**
2. **安装** **闪存驱动器**的**EFI**
3. 按打开EFI或导航到取景器中的EFI位置
4. 将EFI文件夹复制到您的桌面上
5. 打开**查找器**并弹出闪存驱动器
6. 使用Clover Configurator安装磁盘的EFI
7. 按打开EFI或导航到取景器中的EFI位置
8. 将EFI粘贴到磁盘上的现有EFI上
9. 当它通过菜单提示您EFI文件夹已经存在时，选择Replace

![img](http://hackintosher.com/wp-content/uploads/2017/04/replace_efi.png)

**现在，您将能够在没有USB闪存驱动器的情况下启动macOS**

**建议：**删除EFI文件夹中名为APPLE的文件夹（如果存在）。 这个文件夹是在安装过程中自动在闪存驱动器的EFI分区上创建的，可能会导致hainstintosh问题。 该文件夹最终将被重新创建，但只需要在安装macOS后删除一次。 

#### 步骤2. AMD CPU速度增强

运行AMD Ryzen Hackintosh时，CPU的性能下降了大约20％。 这可以通过设置busratio bootflag来匹配你的Ryzen CPU来解决。

**总线** **速率**由以下公式计算： **CPU速度时钟（MHz）/总线速度（MHz）=总线速率。**

CPU速度时钟（MHz）= **CPU速度（GHz）x 1000**

所有Ryzen CPU的总线速度（Mhz）= **100MHz**

**例子：**

- Ryzen 1800X 3.6GHz; **busratio = 36**
- Ryzen 1700x 3.4GHz; **busratio = 34**
- Ryzen 1700 3.0GHz; **busratio = 30**
- Ryzen 1600X 3.6GHz; **busratio = 36**
- Ryzen 1600 3.2GHz; **busratio = 32**
- Ryzen 1500X 3.5GHz; **busratio = 35**
- Ryzen 1400 3.2GHz; **busratio = 32**

##### **设置公交车比例：**

1. 装入EFI分区

2. 导航到/卷/ EFI / EFI / CLOVER /

3. 在Clover Configurator中打开config.plist

4. 在左侧栏中选择**引导**

5. 在**自定义标志**下为你的CPU添加正确的busratio = xx：


   ![img](http://hackintosher.com/wp-content/uploads/2017/12/busratio-flag-in-Clover-Configurator.png)我使用的是Ryzen 1700 CPU，所以我的busratio是30，因为3.0GHz的时钟速度。

#### 第3步。专用GPU加速

对于您的特定主板，您可能需要将NVRAM检测修补程序添加到dGPU加速中。 我在AMD RX 560上不需要它，但是当我插入我认为很奇怪的Nvidia GTX 1050 Ti时需要它。

**添加EmuVariableUefi-64.efi：**

1. 打开**三叶草配置程序**
2. 安装您的**EFI分区**
3. 使用Clover配置器打开**config.plist**
4. 单击Clover Configurator左栏中的**安装驱动程序**
5. 点击**左下角的EmuVariableUefi** 。
6. 在**/卷/ EFI / EFI / Clover / Drivers64UEFI /**

##### AMD：

我把这些文件包括在内，让AMD RX卡工作，除了Vega 56/64，这将需要更多的工作。如果您有RX 560，请添加引导标志`-rad4200`以防止冻结，如此**处所述** 。

##### NVIDIA：

除EmuVariableUefi-64.efi外，如果您使用的是最新发布的Nvidia GPU之一，您将安装网络驱动程序。 不应该有任何你需要做的事情我已经设置了适当的CsrActivateConfig并添加了必要的kexts。 如果在安装网络驱动程序后出于某种原因无法正常工作，则可能需要在BIOS中禁用CMS。

转到驱动程序页面获取Web驱动程序：

**下载 - Nvidia Web驱动程序**

注意：如果由于隐私设置而未能成功安装，可能需要重新安装Nvidia网络驱动程序。

步骤4.声音，以太网和其他一切

声音使用VoodooHDA.kext启用。 我包括了所有的以太网kexts，我可以想到，这将与Ryzen，但我建议删除你不需要的kexts。



### 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

### QQ群:

331686786 [一起吃苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)[群已满,请加下面群]

688324116[一起黑苹果](https://shang.qq.com/wpa/qunwpa?idkey=6bf69a6f4b983dce94ab42e439f02195dfd19a1601522c10ad41f4df97e0da82)



   ```

   ```