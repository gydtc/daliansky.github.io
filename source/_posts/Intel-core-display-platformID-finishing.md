---
title: 黑苹果必备：Intel核显platform ID整理
urlname: Intel-core-display-platformID-finishing
date: 2017-08-31 21:13:07
categories:
- 教程
tags:
- platform
- Intel
- 核显
- 
---

# 黑苹果必备：Intel核显platform ID整理
## 本文的由来
> 经常有网友进群问某某机型需要注入哪个`platform-id`才能正确地驱动显卡，每到这个时候，我都需要翻出`Clover`自带的`gma.c`查找显卡参数。于是我就想把它整理出来方便大家查询，`markdown`的表格排版对我来说是一种考验，但更像是一种折磨。还好还好，它没花费我太长的时间。

-------


## sandy bridge平台
| 显卡型号 | platform-id | 机型 | 接口 | LVDS | DP | HDMI |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Intel HD Graphics 3000 | 0x00010000 | MacBookPro8,1 | 4 | 1 | 3 |  |
| Intel HD Graphics 3000 | 0x00020000 | MacBookPro8,3 | 3 | 1 | 2 |  |
| Intel HD Graphics 3000 | 0x00030010 | Macmini5,1 | 3 |  | 2 | 1 |
| Intel HD Graphics 3000 | 0x00030020 | Macmini5,2 | 4 |  | 3 | 1 |
| Intel HD Graphics 3000 | 0x00040000 | MacBookAir4,1 | 3 | 1 | 2 |  |
```js
UINT8 sandy_bridge_hd_vals[13][4] = {
  { 0x04, 0x00, 0x00, 0x00 },	  //0 "graphic-options"
  { 0x00, 0x00, 0x00, 0x00 },	  //1 "AAPL00,DataJustify"
  { 0x00, 0x00, 0x00, 0x00 },	  //2 "AAPL00,Dither"
  { 0x00, 0x00, 0x00, 0x00 },	  //3 "AAPL00,LinkFormat"
  { 0x00, 0x00, 0x00, 0x00 },	  //4 "AAPL00,LinkType"
  { 0x00, 0x00, 0x00, 0x00 },	  //5 "AAPL00,PixelFormat"
  { 0x00, 0x00, 0x00, 0x00 },	  //6 "AAPL00,T1"
  { 0x14, 0x00, 0x00, 0x00 },	  //7 "AAPL00,T2"
  { 0xfa, 0x00, 0x00, 0x00 },	  //8 "AAPL00,T3"
  { 0x2c, 0x01, 0x00, 0x00 },	  //9 "AAPL00,T4"
  { 0x00, 0x00, 0x00, 0x00 },	  //10 "AAPL00,T5"
  { 0x14, 0x00, 0x00, 0x00 },	  //11 "AAPL00,T6"
  { 0xf4, 0x01, 0x00, 0x00 },	  //12 "AAPL00,T7"
};
```

## ivy bridge平台

| 型号 | platform-id | 机型 | 接口 |LVDS | DP | HDMI |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Intel HD Graphics 4000 | 0x01660000 | |4 | 1 | 3 |  |
| Intel HD Graphics 4000 | 0x01660001 | MacBookPro10,2 |4 | 1 | 2 | 1 |
| Intel HD Graphics 4000 | 0x01660002 | MacBookPro10,1| 1| 1 |  |  |
| Intel HD Graphics 4000 | 0x01660003 | MacBookPro9,2|4 | 1 | 3 |  |
| Intel HD Graphics 4000 | 0x01660004 | MacBookPro9,1|1 | 1 |  |  |
| Intel HD Graphics 4000 | 0x01660005 | | 3|  | 3 |  |
| Intel HD Graphics 4000 | 0x01660006 | iMac13,1 | 0|  |  |  |
| Intel HD Graphics 4000 | 0x01660007 | iMac13,2| 0|  |  |  |
| Intel HD Graphics 4000 | 0x01660008 | MacBookAir5,1|3 |1  | 2 |  |
| Intel HD Graphics 4000 | 0x01660009 | MacBookAir5,2|3| 1 |2  |  |
| Intel HD Graphics 4000 | 0x0166000a | Macmini6,1| 3|  |2  | 1 |
| Intel HD Graphics 4000 | 0x0166000b | Macmini6,2| 3|  | 2 | 1 |
```js
UINT8 ivy_bridge_hd_vals[1][4] = {
  { 0x0c, 0x00, 0x00, 0x00 },	  //0 "graphics-options"
};
```

## haswell平台

