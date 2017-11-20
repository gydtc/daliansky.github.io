---
title: 使用HIDPI解决睡眠唤醒黑屏、花屏及连接外部显示器的正确姿势
date: 2017-11-09 19:50:39
top: 95
urlname: Use-HIDPI-to-solve-sleep-wake-up-black-screen,-Huaping-and-connect-the-external-monitor-the-correct-posture
tags:
- HIDPI
- 黑屏
- 花屏
- 睡眠唤醒
- 内屏黑屏
- EDID
- fixEDID
categories:
- 教程
---
# 前言
> 经常会有网友反馈说自己的显示器黑屏或者花屏,早期的方式是[注入EDID](https://blog.daliansky.net/Mac-frequently-used-to-the-command---continuous-update.html)可有效解决类似问题.经常摸索后发现打开显示器的HIDPI高分辨率支持的同时可有效去掉这种现象,同时这种操作也会减少或者消除出现8个苹果的概率
 
## 教程开始

# 提取EDID
使用工具[DarwinDumper](https://bitbucket.org/blackosx/darwindumper)
操作步骤：

1. 打开 `DarwinDumper`，点击`Choose`，选择保存位置。可以将生成的文件保存到桌面
2. 点击`Deselect All Dumps`,取消所有的选择项
3. 勾选右侧的`EDID`
4. 点击`Run`按钮,生成`EDID.BIN`,保存于桌面生成的新目录中
![DarwinDumper](http://ous2s14vo.bkt.clouddn.com/DarwinDumper.jpg)
生成的HTML报告如下:
![DarwinDumperReport](http://ous2s14vo.bkt.clouddn.com/DarwinDumperReport.png)
***如果选择`Select All Dumps`再按`Run`它会生成一份完整的系统信息,类似于`WINDOWS`下面的`AIDA64`导出的详细信息***
![DarwinDumperReportFull](http://ous2s14vo.bkt.clouddn.com/DarwinDumperReportFull.png)

# 修正EDID及打开HIDPI显示支持
## 目的:通过此操作可有效解决开机内屏黑屏/花屏,显示器睡眠唤醒黑屏/花屏,可直接连接外部显示器
***备注:部分显卡需要修正显示器[接口数据](https://blog.daliansky.net/Intel-core-display-platformID-finishing.html),可通过Clover打补丁实现***
## 使用工具:[FixEDID](https://github.com/andyvand/FixEDID)

## 操作步骤:

1. 打开`FixEDID`,点击`Open EDID binary file`,选择上面生成的`EDID.BIN`,这个文件位于`~/Desktop/DarwinDumperxxx`
2. 依次打开`EDID`,`EDID`的目录中存在三种格式的文件,![EDID.BIN](http://ous2s14vo.bkt.clouddn.com/EDID.BIN.png)请选择打开`EDID.bin`
![FixEDID](http://ous2s14vo.bkt.clouddn.com/FixEDID.png)
3. 根据自己的显示器的分辨率选择16:9或者16:10,我的显示器是15.6寸,分辨率为1920x1080,长宽比为16:9,所以我需要将插图中的16:10通过下拉菜单选择调整为16:9,如下图![FixEDID2](http://ous2s14vo.bkt.clouddn.com/FixEDID2.png)
其中:前面的16:9是程序自动检测出的长宽比,后面的16:9通过下拉菜单选择,保持前后一致
4. 添加HIDPI高分辨率:请根据个人喜好添加,我通常会添加的分辨率如下:
    *     3200x1800
    *     2880x1620
    *     1920x1080
    *     1600x900
    *     1440x810
![FixEDID3](http://ous2s14vo.bkt.clouddn.com/FixEDID3.png)

5. 点击`Make`按钮,会自动在桌面生成一个新目录,比如我的目录为:`DisplayVendorID-dae`
6. 将该目录复制到显示器设备描述目录下,打开终端,输入命令:

``` sh
sudo cp -R ~/Desktop/DisplayVendorID-dae /System/Library/Displays/Contents/Resources/Overrides
```

# 如何修改分辨率
使用工具:[RDM](https://github.com/avibrazil/RDM)
![RDM](http://ous2s14vo.bkt.clouddn.com/RDM.png)
其中:分辨率后边带有闪电符号的即为HIDPI高分辨率

## 收工

   
# 关于打赏
您的支持就是我更新的动力!
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！
 
 
# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


