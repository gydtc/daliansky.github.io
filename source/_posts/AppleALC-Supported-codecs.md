---
title: AppleALC支持的Codecs列表及AppleALC的使用
urlname: AppleALC-Supported-codecs
date: 2017-09-08 09:40:15
tags:
- AppleALC
- Codec
- Lilu
categories:
- 教程
---
# 如何使用AppleALC
如果您的编解码器[支持](https://github.com/vit9696/AppleALC/wiki/Supported-codecs)，您需要完成的唯一任务是加载内核扩展，并查看它是否工作。您可以使用您的引导加载程序(比如：Clover)，但请记住在`AppleHDA`之前加载`AppleALC`（有关更多详细信息，请参阅`sudo kextstat`输出）。

**请注意**，[Lilu](https://github.com/vit9696/Lilu) 也必须出现在`AppleALC`上。

按照一个易于使用的指南来添加您的编解码器支持，如果它不在这里。请分享您的成功结果。

备注：`AppleALC`不处理`layout-id`值，它希望你提供正确的DSDT(SSDT)。

# 如何控制AppleALC

`AppleALC`接受不同的引导参数来控制其行为：

* `-alcoff` - 禁用自身;
* `-alcdbg` - 打印调试信息（如果扩展在调试模式下编译）;
* `-alcbeta` - 在不支持的系统（通常未发布或旧版）上启用AppleALC;
* `-x`或`-s` - 也将禁用AppleALC。
* 所有[Lilu](https://github.com/vit9696/Lilu)启动参数都会影响AppleALC。

# 如何提取调试日志

在使用`-alcdbg -liludbg`引导后，在终端`Terminal`中运行以下命令并保存输出。

10.12及以后版本：

`log show --predicate 'process == "kernel" AND (eventMessage CONTAINS "AppleALC" OR eventMessage CONTAINS "Lilu")' --style syslog --source`

10.11及以前版本

`cat /var/log/system.log | egrep '(AppleALC|Lilu)'`



# 附：AppleALC支持的编解码器列表 更新日期：11-3-2017

| Vendor | Codec | Revisions | MinKernel | MaxKernel |
|--------|-------|-----------|-----------|-----------|
| Creative | [CA0132](https://github.com/vit9696/AppleALC/tree/master/Resources/CA0132)| 0x100918 layout 0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12 | 13 (10.9) | — |
| CirrusLogic | [CS4210](https://github.com/vit9696/AppleALC/tree/master/Resources/CS4210)| 0x100101 layout 13 | 13 (10.9) | — |
| CirrusLogic | [CS4213](https://github.com/vit9696/AppleALC/tree/master/Resources/CS4213)| 0x100100 layout 28 | 13 (10.9) | — |
| Realtek | [ALC221](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC221)| layout 11 | 12 (10.8) | — |
| Realtek | [ALC225/ALC3253](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC225)| layout 28 | 13 (10.9) | — |
| Realtek | [ALC233](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC233)| layout 3, 13, 27 | 13 (10.9) | — |
| Realtek | [ALC235](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC235)| layout 3, 11, 28 | 13 (10.9) | — |
| Realtek | [ALC236](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC236)| 0x100001, 0x100002 layout 3, 11, 13 | 13 (10.9) | — |
| Realtek | [ALC3236](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC233)| layout 4, 5, 28, 29 | 13 (10.9) | — |
| Realtek | [ALC255](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC255)| layout 3, 13, 17, 27, 28 | 13 (10.9) | — |
| Realtek | [ALC256 (3246)](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC256)| layout 13 | 13 (10.9) | — |
| Realtek | [ALC260](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC260)| layout 11, 12 | 13 (10.9) | — |
| Realtek | [ALC262](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC262)| 0x100202 layout 11, 12 | 13 (10.9) | — |
| Realtek | [ALC268](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC268)| layout 3 | 13 (10.9) | — |
| Realtek | [ALC269](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC269)| 0x100004, 0x100100, 0x100202, 0x100203 layout 1-9, 11, 13, 14, 15, 16, 18, 19, 20, 27, 28, 29, 32, 33, 35, 40, 76 | 12 (10.8) | — |
| Realtek | [ALC270](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC270)| 0x100100, layout 3, 4, 27, 28 | 13 (10.9) | — |
| Realtek | [ALC271x](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC269)| layout 9, 31 | 12 (10.8) | — |
| Realtek | [ALC272](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC272)| 0x100001, layout 3, 11 | 13 (10.9) | — |
| Realtek | [ALC275](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC275)| 0x100005, 0x100008, layout 3, 13, 28 | 13 (10.9) | — |
| Realtek | [ALC280](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC280)| layout 3, 4, 11 | 13 (10.9) | — |
| Realtek | [ALC282](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC282)| 0x100003, layout 3, 4, 13, 27, 28, 29, 86 | 12 (10.8) | — |
| Realtek | [ALC283](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC283)| layout 3, 11, 66 | 13 (10.9) | — |
| Realtek | [ALC284](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC284)| layout 3 | 13 (10.9) | — |
| Realtek | [ALC286](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC286)| 0x100002, 0x100003 layout 3 | 13 (10.9) | — |
| Realtek | [ALC288](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC288)| layout 3, 13 | 13 (10.9) | — |
| Realtek | [ALC290](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC290)| layout 3, 28 | 13 (10.9) | — |
| Realtek | [ALC3241](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC290)| layout 4 | 13 (10.9) | — |
| Realtek | [ALC292](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC292)| layout 12, 28 | 13 (10.9) | — |
| Realtek | [ALC293](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC293)| layout 28, 29 | 13 (10.9) | — |
| Realtek | [ALC295](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC295)| layout 3, 28 | 13 (10.9) | — |
| Realtek | [ALC298](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC298)| 0x100103, layout 3, 11, 13, 28, 29, 72 | 13 (10.9) | — |
| Realtek | [ALC662](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC662)| 0x100101, 0x100300 layout 5, 7, 11, 12, 13 | 13 (10.9) | — |
| Realtek | [ALC663](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC663)| 0x100002, layout 3, 4, 28 | 13 (10.9) | — |
| Realtek | [ALC665](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC665)| layout 12, 13 | 13 (10.9) | — |
| Realtek | [ALC668](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC668)| 0x100003, layout 3, 20, 27, 28, 29 | 13 (10.9) | — |
| Realtek | [ALC670](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC670)| 0x100002, layout 12 | 13 (10.9) | — |
| Realtek | [ALC882](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC882)| 0x100101, layout 5, 7 | 13 (10.9) | — |
| Realtek | [ALC883](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC883)| 0x100002, layout 7 | 13 (10.9) | — |
| Realtek | [ALC885](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC885)| 0x100101, 0x100103 layout 1, 12 | 13 (10.9) | — |
| Realtek | [ALC887](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC887)| 0x100202, 0x100302, layout 1, 2, 3, 5, 7, 11, 13, 17, 18, 33, 99 | 13 (10.9) | — |
| Realtek | [ALC888/ALC1200](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC888)| 0x100101, 0x100001, 0x100202, 0x100302 layout 1, 2, 3, (4 for laptop), 5, 7, 11, 28, 29 | 13 (10.9) | — |
| Realtek | [ALC889](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC889)| 0x100004, layout 1, 11, 12 | 13 (10.9) | — |
| Realtek | [ALC891/ALC867](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC891)| 0x100002, layout 13 | 13 (10.9) | — |
| Realtek | [ALC892](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC892)| 0x100302, layout 1, 2, 3, (4 for laptop), 5, 7, 28, 31, 92, 99 | 13 (10.9) | — |
| Realtek | [ALC898/ALC899](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC898)| 0x100003, layout 1, 2, 3, 5, 7, 11, 13, 28, 65 | 13 (10.9) | — |
| Realtek | [ALC1150](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC1150)| 0x100001, layout 1, 2, 3, 5, 7, 11 | 12 (10.8) | — |
| Realtek | [ALC1220](https://github.com/vit9696/AppleALC/tree/master/Resources/ALC1220)| 0x100003, layout 1, 2, 5, 7, 11 | 15 (10.11) | — |
| Realtek | [ALCS1220A](https://github.com/vit9696/AppleALC/tree/master/Resources/ALCS1220A)| layout 1, 2, 5, 7 | 15 (10.11) | — |
| AnalogDevices | [AD1984](https://github.com/vit9696/AppleALC/tree/master/Resources/AD1984)| 0x100400, layout 11 | 13 (10.9) | — |
| AnalogDevices | [AD1984A](https://github.com/vit9696/AppleALC/tree/master/Resources/AD1984A)| 0x100400, layout 11, 13 | 13 (10.9) | — |
| AnalogDevices | [AD1988B](https://github.com/vit9696/AppleALC/tree/master/Resources/AD1988B)| layout 5, 7, 12 | 13 (10.9) | — |
| AnalogDevices | [AD2000B](https://github.com/vit9696/AppleALC/tree/master/Resources/AD2000B)| layout 5, 7 | 13 (10.9) | — |
| Conexant | [CX8050](https://github.com/vit9696/AppleALC/tree/master/Resources/CX8050)| layout 3 | 16 (10.12) | — |
| Conexant | [CX8200](https://github.com/vit9696/AppleALC/tree/master/Resources/CX8200)| layout 3 | 16 (10.12) | — |
| Conexant | [CX20561](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20561)| 0x100000, layout 11 | 13 (10.9) | — |
| Conexant | [CX20583](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20583)| layout 3 | 13 (10.9) | — |
| Conexant | [CX20585](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20585)| layout 3, 13 | 13 (10.9) | — |
| Conexant | [CX20588](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20588)| layout 3 | 13 (10.9) | — |
| Conexant | [CX20590](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20590)| 0x100000, 0x100002, 0x100003, layout 3, 12, 28 | 13 (10.9) | — |
| Conexant | [CX20722](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20722)| layout 3 | 16 (10.12) | — |
| Conexant | [CX20724](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20724)| layout 3, 13 | 13 (10.9) | — |
| Conexant | [CX20751/20752](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20751_2)| layout 3, 28 | 13 (10.9) | — |
| Conexant | [CX20753/4](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20753_4)| layout 3 | 16 (10.12) | — |
| Conexant | [CX20755](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20755)| layout 3 | 13 (10.9) | — |
| Conexant | [CX20756](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20756)| layout 3, 13 | 13 (10.9) | — |
| Conexant | [CX20757](https://github.com/vit9696/AppleALC/tree/master/Resources/CX20757)| layout 3 | 13 (10.9) | — |
| IDT | [IDT92HD66C3/65](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD66C3_65)| layout 3 | 13 (10.9) | — |
| IDT | [IDT92HD71B7X](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD71B7X)| layout 3 | 13 (10.9) | — |
| IDT | [IDT92HD73C1X5](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD73C1X5)| layout 19 | 13 (10.9) | — |
| IDT | [IDT92HD75B2X5](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD75B2X5)| layout 3 | 13 (10.9) | — |
| IDT | [IDT92HD75B3X5](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD75B3X5)| layout 3, 11 | 13 (10.9) | — |
| IDT | [IDT92HD99BXX](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD99BXX)| layout 3 | 13 (10.9) | — |
| IDT | [IDT92HD87B1](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD87B1)| layout 3 | 13 (10.9) | — |
| IDT | [IDT92HD81B1C5](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD81B1C5)| layout 3, 11 | 13 (10.9) | — |
| IDT | [IDT92HD81B1X5](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD81B1X5)| layout 3, 11, 12, 20, 21, 28 | 13 (10.9) | — |
| IDT | [IDT92HD87B1/3](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD87B1_3)| layout 12 | 13 (10.9) | — |
| IDT | [IDT92HD87B2/4](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD87B2_4)| layout 12 | 13 (10.9) | — |
| IDT | [IDT92HD90BXX](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD90BXX)| layout 3, 12 | 13 (10.9) | — |
| IDT | [IDT92HD91BXX](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD91BXX)| 0x100102, 0x100303 layout 3, 12, 33 | 13 (10.9) | — |
| IDT | [IDT92HD93BXX](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD93BXX)| 0x100203, layout 12 | 13 (10.9) | — |
| IDT | [IDT92HD95](https://github.com/vit9696/AppleALC/tree/master/Resources/IDT92HD95)| layout 12 | 13 (10.9) | — |
| VIA | [VT1802](https://github.com/vit9696/AppleALC/tree/master/Resources/VT1802)| 0x100000, layout 3, 33 | 13 (10.9) | — |
| VIA | [VT2020/2021](https://github.com/vit9696/AppleALC/tree/master/Resources/VT2020_2021)| 0x100100, layout 5, 7, 9 | 13 (10.9) | — |
| Intel  | [HD4000 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x01660003, 0x01660009, 0x0166000A | 13 (10.9) | — |
| Intel  | [HD4600 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x0d220003  | 13 (10.9) | — |
| Intel  | [HD5500 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x16260006 | 15 (10.11) | — |
| Intel  | [HD5600 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x16260006 | 15 (10.11) | — |
| Intel  | [HD6000 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x16260004 | 15 (10.11) | — |
| Intel  | [HD515 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x191E0000 | 15 (10.11) | — |
| Intel  | [HD520 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x19160000 | 15 (10.11) | — |
| Intel  | [HD530 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x19160000, 0x191B0000, 0x19120000 | 15 (10.11) | — |
| Intel  | [HD630 HDMI](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| ig-platform-id 0x59120000 | 15 (10.11) | — |
| AMD  | [Radeon 290/290X](https://github.com/vit9696/AppleALC/blob/master/Resources/Controllers.plist)| | 15 (10.11) | — |

# 附表:已知的编解码器型号及厂商列表

|声卡型号|厂商|
|---|---|
|ADXXXX|           Analog Devices|
|AGEREXXXX|        LSI|
|ALCXXXX|          Realtek|
|ATIXXXX|          ATI|
|CAXXXX|           Creative|
|CMIXXXX|          CMedia|
|CMIXXXX2|         CMedia|
|CSXXXX|           Cirrus Logic|
|CXXXXX|           Conexant|
|CHXXXX|           Chrontel|
|LGXXXX|           LG|
|WMXXXX|           Wolfson Microelectronics|
|QEMUXXXX|         QEMU|
|IDTXXXX|          IDT|
|INTELXXXX|        Intel|
|MOTOXXXX|         Motorola|
|NVIDIAXXXX|       NVIDIA|
|SIIXXXX|          Silicon Image|
|STACXXXX|         Sigmatel|
|VTXXXX|           VIA|

# 扩展阅读：
[Lilu支持的内核参数及插件列表](https://blog.daliansky.net/2017/08/25/Existing-Lilu-Plugins/)

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