| 显卡型号 | platform-id | 机型 | 接口 | LVDS | DP | eDP | HDMI |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|  | 0x04060000 |  | 3 | 1 |  | 1 | 1 |
|  | 0x0c060000 |  | 3 | 1 |  | 1 | 1 |
| Intel HD Graphics 4600 | 0x04160000 |  | 3 | 1 |  | 1 | 1 |
| Intel HD Graphics 4400 | 0x0a160000 |  | 3 | 1 |  | 1 | 1 |
|  | 0x0c160000 |  | 3 | 1 |  | 1 | 1 |
| Intel HD Graphics 5000 | 0x04260000 |  | 3 | 1 |  | 1 | 1 |
| Intel HD Graphics 5000 | 0x0a260000 |  | 3 | 1 |  | 1 | 1 |
|  | 0x0c260000 |  | 3 | 1 |  | 1 | 1 |
| Intel Iris Pro Graphics 5200 | 0x0d260000 |  | 3 | 1 |  | 1 | 1 |
|   | 0x0d220003 | iMac14,1<br> iMac14,4 | 3 | 1 | 2 |  |  |
| Intel HD Graphics 4600 | 0x04120004 |  |  |  |  |  |  |
| Intel HD Graphics 5000 | 0x0a260005 |  | 3 | 1 | 2 |  |  |
| Intel HD Graphics 5000 | 0x0a260006 |MacBookAir6,1<br>MacBookAir6,2<br>Macmini7,1 | 3 | 1 | 2 |  |  |
| Intel Iris Pro Graphics 5200 | 0x0d260007 | MacBookPro11,2<br> MacBookPro11,3 | 4 | 1 | 2 |  | 1 |
| Intel Iris Graphics 5100 | 0x0a2e0008 | MacBookPro11,1 | 3 | 1 | 2 |  |  |


```js
UINT8 haswell_hd_vals[1][4] = {
  { 0x0c, 0x00, 0x00, 0x00 },	  //0 "graphics-options"
};
```

## broadwell平台

| 显卡型号 | platform-id | 机型 | 接口  | LVDS  | DP | eDP | HDMI |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|  |  |  |  |  |  |  |  |
|  | 0x16060000 |  | 3 | 1 |  | 1 | 1 |
|  | 0x160e0001 |  | 3 | 1 | 2 |  |  |
| Intel HD Graphics 5500 | 0x16160000 |  | 3 | 1 |  | 1 | 1 |
| Intel HD Graphics 5300 | 0x161e0000 |  | 3 | 1 |  | 1 | 1 |
| Intel Iris Pro Graphics 6200 | 0x16220000 |  | 3 | 1 |  | 1 | 1 |
| Intel HD Graphics 6000 | 0x16260000 |  | 3 | 1 |  | 1 | 1 |
| Intel Iris Graphics 6100 | 0x162b0000 |  | 3 | 1 |  | 1 | 1 |
| Intel HD Graphics 5300 | 0x161e0001 | MacBook8,1 | 3 | 1 | 2 |  |  |
|  | 0x16060002 |  | 3 | 1 | 2 |  |  |
| Intel HD Graphics 5500 | 0x16160002 |  | 3 | 1 | 2 |  |  |
| Intel Iris Pro Graphics 6200 | 0x16220002 |  | 3 | 1 | 2 |  |  |
| Intel HD Graphics 6000 | 0x16260002 |  | 3 | 1 | 2 |  |  |
| Intel Iris Graphics 6100 | 0x162b0002 | MacBookPro12,1 | 3 | 1 | 2 |  |  |
| Intel HD Graphics 5600 | 0x16120003 |  | 3 | 1 | 2 |  |  |
| Intel HD Graphics 6000 | 0x16260004 |  | 3 | 1 | 2 |  |  |
| Intel Iris Graphics 6100 | 0x162b0004 |  | 3 | 1 | 2 |  |  |
| Intel HD Graphics 6000 | 0x16260005 |  | 3 | 1 | 2 |  |  |
| Intel HD Graphics 6000 | 0x16260006 | iMac16,1<br>MacBookAir7,1<br>MacBookAir7,2 | 3 | 1 | 2 |  |  |
| Intel Iris Pro Graphics6200 | 0x16220007 | iMac16,2 | 3 | 1 | 2 |  |  |
| Intel HD Graphics 6000 | 0x16200008 |  | 2 | 1 | 1 |  |  |
| Intel Iris Graphics 6100 | 0x162b0008 |  | 3 | 1 | 2 |  |  |


```js
UINT8 broadwell_hd_vals[2][4] = {
  { 0x0c, 0x00, 0x00, 0x00 },	  //0 "graphics-options"
  { 0x0c, 0x00, 0x00, 0x00 },	  //1 "AAPL,ig-tcon-scaler"
};
```

## skylake平台

| 显卡型号 | platform-id | 机型 | 接口 | LVDS | DP | HDMI |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Intel HD Graphics 530 | 0x19120000 | iMac17,1 | 3 |  | 3 |  |
| Intel HD Graphics 520 | 0x19160000 |  | 3 | 1 | 2 |  |
| Intel Iris Graphics 540 | 0x19260000 |  | 3 | 1 | 2 |  |
| Intel Iris Graphics 550 | 0x19270000 |  | 3 | 1 | 2 |  |
| Intel HD Graphics 530 | 0x191b0000 | MacBookPro13,3 | 3 | 1 | 2 |  |
| Intel HD Graphics 515 | 0x191e0000 |   | 3 | 1 | 2 |  |
| Intel Iris Pro Graphics 580 | 0x193b0000 |  | 3 | 1 | 1 | 1 |
| Intel HD Graphics 520 | 0x19160002 |  | 3 | 1 | 2 |  |
| Intel Iris Graphics 540 | 0x19260002 | MacBookPro13,1 | 3 | 1 | 2 |  |
| Intel HD Graphics 515 | 0x191e0003 | MacBook9,1 | 3 | 1 | 2 |  |
| Intel Iris Graphics 540 | 0x19260004 |  | 3 | 1 | 2 |  |
| Intel Iris Graphics 550 | 0x19270004 | MacBookPro13,2 | 3 | 1 | 2 |  |
| Intel HD Graphics 530 | 0x191b0006 |  | 1 |  |  |  |
| Intel Iris Graphics 540 | 0x19260007 |  | 3 | 1 | 2 |  |


