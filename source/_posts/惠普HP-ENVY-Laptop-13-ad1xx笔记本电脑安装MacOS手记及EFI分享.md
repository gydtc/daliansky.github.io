---
title: 惠普HP ENVY Laptop 13-ad1xx笔记本电脑安装MacOS手记及EFI分享
urlname: HP-HP-ENVY-Laptop-13-ad1xx-Notebook-PC-Mac-OS-Note-and-EFI-Share
date: 2017-10-11 19:14:14
top: 93
tags:
- 惠普
- ENVY
- ad1xx
- EFI
- 教程
categories:
- 教程
---

# 惠普HP ENVY Laptop 13-ad1xx笔记本电脑安装MacOS手记及EFI分享
> 群里有网友新购买了惠普HP ENVY Laptop 13-ad110tu笔记本电脑，想安装MacOS系统。本着折腾的原则，制作了hotpatch补丁。现将安装过程记录下来，以供后来者参考。

## 电脑配置
|规格|详细信息|
|---|---|
|电脑型号|HP ENVY Laptop 13-ad1xx 笔记本电脑|
|操作系统|Windows 10 64位 ( DirectX 12 )|
|处理器|英特尔 Core i5-8250U @ 1.60GHz 四核|
|主板|惠普 83A8 ( 英特尔 Xeon E3 - 1200 v6/7th Gen Intel Core)|
|显卡|英特尔 UHD Graphics 620 ( 128 MB / 惠普 )|
|内存|8 GB|
|主硬盘|英特尔 NVMe SSDPEKKF25 ( 256 GB / 固态硬盘 )|
|显示器|京东方 BOE070E ( 13.3 英寸  )|
|声卡|瑞昱  @ 英特尔 High Definition Audio 控制器|
|网卡|英特尔 Dual Band Wireless-AC 7265|

![HP_ENVY_Laptop_13-ad1xx](http://ous2s14vo.bkt.clouddn.com/HP_ENVY_Laptop_13-ad1xx.jpg)


## 制作EFI
1. 提取 DSDT/SSDT，制作hotpatch；
2. 添加独显屏蔽补丁，以适用于其它相似机型；
3. 添加虚拟网卡驱动，以解决icloud及AppStore登录问题；
4. 配置其它驱动程序；
5. 打包EFI。

## 安装过程
制作USB安装盘，替换EFI，进入Clover报错，将Drivers64UEFI目录下的OsxAptioFixDrv-64.efi替换为OsxAptioFix2Drv-64.efi，顺利进入Clover，可以正确识别NVMe SSD以及外置移动硬盘，分区抹盘完成安装，过程顺利。

## 完善驱动程序
1. 声卡：型号为ALC298，注入ID：28，使用AppleALC仿冒，顺利加载；修正HDMI Audio输出信息；
2. 网卡：INTEL的无线网卡截止到目前还是全球无解，使用购买赠送的TYPE-C转EtherNet网卡免驱动直接使用；
3. 显卡：Intel UHD Graphics 620，Platform-id为：0x59170000，目前还没法原生驱动，上次在安装[小米Pro](https://blog.daliansky.net/XiaoMiPro-notebook-Installation-10.13-readily-remember-and-share-EFI.html)的时候已经折腾很久也没有驱动上，昨晚又花了近三个小时还是无果，最后采取的是仿冒方式，Platform-id为：0x19160000，通过SSDT-Config.aml注入，修改显存为2048MB；通过读取Clover的源程序，发现UHD 620仿冒的是HD 620的Platform-id:0x59160000，有机会再测试吧。
   ![59170000](http://ous2s14vo.bkt.clouddn.com/59170000.png)
4. 蓝牙使用Intel，工作正常；
5. 电池信息正常；
6. 触摸板正常工作；
7. 显示器亮度调节正常；
8. USB端口信息未完善，需要使用SSDT-UIAC.aml进行修改；
9. PCI设备信息未修正；

## 系统截图
![about](http://ous2s14vo.bkt.clouddn.com/about.png)
*** 备注:该截图为显卡未驱动状态 ***

![hw-list](http://ous2s14vo.bkt.clouddn.com/hw-list.png)

![NVMe](http://ous2s14vo.bkt.clouddn.com/NVMe.png)

![ALC298_ID28](http://ous2s14vo.bkt.clouddn.com/ALC298_ID28.png)

![BlueTooth](http://ous2s14vo.bkt.clouddn.com/BlueTooth.png)

![USB](http://ous2s14vo.bkt.clouddn.com/USB.png)

![Power](http://ous2s14vo.bkt.clouddn.com/Power.png)

## EFI更新源
[https://github.com/daliansky/hp-envy13](https://github.com/daliansky/hp-envy13)


# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


