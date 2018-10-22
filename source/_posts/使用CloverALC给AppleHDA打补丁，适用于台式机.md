---
title: 使用CloverALC给AppleHDA打补丁，适用于台式机
date: 2017-11-07 21:35:16
urlname: Clover-Patched-Desktop-AppleHDA-Realtek-ALC-Audio
tags:
- Clover
- AppleHDA
categories:
---
- 教程

![sound](http://7.daliansky.net/sound.jpg)


# **使用 `CloverALC` 给 `AppleHDA` 打补丁， 适用于台式机**

> *原生支持 `AppleHDA`*

使用 `Clover` 为Realtek ALC芯片打补丁，这种方法可以启用macOS `AppleHDA` 板载音频，无论是否带有HDMI和DP音频。 该脚本添加了编解码器特定的布局和平台文件，并将二进制补丁和引脚配置数据注入到本地安装的 `AppleHDA.kext` 。

**版本: audio_cloverALC-1x0**

1. 简单: `.command`命令, 请看 `C.安装`
2. Bash: `.sh命令`, 请看 `D. 终端`

**更新列表**

* 9-26-17
    * 支持10.13, 支持ALC269/ALC283
    * 支持PikeralphaALC弃用的
* 12-14-15
    * audio_pikeralpha-110 (Clover版本的Piker Aplha AppleHDA8Series.sh)
* 11-8-15
    * Skylake/100系统更新，加入ALC1150/Audio ID: 3
* 7-19-15
    * ALC283更新 
* 6-15-15
    * 10.11 - El Capitan Realtek ALC AppleHDA.kext 初始支持

**A. 需求**

1.  macOS/Clover_v2696及以后版本
    1.  10.13/High Sierra, 关闭 SIP, 挂载 EFI
    2.  10.12/Sierra, 关闭 SIP, 挂载 EFI
    2.  10.11/El Capitan, 设置 boot flag: `rootless=0` 
    2.  10.10/Yosemite, 设置 boot flag: `kext-dev-mode=1`
    3.  10.9/Mavericks
    4.  10.8/Mountain Lionon
2.  原生的、未修改的 `AppleHDA.kext`
    1.  [Need native?](https://github.com/toleda/audio_ALC_guides/blob/master/Restore%20native%20AppleHDA%20%5BGuide%5D.pdf)
3.  支持Realtek板载的音频编解码器
    1.  [Unknown codec?](https://github.com/toleda/audio_ALC_guides/blob/master/Identify%20Audio%20Codec%20%5BGuide%5D.pdf)

**B. Realtek ALCxxx** (验证过的编解码器和音频ID)

1.  支持的编解码器 (* 不支持 audio_pikeralpha-110)
    1.  885
    4.  887
    5.  888
    6.  889
    7.  892
    8.  898
    9.  1150
    10. 1220

2.  支持的音频ID
    -  音频ID: **1** 
        -  支持 885, 887, 888, 889, 892, 898, 1150, 1220
        -  Realtek ALC audio (默认, 1/2/3/5/6 主板音频端口)

    -  音频ID: **2**
        - 支持 887, 888, 889, 892, 898, 1150, 1220
        - Realtek ALC/5.1声道 (3主板音频端口，2进/1出变成3出)

    -  音频ID: **3**
        - 支持 887, 888, 889, 892, 898, 1150
        - 带有Realtek ALC音频的HD3000 / HD4000 HDMI音频

**C. 安装**

1.  通过 `Clover` 为 `AppleHDA` 打补丁
    1.  [下载](https://github.com/toleda/audio_CloverALC) `audio_cloverALC-1x0.command`
    2.  双击: `audio_cloverALC-1x0.command`
    3.  Password:
    4.  Confirm Codec ALCxxx: (885, 887, 888, 889, 892, 898, 1150, 1220 only)
    5.  Clover/Legacy: answer y to Confirm Clover Legacy Install (y/n)
    6.  Clover Audio ID Injection (y/n):
    7.  Use Audio ID: x (y/n):
    8.  Optional: Terminal/Terminal Saved Output
2.  重启电脑
3.  验证ALC板载音频
    1. 系统偏好设置/声音/输出/选择音频设备

**D. 终端**

1.  通过 `Clover` 为 `AppleHDA` 打补丁

    1. [下载](https://github.com/toleda/audio_CloverALC)   `audio_cloverALC-1x0.sh`
    2. 打开终端
    
        ```sh
         ./audio_cloverALC-1x0....sh
        ```
    3. 其它步骤同 `C.`

**E. 更多的信息**

1. [Details](https://github.com/toleda/audio_RealtekALC/blob/master/DETAILS.md)
    1.  Onboard Audio Solutions
    2.  Requirements - Supported/Unsupported
    3.  Notes
    4.  Guides
    5.  Tools
    6.  Problem Reporting
2. Terminal Saved Output
    1.  [Clover/EFI](https://github.com/toleda/audio_CloverALC/blob/master/Terminal%20Saved%20Output_v1.0.4-efi.txt)
    2.  [Clover/Legacy](https://github.com/toleda/audio_CloverALC/blob/master/Terminal%20Saved%20Output_v1.0.4-leg.txt)

**Credit**
THe KiNG, bcc9, RevoGirl, PikeRAlpha, SJ\_UnderWater, RehabMan, TimeWalker75a, lisai9093, [abxite](http://applelife.ru/threads/patchim-applehda-s-pomoschju-zagruzchika.39406/#post-353647)

toleda https://github.com/toleda/audio_cloverALC

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！