```js
UINT8 skylake_hd_vals[8][4] = {
  { 0x0c, 0x00, 0x00, 0x00 },	  //0 "graphic-options"
  { 0x01, 0x00, 0x00, 0x00 },	  //1 "AAPL,Gfx324"
  { 0x01, 0x00, 0x00, 0x00 },	  //2 "AAPL,GfxYTile"
  { 0xfa, 0x00, 0x00, 0x00 },	  //3 "AAPL00,PanelCycleDelay"
  { 0x3c, 0x00, 0x00, 0x08 },	  //4 "AAPL00,PanelPowerDown"
  { 0x11, 0x00, 0x00, 0x00 },	  //5 "AAPL00,PanelPowerOff"
  { 0x19, 0x01, 0x00, 0x08 },	  //6 "AAPL00,PanelPowerOn"
  { 0x30, 0x00, 0x00, 0x00 },	  //7 "AAPL00,PanelPowerUp"
};
```

## kabylake平台


| 显卡型号 | platform-id | 机型 | 接口 | LVDS | DP | HDMI |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Intel HD Graphics 630 | 0x59120000 | iMac18,2<br>iMac18,3 | 3 |  | 3 |  |
| Intel HD Graphics 620 | 0x59160000 | MacBookPro14,2 | 3 | 1 | 1 | 1 |
| Intel Iris Plus Graphics 640 | 0x59260000 |  | 3 | 1 | 2 |  |
| Intel Iris Plus Graphics 650 | 0x59270000 |  | 3 | 1 | 2 |  |
| Intel HD Graphics 630 | 0x591b0000 | MacBookPro14,3 | 3 | 1 | 1 | 1 |
| Intel HD Graphics 615 | 0x591e0000 |  | 3 | 1 | 2 |  |
| Intel HD Graphics 635 | 0x59230000 |  | 3 | 1 | 2 |  |
| Intel HD Graphics 615 | 0x591e0001 | MacBook10,1 | 3 | 1 | 2 |  |
| Intel Iris Plus Graphics 640 | 0x59260002 | MacBookPro14,1<br>iMac18,1 | 3 | 1 | 2 |  |
| Intel Iris Plus Graphics 650 | 0x59270004 | MacBookPro14,2 | 3 | 1 | 2 |  |
| Intel Iris Plus Graphics 640 | 0x59260007 |   | 3 | 1 | 2 |  |
| Intel Iris Graphics 650 | 0x59270009 |  | 3 | 1 | 2 |  |


```js
UINT8 kabylake_hd_vals[8][4] = {
  { 0x0c, 0x00, 0x00, 0x00 },	  //0 "graphic-options"
  { 0x01, 0x00, 0x00, 0x00 },	  //1 "AAPL,Gfx324"
  { 0x01, 0x00, 0x00, 0x00 },	  //2 "AAPL,GfxYTile"
  { 0xfa, 0x00, 0x00, 0x00 },	  //3 "AAPL00,PanelCycleDelay"
  { 0x3c, 0x00, 0x00, 0x08 },	  //4 "AAPL00,PanelPowerDown"
  { 0x11, 0x00, 0x00, 0x00 },	  //5 "AAPL00,PanelPowerOff"
  { 0x19, 0x01, 0x00, 0x08 },	  //6 "AAPL00,PanelPowerOn"
  { 0x30, 0x00, 0x00, 0x00 },	  //7 "AAPL00,PanelPowerUp"
};
```

## 新增平台

| 显卡型号 | platform-id | 机型 | 接口 | LVDS | DP | HDMI |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Intel UHD Graphics 620 | 0x59170000 | Mobile | | | | |
| Intel UHD Graphics 610 | 0x3e900000 | Desktop | | | | |
| Intel UHD Graphics 610 | 0x3e930000 | Desktop | | | | |
| Intel UHD Graphics 630 | 0x3e910000 | Desktop | | | | |
| Intel UHD Graphics 630 | 0x3e920000 | Desktop | | | | |


