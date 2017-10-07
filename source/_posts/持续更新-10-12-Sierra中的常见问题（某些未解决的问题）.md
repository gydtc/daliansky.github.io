---
title: '[持续更新] 黑苹果常见问题（某些未解决的问题）'
urlname: Updated-Frequently-Asked-Questions-in-Sierra-or-high-sierra
date: 2017-09-07 09:32:15
tags:
- 10.12
- 10.13
- Sierra
- High Sierra
- 常见问题
- platform-id
- Clover
- Patch
- Lilu
- wake
- Plugins
categories:
- 教程
---

#### HD520/HD530/HD620/HD630显卡驱动的正确姿势
* 在CLOVER里注入platform-id，下表是整理出的部分资料供参考；更详细的资料请[移步](https://blog.daliansky.net/2017/08/31/Intel-core-display-platformID-finishing/#more)

| 显卡型号 | platform-id | 机型 | 接口 | LVDS | DP | HDMI |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Intel HD Graphics 520 | 0x19160000 |  | 3 | 1 | 2 |  |
| Intel HD Graphics 520 | 0x19160002 |  | 3 | 1 | 2 |  |
| Intel HD Graphics 530 | 0x19120000 | iMac17,1 | 3 |  | 3 |  |
| Intel HD Graphics 530 | 0x191b0000 | MacBookPro13,3 | 3 | 1 | 2 |  |
| Intel HD Graphics 530 | 0x191b0006 |  | 1 |  |  |  |
| Intel HD Graphics 620 | 0x59160000 | MacBookPro14,2 | 3 | 1 | 1 | 1 |
| Intel HD Graphics 630 | 0x59120000 | iMac18,2<br>iMac18,3 | 3 |  | 3 |  |
| Intel HD Graphics 630 | 0x591b0000 | MacBookPro14,3 | 3 | 1 | 1 | 1 |

* 还需要在`CLOVER/kexts/Other`放入[Lilu.kext](https://github.com/vit9696/Lilu/releases)和[IntelGraphicsFixup.kext](https://sourceforge.net/projects/intelgraphicsfixup/)，其它的基于`Lilu`的插件列表请稳步：[Lilu插件列表](https://blog.daliansky.net/2017/08/25/Existing-Lilu-Plugins/)
* 更多的`platform-id`请移步：[黑苹果必备：Intel核显platform ID整理](https://blog.daliansky.net/2017/08/31/Intel-core-display-platformID-finishing/#more)

#### `系统偏好设置`里的`触控板`设置是空白的
* 请更新`VoodooPS2Controller.kext`到1.8.25或以上版本，[VoodooPS2Controller.kext下载链接](https://github.com/RehabMan/OS-X-Voodoo-PS2-Controller)
 
#### HD4400 / HD4600在Safari浏览器播放视频崩溃
* 在`CLOVER/kexts/Other`放入[Lilu.kext](https://github.com/vit9696/Lilu/releases)和[IntelGraphicsFixup.kext](https://sourceforge.net/projects/intelgraphicsfixup/)
* 还有可能会需要[IntelGraphicsDVMTFixup](https://github.com/BarbaraPalvin/IntelGraphicsDVMTFixup)
![lilu+IntelGraphicsFixup](http://ous2s14vo.bkt.clouddn.com/lilu+IntelGraphicsFixup.png)

> 延伸阅读：其它的基于`Lilu`的插件列表请稳步：[Lilu插件列表](https://blog.daliansky.net/2017/08/25/Existing-Lilu-Plugins/)

#### Haswell（和Broadwell）在引导后不久（睡眠醒来后）滞后/暂停/无响应
* 登录后不久（有些在登录之前），鼠标和/或图形可能看起来没有反应。 这通常在大约20秒后清除。 从睡眠醒来后观察到相同的效果。
* 这似乎只影响了Haswell的图形硬件。
* 可能与SMBIOS的变化有关，当使用MacBookPro11,2与之前版本的OS X / macOS时，观察到类似的效果。 但现在的问题也出现在MacBookAir6,2和MacBookPro11,1上。
* 该解决方案似乎是从帧缓冲区kext中的ig-platform数据中删除未使用的连接器：

原文：

>   在我的u430与10.12.4上遭遇了这个问题（醒来后和登录后的短暂滞后）。u430具有LVDS和单个HDMI。
>   我使用ig-platform-id 0xa260006。 0xa260006具有LVDS，0105 DP，0204 DP。
>   HDMI连接到0204，所以我修补该端口的HDMI（启用HDMI音频）。 
>   我也使用vbo 9mb光标字节补丁
> 
```sh
Name:       com.apple.driver.AppleIntelFramebufferAzul
Comment:    0x0a260006 9MB cursor bytes, vbo
Find:       0600260a 01030303 00000002 00003001 00006000
Replace:    0600260a 01030303 00000002 00003001 00009000
```
> 
```sh
Name:       com.apple.driver.AppleIntelFramebufferAzul
Comment:    HDMI-audio, port 0204, 0x0a260005 0x0a260006
Find:       02040900 00040000 87000000
Replace:    02040900 00080000 87000000
```
> 现在，0105端口在帧缓冲区中的0204端口之前，但是我们不需要0105端口，因为它没有连接任何东西（并导致滞后），所以...策略是用0204替代0105，将端口数从3减少到2。
> 我们已经知道，在`AppleIntelFramebufferCapri`中，0x01660004只有一个LVDS连接器，所以我们可以查看该ig-platform-id数据的标题，以发现我们需要将Azul中的ig平台数据从3个端口减少到2个。
> `AppleIntelFramebufferCapri` 0x01660004:
>
```sh
04006601 01030101
```
> `AppleIntelFramebufferAzul` 0x0a260006:
>
```sh
0600260A 01030303
```
> 所以，最终有两个计数与连接器的数量有关，现在让我们来修改它们：
> 
```sh
Name:       com.apple.driver.AppleIntelFramebufferAzul
Comment:    0x0a260006 9MB光标字节(vbo)，仅2端口(RehabMan)
Find:       0600260a 01030303 00000002 00003001 00006000
Replace:    0600260a 01030202 00000002 00003001 00009000
```
> 
```sh
Name:       com.apple.driver.AppleIntelFramebufferAzul
Comment:    0x0a260006 关闭 0204 端口, 改变 0105 DP 端口为 0204 HDMI (RehabMan)
Find:       01050900 00040000 87000000 02040900 00040000 87000000
Replace:    02040900 00080000 87000000 FF000000 01000000 40000000
```
>结果：登录后睡眠不再滞后。

#### 解决10.13(High Sierra)/10.12(Sierra) Clover开机出现8个苹果
使用`Clover Configurator`打开`config.plist` - `Kernel and Kext Patches` - `KextsToPatch`，新添加：

```sh
Name:       IOGraphicsFamily
Comment:    10.12+-第二阶段花屏
Find:       01000075 25
Replace:    010000eb 25
MatchOS:    10.12.x
```

```sh
Name:       IOGraphicsFamily
Comment:    10.13+-第二阶段花屏
Find:       01000075 22
Replace:    010000eb 22
MatchOS:    10.13.x
```
另一种格式：

```xml
			<dict>
				<key>Comment</key>
				<string>10.12+-第二阶段花屏补丁</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<data>
				AQAAdSU=
				</data>
				<key>MatchOS</key>
				<string>10.12.x</string>
				<key>Name</key>
				<string>IOGraphicsFamily</string>
				<key>Replace</key>
				<data>
				AQAA6yU=
				</data>
			</dict>
			<dict>
				<key>Comment</key>
				<string>10.13+-第二阶段花屏补丁</string>
				<key>Disabled</key>
				<false/>
				<key>Find</key>
				<data>
				AQAAdSI=
				</data>
				<key>MatchOS</key>
				<string>10.13.x</string>
				<key>Name</key>
				<string>IOGraphicsFamily</string>
				<key>Replace</key>
				<data>
				AQAA6yI=
				</data>
			</dict>
```

### 未完待续

#### QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


