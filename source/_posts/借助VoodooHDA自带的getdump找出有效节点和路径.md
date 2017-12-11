---
title: 借助VoodooHDA自带的getdump找出有效节点和路径
date: 2017-11-13 10:35:55
urlname: With-VoodooHDA-comes-getdump-find-valid-nodes-and-paths
tags:
- 声卡仿冒
- AppleALC
- VoodooHDA
- getdump
categories:
- 教程
---

# 借助VoodooHDA自带的getdump找出有效节点和路径
声卡驱动了,音量调节的图标也显示正常,就是不发声怎么办
如果您的声卡使用了AppleALC,也注入了正确的ID后不发声怎么办呢?这个问题就出现在有效节点和路径不正确上面.
所谓条条大路通罗马,我们总不能在同一棵树上吊死吧.现在可以请出[VoodooHDA](https://github.com/daliansky/VoodooHDA-2.9.0-Clover-V10)万能声卡驱动程序[下载链接](https://github.com/daliansky/VoodooHDA-2.9.0-Clover-V10/raw/master/VoodooHDA_2.9.0_Clover-V11.dmg)了,说它万能是不正确的,如果它万能了估计就没`AppleALC`啥事儿了吧.这里可以借助`VoodooHDA`自带的应用程序:[getdump](https://github.com/daliansky/VoodooHDA-2.9.0-Clover-V10/raw/master/getdump),使用方法:打开终端,输入命令:

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

# 备注
该种方法摘自[使用AppleALC声卡仿冒驱动AppleHDA的正确姿势](https://blog.daliansky.net/Use-AppleALC-sound-card-to-drive-the-correct-posture-of-AppleHDA.html)的部分内容,之所以单独发布就是想让更多的人看到

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)

