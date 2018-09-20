---
title: 一条命令教你如何确认自己的机型及如何开启HWP
date: 2017-10-26 20:59:39
urlname: A-command-to-teach-you-how-to-confirm-their-own-models-and-how-to-open-the-HWP
tags:
- HWP
- 教程
- 机型
- 变频
- CPU
categories:
- 教程
---

> HWP是什么？HWP是Hardware Work Package的简称，翻译过来叫做：硬件标准部件
> 在macOS下,HWP是指Intel SpeedShift，开启全功率的电源管理，更多的解释请参阅[原文](http://www.insanelymac.com/forum/topic/321021-guide-hwpintel-speed-shift-enable-with-full-power-management/)

## 用到的工具： `freqVectorsEdit.sh`
## 用法：
* 打开终端，复制下面命令：
`cd /tmp && curl -s https://raw.githubusercontent.com/Piker-Alpha/freqVectorsEdit.sh/master/freqVectorsEdit.sh > /tmp/freqVectorsEdit.sh && chmod +x freqVectorsEdit.sh && /tmp/freqVectorsEdit.sh && sudo rm -rf /tmp/freqVectorsEdit.sh && sudo rm -rf /tmp/Mac-*.bin`
    
* **注意上面的命令为一条，须全部复制**
* 系统会使用 `curl` 自动下载一个程序，保存到 `/tmp` ,之后自动执行，期间需要你输入自己的用户密码，程序执行完后会自动清除临时文件；
* 屏幕会输出40个机型，其中亮白加粗为你当时设置的机型，带 `绿色` 显示的那三行前面括号里的机型为可选机型，带 `HWP` 字样的为可以开启 `HWPEnable`
    ![HWP](http://7.daliansky.net/HWP.png)
* 输入方括号里面的数字并回车，可以修改相对应的机型，同时开启 `HWP`
* 本文不讨论开启 `HWP` 的步骤及用法，更多的信息请参阅其它文章
   

## 收工

# 关于打赏
您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起吃苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)[群已满,请加下面群]
688324116[一起黑苹果](https://shang.qq.com/wpa/qunwpa?idkey=6bf69a6f4b983dce94ab42e439f02195dfd19a1601522c10ad41f4df97e0da82)