## 已知GPU的列表
```js
static struct gma_gpu_t KnownGPUS[] = {

  //============== PowerVR ===================
  //--------Canmore/Sodaville/Groveland-------
  { 0x2E5B, "Intel 500"                      }, //

  //----------------Poulsbo-------------------
  { 0x8108, "Intel 500"                      }, // Menlow
  { 0x8109, "Intel 500"                      }, // Menlow

  //----------------Lincroft------------------
  { 0x4102, "Intel 600"                      }, // Moorestown

  //----------------Cedarview-----------------
  { 0x0BE0, "Intel GMA 3600"                 }, // Cedar Trail
  { 0x0BE1, "Intel GMA 3600"                 }, // Cedar Trail
  { 0x0BE2, "Intel GMA 3650"                 }, // Cedar Trail
  { 0x0BE3, "Intel GMA 3650"                 }, // Cedar Trail

  //----------------Cloverview----------------
  { 0x08C7, "Intel GMA"                      }, // Clover Trail
  { 0x08C8, "Intel GMA"                      }, // Clover Trail
  { 0x08C9, "Intel GMA"                      }, // Clover Trail
  { 0x08CA, "Intel GMA"                      }, // Clover Trail
  { 0x08CB, "Intel GMA"                      }, // Clover Trail
  { 0x08CC, "Intel GMA"                      }, // Clover Trail
  { 0x08CD, "Intel GMA"                      }, // Clover Trail
  { 0x08CE, "Intel GMA"                      }, // Clover Trail
  { 0x08CF, "Intel GMA"                      }, // Clover Trail


  //============== 1st generation ============
  //----------------Auburn--------------------
  { 0x7800, "Intel 740"                      }, // Desktop - Intel 740 GMCH Express Chipset Family

  //----------------Portola-------------------
  { 0x1240, "Intel 752"                      }, // Desktop - Intel 752 GMCH Express Chipset Family

  //----------------Whitney-------------------
  { 0x7121, "Intel 3D graphics 810"          }, // Desktop - Intel 810 GMCH Express Chipset Family
  { 0x7123, "Intel 3D graphics 810"          }, // Desktop - Intel 810-DC100 GMCH Express Chipset Family
  { 0x7125, "Intel 3D graphics 810"          }, // Desktop - Intel 810E GMCH Express Chipset Family

  //----------------Solano--------------------
  { 0x1132, "Intel 3D graphics 815"          }, // Desktop - Intel 815 GMCH Express Chipset Family


  //============== 2nd generation ============
  //----------------Almador-------------------
  { 0x3577, "Intel Extreme Graphics 830"     }, // Mobile - Intel 830M GMCH Express Chipset Family
  { 0x357B, "Intel Extreme Graphics 835"     }, // Desktop - Intel 835G GMCH Express Chipset Family

  //----------------Brookdale-----------------
  { 0x2562, "Intel Extreme Graphics 845"     }, // Desktop - Intel 845G GMCH Express Chipset Family

  //----------------Montara-------------------
  { 0x358E, "Intel Extreme Graphics 2 854"   }, // Mobile - Intel 852GM/855GM GMCH Express Chipset Family
  { 0x3582, "Intel Extreme Graphics 2 855"   }, // Mobile - Intel 852GM/855GM GMCH Express Chipset Family

  //----------------Springdale----------------
  { 0x2572, "Intel Extreme Graphics 2 865"   }, // Desktop - Intel 865G Express Chipset Family


  //============== 3rd generation ============
  //----------------Grantsdale----------------
  { 0x2582, "Intel GMA 900"                  }, // Desktop - Intel 915G Express Chipset Family
  { 0x258A, "Intel GMA 900"                  }, // Desktop - Intel 915GM Express Chipset Family
  { 0x2782, "Intel GMA 900"                  }, // Desktop - Intel 915GV Express Chipset Family

  //----------------Alviso--------------------
  { 0x2592, "Intel GMA 900"                  }, // Mobile - Intel 82915GM/GMS, 910GML Express Chipset Family
  { 0x2792, "Intel GMA 900"                  }, // Mobile - Intel 82915GM/GMS, 910GML Express Chipset Family

  //----------------Lakeport------------------
  { 0x2772, "Intel GMA 950"                  }, // Desktop - Intel 82945G Express Chipset Family
  { 0x2776, "Intel GMA 950"                  }, // Desktop - Intel 82945G Express Chipset Family

  //----------------Calistoga-----------------
  { 0x27A2, "Intel GMA 950"                  }, // Mobile - Intel 945GM Express Chipset Family - MacBook1,1, MacBook2,1
  { 0x27A6, "Intel GMA 950"                  }, // Mobile - Intel 945GM Express Chipset Family
  { 0x27AE, "Intel GMA 950"                  }, // Mobile - Intel 945GM Express Chipset Family

  //----------------Bearlake------------------
  { 0x29B2, "Intel GMA 3100"                 }, // Desktop - Intel Q35 Express Chipset Family
  { 0x29B3, "Intel GMA 3100"                 }, // Desktop - Intel Q35 Express Chipset Family
  { 0x29C2, "Intel GMA 3100"                 }, // Desktop - Intel G33/G31 Express Chipset Family
  { 0x29C3, "Intel GMA 3100"                 }, // Desktop - Intel G33/G31 Express Chipset Family
  { 0x29D2, "Intel GMA 3100"                 }, // Desktop - Intel Q33 Express Chipset Family
  { 0x29D3, "Intel GMA 3100"                 }, // Desktop - Intel Q33 Express Chipset Family

  //----------------Pineview------------------
  { 0xA001, "Intel GMA 3150"                 }, // Nettop - Intel NetTop Atom D410
  { 0xA002, "Intel GMA 3150"                 }, // Nettop - Intel NetTop Atom D510
  { 0xA011, "Intel GMA 3150"                 }, // Netbook - Intel NetBook Atom N4x0
  { 0xA012, "Intel GMA 3150"                 }, // Netbook - Intel NetBook Atom N4x0


  //============== 4th generation ============
  //----------------Lakeport------------------
  { 0x2972, "Intel GMA 3000"                 }, // Desktop - Intel 946GZ Express Chipset Family
  { 0x2973, "Intel GMA 3000"                 }, // Desktop - Intel 946GZ Express Chipset Family

  //----------------Broadwater----------------
  { 0x2992, "Intel GMA 3000"                 }, // Desktop - Intel Q965/Q963 Express Chipset Family
  { 0x2993, "Intel GMA 3000"                 }, // Desktop - Intel Q965/Q963 Express Chipset Family
  { 0x29A2, "Intel GMA X3000"                }, // Desktop - Intel G965 Express Chipset Family
  { 0x29A3, "Intel GMA X3000"                }, // Desktop - Intel G965 Express Chipset Family

  //----------------Crestline-----------------
  { 0x2A02, "Intel GMA X3100"                }, // Mobile - Intel 965 Express Chipset Family - MacBook3,1, MacBook4,1, MacbookAir1,1
  { 0x2A03, "Intel GMA X3100"                }, // Mobile - Intel 965 Express Chipset Family
  { 0x2A12, "Intel GMA X3100"                }, // Mobile - Intel 965 Express Chipset Family
  { 0x2A13, "Intel GMA X3100"                }, // Mobile - Intel 965 Express Chipset Family

  //----------------Bearlake------------------
  { 0x2982, "Intel GMA X3500"                }, // Desktop - Intel G35 Express Chipset Family
  { 0x2983, "Intel GMA X3500"                }, // Desktop - Intel G35 Express Chipset Family

  //----------------Eaglelake-----------------
  { 0x2E02, "Intel GMA 4500"                 }, // Desktop - Intel 4 Series Express Chipset Family
  { 0x2E03, "Intel GMA 4500"                 }, // Desktop - Intel 4 Series Express Chipset Family
  { 0x2E12, "Intel GMA 4500"                 }, // Desktop - Intel G45/G43 Express Chipset Family
  { 0x2E13, "Intel GMA 4500"                 }, // Desktop - Intel G45/G43 Express Chipset Family
  { 0x2E42, "Intel GMA 4500"                 }, // Desktop - Intel B43 Express Chipset Family
  { 0x2E43, "Intel GMA 4500"                 }, // Desktop - Intel B43 Express Chipset Family
  { 0x2E92, "Intel GMA 4500"                 }, // Desktop - Intel B43 Express Chipset Family
  { 0x2E93, "Intel GMA 4500"                 }, // Desktop - Intel B43 Express Chipset Family
  { 0x2E32, "Intel GMA X4500"                }, // Desktop - Intel G45/G43 Express Chipset Family
  { 0x2E33, "Intel GMA X4500"                }, // Desktop - Intel G45/G43 Express Chipset Family
  { 0x2E22, "Intel GMA X4500"                }, // Mobile - Intel G45/G43 Express Chipset Family
  { 0x2E23, "Intel GMA X4500HD"              }, // Mobile - Intel G45/G43 Express Chipset Family

  //----------------Cantiga-------------------
  { 0x2A42, "Intel GMA X4500MHD"             }, // Mobile - Intel 4 Series Express Chipset Family
  { 0x2A43, "Intel GMA X4500MHD"             }, // Mobile - Intel 4 Series Express Chipset Family


  //============== 5th generation ============
  //----------------Ironlake------------------
  { 0x0042, "Intel HD Graphics"              }, // Desktop - Clarkdale
  { 0x0046, "Intel HD Graphics"              }, // Mobile - Arrandale - MacBookPro6,1


  //============== 6th generation ============
  //----------------Sandy Bridge--------------
  //GT1
  { 0x0102, "Intel HD Graphics 2000"         }, // Desktop - iMac12,1, iMac12,2
  { 0x0106, "Intel HD Graphics 2000"         }, // Mobile
  { 0x010A, "Intel HD Graphics P3000"        }, // Server
  //GT2
  { 0x0112, "Intel HD Graphics 3000"         }, // Desktop
  { 0x0116, "Intel HD Graphics 3000"         }, // Mobile - MacBookAir4,1, MacBookAir4,2, MacBookPro8,2
  { 0x0122, "Intel HD Graphics 3000"         }, // Desktop
  { 0x0126, "Intel HD Graphics 3000"         }, // Mobile - MacBookPro8,1 Macmini5,1, Macmini5,2, Macmini5,3


  //============== 7th generation ============
  //----------------Ivy Bridge----------------
  //GT1
  { 0x0152, "Intel HD Graphics 2500"         }, // Desktop - iMac13,1(FB:0x01620006), iMac13,2(FB:0x01620007)
  { 0x0156, "Intel HD Graphics 2500"         }, // Mobile
  { 0x015A, "Intel HD Graphics 2500"         }, // Server
  { 0x015E, "Intel Ivy Bridge GT1"           }, // Reserved
  //GT2
  { 0x0162, "Intel HD Graphics 4000"         }, // Desktop
  { 0x0166, "Intel HD Graphics 4000"         }, // Mobile - MacBookPro9,1, MacBookPro9,2, MacBookPro10,1, MacBookPro10,2, MacBookAir5,1, MacBookAir5,2
  { 0x016A, "Intel HD Graphics P4000"        }, // Server


  //============== 7.5th generation ==========
  //----------------Haswell-------------------
  //GT1
  { 0x0402, "Intel Haswell GT1"              }, // Desktop
  { 0x0406, "Intel Haswell GT1"              }, // Mobile
  { 0x040A, "Intel Haswell GT1"              }, // Server
  { 0x040B, "Intel Haswell GT1"              }, //
  { 0x040E, "Intel Haswell GT1"              }, //
  //GT2
  { 0x0412, "Intel HD Graphics 4600"         }, // Desktop
  { 0x0416, "Intel HD Graphics 4600"         }, // Mobile
  { 0x041A, "Intel HD Graphics P4600"        }, // Server
  { 0x041B, "Intel Haswell GT2"              }, //
  { 0x041E, "Intel HD Graphics 4400"         }, //
  //GT3
  { 0x0422, "Intel Haswell GT3"              }, // Desktop
  { 0x0426, "Intel Haswell GT3"              }, // Mobile
  { 0x042A, "Intel Haswell GT3"              }, // Server
  { 0x042B, "Intel Haswell GT3"              }, //
  { 0x042E, "Intel Haswell GT3"              }, //
  //GT1
  { 0x0A02, "Intel Haswell GT1"              }, // Desktop ULT
  { 0x0A06, "Intel Haswell GT1"              }, // Mobile ULT
  { 0x0A0A, "Intel Haswell GT1"              }, // Server ULT
  { 0x0A0B, "Intel Haswell GT1"              }, // ULT
  { 0x0A0E, "Intel Haswell GT1"              }, // ULT
  //GT2
  { 0x0A12, "Intel Haswell GT2"              }, // Desktop ULT
  { 0x0A16, "Intel HD Graphics 4400"         }, // Mobile ULT
  { 0x0A1A, "Intel Haswell GT2"              }, // Server ULT
  { 0x0A1B, "Intel Haswell GT2"              }, // ULT
  { 0x0A1E, "Intel HD Graphics 4200"         }, // ULT
  //GT3
  { 0x0A22, "Intel Haswell GT3"              }, // Desktop ULT
  { 0x0A26, "Intel HD Graphics 5000"         }, // Mobile ULT - MacBookAir6,1, MacBookAir6,2, Macmini7,1
  { 0x0A2A, "Intel Haswell GT3"              }, // Server ULT
  { 0x0A2B, "Intel Haswell GT3"              }, // ULT
  { 0x0A2E, "Intel Iris Graphics 5100"       }, // ULT - MacBookPro11,1
  //GT1
  { 0x0C02, "Intel Haswell GT1"              }, // Desktop SDV
  { 0x0C06, "Intel Haswell GT1"              }, // Mobile SDV
  { 0x0C0A, "Intel Haswell GT1"              }, // Server SDV
  { 0x0C0B, "Intel Haswell GT1"              }, // SDV
  { 0x0C0E, "Intel Haswell GT1"              }, // SDV
  //GT2
  { 0x0C12, "Intel Haswell GT2"              }, // Desktop SDV
  { 0x0C16, "Intel Haswell GT2"              }, // Mobile SDV
  { 0x0C1A, "Intel Haswell GT2"              }, // Server SDV
  { 0x0C1B, "Intel Haswell GT2"              }, // SDV
  { 0x0C1E, "Intel Haswell GT2"              }, // SDV
  //GT3
  { 0x0C22, "Intel Haswell GT3"              }, // Desktop SDV
  { 0x0C26, "Intel Haswell GT3"              }, // Mobile SDV
  { 0x0C2A, "Intel Haswell GT3"              }, // Server SDV
  { 0x0C2B, "Intel Haswell GT3"              }, // SDV
  { 0x0C2E, "Intel Haswell GT3"              }, // SDV
  //GT1
  { 0x0D02, "Intel Haswell GT1"              }, // Desktop CRW
  { 0x0D06, "Intel HD Graphics 5200"         }, // Mobile CRW
  { 0x0D0A, "Intel Haswell GT1"              }, // Server CRW
  { 0x0D0B, "Intel Haswell GT1"              }, // CRW
  { 0x0D0E, "Intel Haswell GT1"              }, // CRW
  //GT2
  { 0x0D12, "Intel HD Graphics 5200"         }, // Desktop CRW
  { 0x0D16, "Intel HD Graphics 5200"         }, // Mobile CRW
  { 0x0D1A, "Intel Haswell GT2"              }, // Server CRW
  { 0x0D1B, "Intel Haswell GT2"              }, // CRW
  { 0x0D1E, "Intel Haswell GT2"              }, // CRW
  //GT3
  { 0x0D22, "Intel Iris Pro Graphics 5200"   }, // Desktop CRW - iMac14,1, iMac14,4
  { 0x0D26, "Intel Iris Pro Graphics 5200"   }, // Mobile CRW - MacBookPro11,2, MacBookPro11,3
  { 0x0D2A, "Intel Haswell GT3"              }, // Server CRW
  { 0x0D2B, "Intel Haswell GT3"              }, // CRW
  { 0x0D2E, "Intel Haswell GT3"              }, // CRW

  //----------------ValleyView----------------
  { 0x0F30, "Intel HD Graphics"              }, // Bay Trail
  { 0x0F31, "Intel HD Graphics"              }, // Bay Trail
  { 0x0F32, "Intel HD Graphics"              }, // Bay Trail
  { 0x0F33, "Intel HD Graphics"              }, // Bay Trail
  { 0x0155, "Intel HD Graphics"              }, // Bay Trail
  { 0x0157, "Intel HD Graphics"              }, // Bay Trail


  //============== 8th generation ============
  //----------------Broadwell-----------------
  //GT1
  { 0x1602, "Intel Broadwell GT1"            }, // Desktop
  { 0x1606, "Intel Broadwell GT1"            }, // Mobile
  { 0x160A, "Intel Broadwell GT1"            }, //
  { 0x160B, "Intel Broadwell GT1"            }, //
  { 0x160D, "Intel Broadwell GT1"            }, //
  { 0x160E, "Intel Broadwell GT1"            }, //
  //GT2
  { 0x1612, "Intel HD Graphics 5600"         }, // Mobile
  { 0x1616, "Intel HD Graphics 5500"         }, // Mobile
  { 0x161A, "Intel Broadwell GT2"            }, //
  { 0x161B, "Intel Broadwell GT2"            }, //
  { 0x161D, "Intel Broadwell GT2"            }, //
  { 0x161E, "Intel HD Graphics 5300"         }, // Ultramobile - MacBook8,1
  //GT3
  { 0x1626, "Intel HD Graphics 6000"         }, // Mobile - iMac16,1, MacBookAir7,1, MacBookAir7,2
  { 0x162B, "Intel Iris Graphics 6100"       }, // Mobile - MacBookPro12,1
  { 0x162D, "Intel Iris Pro Graphics P6300"  }, // Workstation, Mobile Workstation
  //GT3e
  { 0x1622, "Intel Iris Pro Graphics 6200"   }, // Desktop, Mobile - iMac16,2
  { 0x162A, "Intel Iris Pro Graphics P6300"  }, // Workstation, Mobile Workstation
  //RSVD
  { 0x162E, "Intel Broadwell RSVD"           }, // Reserved
  { 0x1632, "Intel Broadwell RSVD"           }, // Reserved
  { 0x1636, "Intel Broadwell RSVD"           }, // Reserved
  { 0x163A, "Intel Broadwell RSVD"           }, // Reserved
  { 0x163B, "Intel Broadwell RSVD"           }, // Reserved
  { 0x163D, "Intel Broadwell RSVD"           }, // Reserved
  { 0x163E, "Intel Broadwell RSVD"           }, // Reserved

  //------------Cherryview/Braswell-----------
  { 0x22B0, "Intel HD Graphics 400"          }, // Cherry Trail - Atom x5 series - Z83X0/Z8550(HD Graphics 400)
  { 0x22B1, "Intel HD Graphics 405"          }, // Cherry Trail - Atom x7 series - Z8750(HD Graphics 405)
  { 0x22B2, "Intel HD Graphics 400"          }, // Braswell - Cerelon QC/DC series - X3X60(HD Graphics 400)
  { 0x22B3, "Intel HD Graphics 405"          }, // Braswell - Pentium QC series - X3710(HD Graphics 405)


  //============== 9th generation ============
  //----------------Skylake-------------------
  //GT1
  { 0x1902, "Intel HD Graphics 510"          }, // Desktop
  { 0x1906, "Intel HD Graphics 510"          }, // Mobile
  { 0x190A, "Intel Skylake GT1"              }, //
  { 0x190B, "Intel HD Graphics 510"          }, //
  { 0x190E, "Intel Skylake GT1"              }, //
  //GT2
  { 0x1912, "Intel HD Graphics 530"          }, // Desktop - iMac17,1
  { 0x1916, "Intel HD Graphics 520"          }, // Mobile
  { 0x191A, "Intel Skylake GT2"              }, //
  { 0x191B, "Intel HD Graphics 530"          }, // Mobile - MacBookPro13,3
  { 0x191D, "Intel HD Graphics P530"         }, // Workstation, Mobile Workstation
  { 0x191E, "Intel HD Graphics 515"          }, // Ultramobile - MacBook9,1
  { 0x1921, "Intel HD Graphics 520"          }, // 
  //GT2f
  { 0x1913, "Intel Skylake GT2f"             }, //
  { 0x1915, "Intel Skylake GT2f"             }, //
  { 0x1917, "Intel Skylake GT2f"             }, //
  //GT3
  { 0x1923, "Intel HD Graphics 535"          }, //
  //GT3e
  { 0x1926, "Intel Iris Graphics 540"        }, // Mobile - MacBookPro13,1
  { 0x1927, "Intel Iris Graphics 550"        }, // Mobile - MacBookPro13,2
  { 0x192B, "Intel Iris Graphics 555"        }, //
  { 0x192D, "Intel Iris Graphics P555"       }, // Workstation, Mobile Workstation
  //GT4
  { 0x192A, "Intel Skylake GT4"              }, //
  //GT4e
  { 0x1932, "Intel Iris Pro Graphics 580"    }, //
  { 0x193A, "Intel Iris Pro Graphics P580"   }, // Workstation, Mobile Workstation
  { 0x193B, "Intel Iris Pro Graphics 580"    }, // Desktop, Mobile
  { 0x193D, "Intel Iris Pro Graphics P580"   }, // Workstation, Mobile Workstation

  //----------------Goldmont------------------
  { 0x0A84, "Intel HD Graphics"              }, // Broxton(cancelled)
  { 0x1A84, "Intel HD Graphics"              }, // Broxton(cancelled)
  { 0x1A85, "Intel HD Graphics"              }, // Broxton(cancelled)
  { 0x5A84, "Intel HD Graphics 505"          }, // Apollo Lake
  { 0x5A85, "Intel HD Graphics 500"          }, // Apollo Lake


  //============== 9.5th generation ==========
  //----------------Kaby Lake-----------------
  //GT1
  { 0x5902, "Intel HD Graphics 610"          }, // Desktop
  { 0x5906, "Intel HD Graphics 610"          }, // Mobile
  { 0x590A, "Intel Kaby Lake GT1"            }, //
  { 0x5908, "Intel Kaby Lake GT1"            }, //
  { 0x590B, "Intel Kaby Lake GT1"            }, //
  { 0x590E, "Intel Kaby Lake GT1"            }, //
  //GT1.5
  { 0x5913, "Intel Kaby Lake GT1.5"          }, //
  { 0x5915, "Intel Kaby Lake GT1.5"          }, //
  { 0x5917, "Intel Kaby Lake GT1.5"          }, //
  //GT2
  { 0x5912, "Intel HD Graphics 630"          }, // Desktop - iMac18,2, iMac18,3
  { 0x5916, "Intel HD Graphics 620"          }, // Mobile
  { 0x591A, "Intel HD Graphics P630"         }, //
  { 0x591B, "Intel HD Graphics 630"          }, // Mobile - MacBookPro14,3
  { 0x591D, "Intel HD Graphics P630"         }, // Workstation, Mobile Workstation
  { 0x591E, "Intel HD Graphics 615"          }, // Ultramobile - MacBook10,1
  //GT2F
  { 0x5921, "Intel Kaby Lake GT2F"           }, //
  //GT3
  { 0x5923, "Intel HD Graphics 635"          }, //
  { 0x5926, "Intel Iris Plus Graphics 640"   }, // Mobile - MacBookPro14,1, iMac18,1
  { 0x5927, "Intel Iris Plus Graphics 650"   }, // Mobile - MacBookPro14,2
  //GT4
  { 0x593B, "Intel Kaby Lake GT4"            }, //


  //============== 10th generation ===========
  //----------------Coffee Lake---------------
  //GT1
  { 0x3E90, "Intel Coffee Lake GT1"          }, //
  { 0x3E93, "Intel Coffee Lake GT1"          }, //
  //GT2
  { 0x3E91, "Intel Coffee Lake GT2"          }, //
  { 0x3E92, "Intel Coffee Lake GT2"          }, //
  { 0x3E96, "Intel Coffee Lake GT2"          }, //
  { 0x3E9B, "Intel Coffee Lake GT2"          }, //
  { 0x3E94, "Intel Coffee Lake GT2"          }, //
  //GT3
  { 0x3EA6, "Intel Coffee Lake GT3"          }, //
  { 0x3EA7, "Intel Coffee Lake GT3"          }, //
  { 0x3EA8, "Intel Coffee Lake GT3"          }, //
  { 0x3EA5, "Intel Coffee Lake GT3"          }, //


  //============== 10.5th generation =========
  //----------------Cannonlake----------------
  //GT0.5
  { 0x5A49, "Intel Cannonlake GT0.5"         }, //
  { 0x5A4A, "Intel Cannonlake GT0.5"         }, //
  //GT1
  { 0x5A41, "Intel Cannonlake GT1"           }, //
  { 0x5A42, "Intel Cannonlake GT1"           }, //
  { 0x5A44, "Intel Cannonlake GT1"           }, //
  //GT1.5
  { 0x5A59, "Intel Cannonlake GT1.5"         }, //
  { 0x5A5A, "Intel Cannonlake GT1.5"         }, //
  { 0x5A5C, "Intel Cannonlake GT1.5"         }, //
  //GT2
  { 0x5A50, "Intel Cannonlake GT2"           }, //
  { 0x5A51, "Intel Cannonlake GT2"           }, //
  { 0x5A52, "Intel Cannonlake GT2"           }, //
  { 0x5A54, "Intel Cannonlake GT2"           }, //

};
```

## 写在最后
> 本文会不间断更新
> 最后更新：10-1-2017

# 关于打赏
您的支持就是我更新的动力！
本篇文章会持续不间断更新，每个Clover的更新日志都需要阅读，如果有新的platform-id，我都会第一时间添加进来。
so，如果不希望看到博主停更的话，请点击下方的 `打赏` 支持一下，有钱的捧个钱场，没钱的捧个人场，谢谢大家！

# QQ群:
331686786 [一起黑苹果](http://shang.qq.com/wpa/qunwpa?idkey=db511a29e856f37cbb871108ffa77a6e79dde47e491b8f2c8d8fe4d3c310de91)


