---
title: hda-verb参数详表
urlname: hda-verb-parameter-detail-table
date: 2017-09-04 22:16:02
tags:
- codec
- hda-verb
- AppleALC
- CodecCommander
- CC
- ALCPlugFix
categories:
- linux
- 工具
---

# hda-verb参数详表
> hda-verb的由来
> hda-verb是linux下面的`alsa-project`的一条命令，它的作用是发送`HD-audio`命令。

## 命令格式：

* linux:
    * `% hda-verb /dev/snd/hwC0D0 0x12 0x701 2` 
* Mac:
    * `$ hda-verb 0x12 0x701 2`

输入命令：

```sh
hda-verb 
```
输出信息：

```sh
hda-verb for CodecCommander (based on alsa-tools hda-verb)
   usage: hda-verb [option] hwdep-device nid verb param
   -l      List known verbs and parameters
   -L      List known verbs and parameters (one per line)
```

|参数                            | 数值  |
|-------------------------------|-------|
|GET_STREAM_FORMAT              | 0x0a00|
|GET_AMP_GAIN_MUTE              | 0x0b00|
|GET_PROC_COEF                  | 0x0c00|
|GET_COEF_INDEX                 | 0x0d00|
|PARAMETERS                     | 0x0f00|
|GET_CONNECT_SEL                | 0x0f01|
|GET_CONNECT_LIST               | 0x0f02|
|GET_PROC_STATE                 | 0x0f03|
|GET_SDI_SELECT                 | 0x0f04|
|GET_POWER_STATE                | 0x0f05|
|GET_CONV                       | 0x0f06|
|GET_PIN_WIDGET_CONTROL         | 0x0f07|
|GET_UNSOLICITED_RESPONSE       | 0x0f08|
|GET_PIN_SENSE                  | 0x0f09|
|GET_BEEP_CONTROL               | 0x0f0a|
|GET_EAPD_BTLENABLE             | 0x0f0c|
|GET_DIGI_CONVERT_1             | 0x0f0d|
|GET_DIGI_CONVERT_2             | 0x0f0e|
|GET_VOLUME_KNOB_CONTROL        | 0x0f0f|
|GET_GPIO_DATA                  | 0x0f15|
|GET_GPIO_MASK                  | 0x0f16|
|GET_GPIO_DIRECTION             | 0x0f17|
|GET_GPIO_WAKE_MASK             | 0x0f18|
|GET_GPIO_UNSOLICITED_RSP_MASK  | 0x0f19|
|GET_GPIO_STICKY_MASK           | 0x0f1a|
|GET_CONFIG_DEFAULT             | 0x0f1c|
|GET_SUBSYSTEM_ID               | 0x0f20|
|SET_STREAM_FORMAT              | 0x200|
|SET_AMP_GAIN_MUTE              | 0x300|
|SET_PROC_COEF                  | 0x400|
|SET_COEF_INDEX                 | 0x500|
|SET_CONNECT_SEL                | 0x701|
|SET_PROC_STATE                 | 0x703|
|SET_SDI_SELECT                 | 0x704|
|SET_POWER_STATE                | 0x705|
|SET_CHANNEL_STREAMID           | 0x706|
|SET_PIN_WIDGET_CONTROL         | 0x707|
|SET_UNSOLICITED_ENABLE         | 0x708|
|SET_PIN_SENSE                  | 0x709|
|SET_BEEP_CONTROL               | 0x70a|
|SET_EAPD_BTLENABLE             | 0x70c|
|SET_DIGI_CONVERT_1             | 0x70d|
|SET_DIGI_CONVERT_2             | 0x70e|
|SET_VOLUME_KNOB_CONTROL        | 0x70f|
|SET_GPIO_DATA                  | 0x715|
|SET_GPIO_MASK                  | 0x716|
|SET_GPIO_DIRECTION             | 0x717|
|SET_GPIO_WAKE_MASK             | 0x718|
|SET_GPIO_UNSOLICITED_RSP_MASK  | 0x719|
|SET_GPIO_STICKY_MASK           | 0x71a|
|SET_CONFIG_DEFAULT_BYTES_0     | 0x71c|
|SET_CONFIG_DEFAULT_BYTES_1     | 0x71d|
|SET_CONFIG_DEFAULT_BYTES_2     | 0x71e|
|SET_CONFIG_DEFAULT_BYTES_3     | 0x71f|
|SET_CODEC_RESET                | 0x7ff|

已知参数：

|参数                            | 数值  |
|-------------------------------|-------|
|VENDOR_ID                  | 0x00|
|SUBSYSTEM_ID               | 0x01|
|REV_ID                     | 0x02|
|NODE_COUNT                 | 0x04|
|FUNCTION_TYPE              | 0x05|
|AUDIO_FG_CAP               | 0x08|
|AUDIO_WIDGET_CAP           | 0x09|
|PCM                        | 0x0a|
|STREAM                     | 0x0b|
|PIN_CAP                    | 0x0c|
|AMP_IN_CAP                 | 0x0d|
|CONNLIST_LEN               | 0x0e|
|POWER_STATE                | 0x0f|
|PROC_CAP                   | 0x10|
|GPIO_CAP                   | 0x11|
|AMP_OUT_CAP                | 0x12|
|VOL_KNB_CAP                | 0x13|


## 例子：
设置节点0x19参数为SET_PIN_WIDGET_CONTROL，值为0x24

```sh
$ hda-verb 0x19 SET_PIN_WIDGET_CONTROL 0x24

nid = 0x19, verb = 0x707, param = 0x24
command 0x01970724 --> result = 0x00000000
```
也可以写成：

```sh
$ hda-verb 0x19 0x707 0x24

nid = 0x19, verb = 0x707, param = 0x24
command 0x01970724 --> result = 0x00000000
```

CodecCommander经常使用的命令：

```sh
$ hda-verb 0x19 SET_PIN_WIDGET_CONTROL 0x25
$ hda-verb 0x21 SET_UNSOLICITED_ENABLE 0x83
```

## 备注：
> 字符串不区分大小写
> 此外，它不一定是完整的字符串，但只能是唯一的
> 例如 `par`和`PARAMETER`的参数是相同的
> `set_a`就足以代替`SET_AMP_GAIN_MUTE`

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)

