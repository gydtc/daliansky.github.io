---
title: Lilu插件列表[持续更新]
urlname: Existing-Lilu-Plugins
date: 2017-08-25 16:45:19
categories:
- 插件
tags:
- Lilu
- Plugins
- 插件
---
# Lilu插件列表[持续更新]

本文部分翻译自 [Lilu的README](https://github.com/vit9696/Lilu/blob/master/README.md)，一些部分基于楼主的理解写出。

## 什么是 Lilu ？
> Lilu 是 vit9696 开发的一个内核扩展 (kext)，可对"任意" 内核扩展(kext)/进程(process)/运行库(framework/library)等 进行打补丁。(但其实某些比较底层的 kext 仍无法修改，如基本硬件驱动、底层重要依赖等)

## Lilu 目前实现的功能？
>为 kext 打补丁
为 进程 打补丁    (目前仅支持 64 位)
为 运行库 打补丁 (目前仅支持 64 位)
提供一套统一的 API 接口

## 如何理解 "提供一套统一的 API 接口"？
这意味着 Lilu 自身是不起任何作用的，你需要额外使用依赖它的 kext ，目前已知需要依赖 Lilu 的 kext 可在 下方 找到。


## 下载/安装
### 关于下载：
你可以[直接下载](https://github.com/vit9696/Lilu/releases)作者编译好的版本，或者从 [GitHub](https://github.com/vit9696/Lilu/) 下载源码自行编译。
### 关于安装：
* 建议将 Lilu 以及依赖它的 kext 放置于引导器用于注入 kext 的位置并使用引导器注入它，目前主流的引导器都有注入 kext 的功能。
* 如果将其放置于 `/System/Library/Extensions` 或者 `/Library/Extensions` 下的话，你还需要 `LiluFriend` 并正确配置使其正常工作。

## Lilu 支持的内核参数(kernel flags)
`-liludbg` 可以开启排错日志模式，不过只有 DEBUG 版本才可用。(对于日常使用的 RELEASE 版本此参数无效)
`-liluoff` 会禁用 Lilu 和依赖它的 kext 。(实际上只禁用了 Lilu ，不过与之相关的 kext 也就自然会失效了)
`-liluslow` 会启用旧版的 UserPatcher 。(可能与修改进程、运行库有关，具体的因为楼主对 Lilu 代码不是很熟悉，所以也就没法解释清楚了，抱歉)
`-lilulowmem` 会禁止 Lilu 和依赖它的 kext 在 Recovery 模式下载入。(实际上只禁用了 Lilu ，不过与之相关的 kext 也就自然会失效了)
`-lilubeta` 会在不受支持的 Darwin 版本启用 Lilu 。
`-lilubetaall` 启用Lilu和所有加载的插件不受支持的os版本（非常仔细地使用）
`-liluforce` 强制启用Lilu而不管os，该参数适用于安装或恢复。
## 致开发者/有兴趣的朋友：
关于 Log 输出，目前 Lilu 提供的 API 中有两个输出 Log 的接口，分别为 SYSLOG("msg\n"); 与 DBGLOG("msg\n"); 这两个 macro ，具体输出原理这里不做过多解释，仍是调用 Apple 在 IOLib.h 中为我们提供的 IOLog 接口。
但要特别注意的是，如上所说，DBGLOG("msg\n"); 这个 macro 需要在 DEBUG 模式开启下才会被编译。
相信各位看这段代码即可了解。;) (来自 Headers/kern_util.hpp)

```bash
#define SYSLOG(str, ...) IOLog( xStringify(PRODUCT_NAME) ": " str "\n", ## __VA_ARGS__)

#ifdef DEBUG
#define DBGLOG(str, ...)                                                                                                                                \
        do {                                                                                                                                                                \
                if (ADDPR(debugEnabled))                                                                                \
                        IOLog( xStringify(PRODUCT_NAME) ": (DEBUG) " str "\n", ## __VA_ARGS__);                \
        } while(0)
#else
#define DBGLOG(str, ...) do { } while(0)
#endif
```
另外，原宏中已经自带了换行符 \n ，所以在编写 Log 时也就无必要再换行了。


## Bug 反馈
建议在作者的 [GitHub Issues](https://github.com/vit9696/Lilu/issues) 中提交，需使用英文。

# Lilu插件列表

此插件列表来自 Lilu 的 [KnownPlugins.md](https://github.com/vit9696/Lilu/blob/master/KnownPlugins.md) 。

目前已知需依赖 Lilu 的 kext & 作用简单说明
注：某些 kext 可能还没有列在这里，如果你有发现的话，可以跟帖反馈。

| Name | Short description |
|:-----|:------------------|
|[AirportBrcmFixup](https://sourceforge.net/p/airportbrcmfixup/) | 修补 Broadcom Wi-Fi 综合问题|
|[AppleALC](https://github.com/vit9696/AppleALC) | 动态对系统注入必要的文件/打补丁以驱动声卡|
|[AzulPatcher4600](https://github.com/coderobe/AzulPatcher4600) | 一些针对某些笔记型 HD4600 的额外修复|
|[CoreDisplayFixup](https://github.com/PMheart/CoreDisplayFixup) | 动态修改某些系统运行库/kext 以解决非 Iris 系列 Intel 核显/部分 N 卡高分辨率输出问题|
|[CPUFriend](https://github.com/PMheart/CPUFriend) | 动态向 X86 注入 CPU 电源管理数据|
|[EnableLidWake](https://github.com/syscl/EnableLidWake) | 为某些 Intel 核显开启合盖睡眠|
|[HibernationFixup](https://sourceforge.net/p/hibernationfixup) | 在某些机器上修复 3/25 模式下的休眠状态|
|[IntelGraphicsFixup](https://sourceforge.net/p/intelgraphicsfixup) | 修补 Intel 核显综合问题 (开机花屏，Haswell/Skylake 因 PAVP 导致的死机等等)|
|[IntelGraphicsDVMTFixup](https://github.com/BarbaraPalvin/IntelGraphicsDVMTFixup) | 修正 Broadwell/Skylake 平台核显因 DVMT 不足而导致的死机|
|[NightShiftUnlocker](https://github.com/Austere-J/NightShiftUnlocker) | 解决老机型无法使用自 10.12.4 开始引入的 NightShift 功能|
|[NvidiaGraphicsFixup](https://sourceforge.net/p/nvidiagraphicsfixup) | 修正 N 卡 (可能也适用于 I 卡) 使用某些 SMBios 如 MacPro6,1 等引发黑屏的问题|
|[Shiki](https://github.com/vit9696/Shiki) | 动态修改 iTunes 相关系统进程，以在 Ivy Bridge 或更新的平台上正确使用 iTunes 相关服务，同时其内置的 ResourceConverter 亦可配置一些自定义的针对其他 framework/lib/process 的补丁 ([CoreDisplayFixup](https://github.com/PMheart/CoreDisplayFixup) 的早期测试版本即基于 [Shiki](https://github.com/vit9696/Shiki) 编写)|
|[WhateverGreen](https://github.com/vit9696/WhateverGreen) | 修补 AMD 独显综合问题 （单卡启动黑屏，唤醒黑屏 等等）|


将功能合并到其他插件中的插件：

| Name | Short description |
|:-----|:------------------|
|[BrcmWLFixup](https://github.com/PMheart/BrcmWLFixup) | 现已被 [AirportBrcmFixup](https://sourceforge.net/p/airportbrcmfixup/) 取代。|



## 原文链接：[口袋妖怪heart](http://bbs.pcbeta.com/forum.php?mod=viewthread&tid=1741470&page=1#pid47122622)
## 扩展阅读：
[AppleALC支持的Codecs列表及AppleALC的使用](https://blog.daliansky.net/AppleALC-Supported-codecs.html)

# 关于打赏

您的支持就是我更新的动力！
如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起吃苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)[群已满,请加下面群]
688324116[一起黑苹果](https://shang.qq.com/wpa/qunwpa?idkey=6bf69a6f4b983dce94ab42e439f02195dfd19a1601522c10ad41f4df97e0da82)



