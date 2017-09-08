---
title: Broadcom WiFi/BlueTooth BCM94352z(DW1560)的正确驱动姿势
date: 2017-09-07 16:18:13
tags:
- DW1560
- BCM94352z
- 10.12
- 10.13
- sierra
- high sierra
- 驱动
- WIFI
categories:
- 教程
---
### Broadcom WiFi/BlueTooth BCM94352z(DW1560)的正确驱动姿势
> 黑苹果的系统安装好后的第一件事情是得让它连接上互联网，以完善其它的驱动程序。也可借此安装类似`TeamViewer`或者`向日葵`之类的远程控制程序，让其它人通过远程的方式帮你完善系统。本文要介绍的就是教你如何驱动BCM94352z这款最常采用的无线网卡。

#### 问题的提出：
* 在macOS Sierra上，当使用BMC94532z NGFF WiFi卡时，`AirportBrcm4360.kext`不再成功加载。这个问题是由于驱动程序无法初始化fvco（频率压控振荡器）引起的。 

#### 解决方案：两种方法任选其一【我假设你的系统是10.12.x，同时也给出即将发布的10.13.x的方法】
* 使用应用程序`Clover Configurator`在`Clover`中的`KextsToPatch`应用以下补丁，以使BCM94352z启用WiFi：

```sh
Name:           AirPortBrcm4360
Comment:        在Brcm4360驱动中添加BCM94352z的设备ID：0x43b114e4
Find:           pci14e4,43a0
Replace:        pci14e4,43b1
MatchOS:        10.12.x
InfoPlistPatch: true

Name:           AirPortBrcmNIC
Comment:        在Brcm4360驱动中添加BCM94352z的设备ID：0x43b114e4
Find:           pci14e4,43a0
Replace:        pci14e4,43b1
MatchOS:        10.13.x
InfoPlistPatch: true

Name:           AirPortBrcm4360
Comment:        初始化fvco以加载BCM4360驱动[10.12.x] - Darkvoid
Find:           81F952AA00007529 
Replace:        81F952AA00006690

Name:           AirPortBrcmNIC
Comment:        初始化fvco以加载BCM4360驱动[10.13.x]
Find:           81F952AA00007529 
Replace:        81F952AA00006690


```

* 可以使用文本编辑器直接打开`config.plist`，将下面的内容粘贴到`<key>KextsToPatch</key>`里

```xml
			<dict>
				<key>Comment</key>
				<string>在Brcm4360驱动中添加BCM94352z的设备ID：0x43b114e4</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<string>pci14e4,43a0</string>
				<key>InfoPlistPatch</key>
				<true/>
				<key>MatchOS</key>
				<string>10.12.x</string>
				<key>Name</key>
				<string>AirPortBrcm4360</string>
				<key>Replace</key>
				<string>pci14e4,43b1</string>
			</dict>
			<dict>
				<key>Comment</key>
				<string>初始化fvco以加载BCM4360驱动[10.12.x] - Darkvoid</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<data>
				gflSqgAAdSk=
				</data>
				<key>MatchOS</key>
				<string>10.12.x</string>
				<key>Name</key>
				<string>com.apple.driver.AirPort.Brcm4360</string>
				<key>Replace</key>
				<data>
				gflSqgAAZpA=
				</data>
			</dict>
			<dict>
				<key>Comment</key>
				<string>在Brcm4360驱动中添加BCM94352z的设备ID：0x43b114e4</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<string>pci14e4,43a0</string>
				<key>InfoPlistPatch</key>
				<true/>
				<key>MatchOS</key>
				<string>10.13.x</string>
				<key>Name</key>
				<string>AirPortBrcmNIC</string>
				<key>Replace</key>
				<string>pci14e4,43b1</string>
			</dict>
			<dict>
				<key>Comment</key>
				<string>初始化fvco以加载BCM4360驱动[10.13.x]</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<data>
				gflSqgAAdSk=
				</data>
				<key>MatchOS</key>
				<string>10.13.x</string>
				<key>Name</key>
				<string>AirPortBrcmNIC</string>
				<key>Replace</key>
				<data>
				gflSqgAAZpA=
				</data>
			</dict>
			
```
它看起来是这个样子的：
![KextsToPatch_BCM4360](http://ous2s14vo.bkt.clouddn.com/KextsToPatch_BCM4360.png)

`config.plist`文件的修改到此结束
现在BCM94352z的WIFI应该已经可以工作了，你甚至都不需要添加仿冒WIFI的设备ID。当然，在重启前，还要重建一下系统的缓存，命令为：

```bash
sudo rm -rf /System/Library/Caches/com.apple.kext.caches/Startup/kernelcache
sudo rm -rf /System/Library/PrelinkedKernels/prelinkedkernel
sudo touch /System/Library/Extensions/ && sudo kextcache -u /
```
重启你的系统，检查WIFI是否工作正常。
#### 驱动你的蓝牙
##### Clover设置：
* 使用应用程序`Clover Configurator`在`Clover`中的`KextsToPatch`应用以下补丁，以使BCM94352z启用蓝牙：

```sh
Name:       IOBluetoothFamily
Comment:    10.11+-BT4LE-Handoff-Hotspot-lisai9093
Find:       4885ff74 47488b07 
Replace:    41be0f00 0000eb44
```

* 可以使用文本编辑器直接打开`config.plist`，将下面的内容粘贴到`<key>KextsToPatch</key>`里

```xml
			<dict>
				<key>Comment</key>
				<string>10.11+-BT4LE-Handoff-Hotspot-lisai9093</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<data>
				SIX/dEdIiwc=
				</data>
				<key>Name</key>
				<string>IOBluetoothFamily</string>
				<key>Replace</key>
				<data>
				Qb4PAAAA60Q=
				</data>
			</dict>
```
  
##### 驱动：
> 下载：[RehabMan-FakePCIID](https://bitbucket.org/RehabMan/os-x-fake-pci-id/downloads) [RehabMan-BrcmPatchRAM](https://bitbucket.org/RehabMan/os-x-brcmpatchram/downloads) [AirportBrcmFixup](https://sourceforge.net/p/airportbrcmfixup/)

1. 将文件`BrcmFirmwareData.kext`和`BrcmPatchRAM2.kext`复制到`/EFI/CLOVER/kexts/Other`目录下
2. 将文件`FakePCIID_Broadcom_WiFi.kext`和`FakePCIID.kext`复制到`/EFI/CLOVER/kexts/Other`目录下
3. 将文件`AirportBrcmFixup.kext`复制到`/EFI/CLOVER/kexts/Other`目录下,由于`AirportBrcmFixup.kext`是依赖于[Lilu](https://github.com/vit9696/Lilu/releases)运行的插件，所以还需要检查该目录下必须存在`Lilu.kext`
4. 包括这些文件的目录看起来是这样的：
![brcm94352z驱动](http://ous2s14vo.bkt.clouddn.com/brcm94352z驱动.png)

当然，在重启前，还要重建一下系统的缓存，命令为：

```bash
sudo rm -rf /System/Library/Caches/com.apple.kext.caches/Startup/kernelcache
sudo rm -rf /System/Library/PrelinkedKernels/prelinkedkernel
sudo touch /System/Library/Extensions/ && sudo kextcache -u /
```
重启你的系统，检查蓝牙是否工作正常。

#### 写在最后
这是驱动BCM94352z(DW1560)的基础设置，还有些高级设置需要各位多爬帖。

#### QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


