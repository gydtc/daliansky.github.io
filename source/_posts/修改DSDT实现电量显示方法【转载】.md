---
title: 修改DSDT实现电量显示方法【转载】
date: 2018-03-15 12:52:20
urlname: Modify-DSDT-to-achieve-power-display-method
tags: 
- 教程
- 电池
- 电量
- 拆分
categories: 教程
---

> 这篇帖子主要来源于论坛https://github.com/RehabMan/Laptop-DSDT-Patch。
>
> 但是很多笔记本并未出现在这个补丁源里，并且我们要了解补丁的意思才知道它适不适合我们的电脑。

## 电量补丁制作过程

1. 我们需要确定DSDT里的哪些部分需要改。

   用`MaciASL`软件打开DSDT，搜索**`EmbeddedControl`**。在`DSDT`里，可能会有一到多个。同时注意一个计算机名字如下图为**`EC0`**

```haskell
OperationRegion (ECF2, EmbeddedControl, Zero, 0xFF)
```

​     上面的代码，我们只需要关注`ec`域声明的名字，即**`ECF2`**（别的可能是`ECF0`等）。
​     我们开始搜索**`Field（ECF2`**。

2. 我们需要查看Field里所有**大于8位**的元素，例如：

```haskell
Field (ECF2, ByteAcc, Lock, Preserve)
   {
       Offset (0x10),
       BDN0,   56,
...
```

​	可以看到**`BDN0`**是一个大于8位的字段。

​	我们对其进行记录。之后我们要确定除了这里还有没有其他地方调用了这个字段。搜索他的名字：**`BDN0`**。如果**只有这里被用到则不用拆分可以删除记录，**如果除了这里还有其他地方用到，则进行记录。

​	整理到如下的结果：

​	可以看到我有意对16位 32位以及高于32位进行了一个空行的区分，大家也可以这样，这对下面的修改操作有着重要意义。

### 补丁的制作方法

#### 对于16位和32位字段的处理

对于16位的`BDC0`，我么需要把它拆分为两部分（低字节，高字节）。在拆分的时候，**需要注意两点**：
​       1.拆分后，它的名字应该是 4个字符 。不能多，也不能少。如图

1. // 拆分前： BDC0, 16
2.    DC00, 8,
3.    DC01, 8,

复制代码

​       2.**拆分后到名字不能已经出现在dsdt中（最好也不要与拆分到名字重复，虽然没什么问题，但是如果多次打这个补丁就会发生错误）**，可以先想好几个名字，然后在dsdt中搜索，如果没有就可以。
​       然后。重点来了，**拆分16位字段的补丁结构**。（这里只会拆分ec域内的名称）

1. into device label H_EC code_regex BDC0,\s+16, replace_matched begin DC00,8,DC01,8, end;

复制代码

​           对于各部分的含义以及修改方法：
​           1.into device label** H_EC**
​             含义：针对H_EC这个设备操作。对于自己电脑的名称请查看**制作过程第一步的截屏处**。
​           2.code_regex** BDC0,\s+16,**
含义：code_regex表示寻找后面的匹配项。  后面的BDC0,\s+16,是寻找的内容，对于小白，只要知道把**BDC0**替换成你所记录的16位名称即可。
相关解释：\s+表示多个空格。所以这句话的意思是搜索BDCO，16，
​              个人建议：这一步中的最后的“，”个人觉得没必要加，因为如果这个数据出现在右括号前贼不会有这个“，”。
​           3.replace_matched begin** DC00,8,DC01,8,** end;
​              含义：replace_matched begin.....end表示将前面搜索到的字段替换为省略后里的字段。**DC00,8,DC01,8,**即替换为的内容。这里DC00 DC01即你要改为的名   字。
​              注意和上文的对应，如过上文按照我的建议不加最后的“，”则这里应为“**DC00,8,DC01,8”**！
​       到了这里，我们已经可以自己写替换（或者说拆分）16位字段的补丁了。但是，对于示例DSDT，BDC0是被用到的字段，因此，只是拆分它是不行的。用到它的地方也需要修改。例如这些地方：

1. Store (BDC0, Index (DerefOf (Index (Local0, 0x02)), Zero))
2. Store (ShiftRight (BDC0, 0x08), Index (DerefOf (Index (Local0, 0x02)), One))

复制代码

​           由于拆分，BDC0已经变成两个字段了，于是，我们需要1个工具方法来处理拆分后的字段。

1. into method label B1B2 remove_entry;
2. into definitionblock code_regex . insert
3. begin
4. Method (B1B2, 2, NotSerialized)\n
5. {\n
6. Return(Or(Arg0, ShiftLeft(Arg1, 8)))\n
7. }\n
8. end;

复制代码

​          对于小白直接将这个加入加入你的补丁中就ok。
​          对这个补丁的解读：
​           1.into method label B1B2 remove_entry;       查找B1B2方法，如果有，删除它。
​           2.into definitionblock code_regex . insert     把后面的内容插入DefinitionBlock { }（每个dsdt的第一个就是这个）内。
​       对于dsdt内其他部分的修改，如下：上面是本身的效果，下面为修改结束的效果：

1. Store (BDC0, Index (DerefOf (Index (Local0, 0x02)), Zero))
2. Store (ShiftRight (BDC0, 0x08), Index (DerefOf (Index (Local0, 0x02)), One))

复制代码

1. Store (B1B2(DC00,DC01), Index (DerefOf (Index (Local0, 0x02)), Zero))
2. Store(ShiftRight (B1B2(DC00,DC01), 0x08), Index (DerefOf (Index (Local0, 0x02)), One))

复制代码

​        于是有了这个补丁：

1. into method label GBTI code_regex \(BDC0, replaceall_matched begin (B1B2(DC00,DC01), end;

复制代码

​       主要介绍下几个参数： 

​          1.into method label **GBTI**

这部分GBTI为dsdt出现的BDC0的方法，至于如何查看，点中你想要的参数，maciasl自然会显示，如下图：灰色部分即为你要修改为的名称，注意有些是有_的也要完全相同的加进去
​         2.code_regex **\(BDC0,**

这部分\(BDC0,与上面的查找相同，不过这部分并不能直接把BDC0改成你自己的方法就完事！！！举个例子：

1. Store (^^PCI0.LPCB.EC0.XIF1, Index (PAK0, One))

复制代码

​            如果我要改这个中的XIF1应该怎么写？            应该写为：\(\^\^PCI0\.LPCB\.EC0\.XIF1,
​          所以这个地方就是看自己的代码具体的情况，改成自己的形式，并且每个标点符号左边要加"\"
​        3. replaceall_matched begin **(B1B2(DC00,DC01),** end; 
​             这部分括号内就是你要修改为的内容，还以2中例子，应该改成什么？
​           应该改为：(B1B2(^^PCI0.LPCB.EC0.XID1,^^PCI0.LPCB.EC0.XID2),
​             这个地方就是把B1B2括号内的两个参数改成你本身括号内的内容，并且把你想改的参数分别改掉。
​     **特别提醒：1.****以上都是对于在dsdt中，store（要修改参数，xxx）的形式**
**                      如果出现store（xxx，要修改的参数）则我们要改前改后的形式如下：**

1. Store (Arg0, ENCR)//修改前
2. Store (ShiftRight(Arg0,8),ENC2)
3. Store (Arg0,ENC1)

复制代码

​                        具体代码请结合上处解释自行书写，另外 换行为/n，空格为/s。                  2.**如果出现Or （你要修改的参数，xxx，你要修改的参数）的形式则应该修改为如下形式：**

1. Or (BATD, 0xC0, BATD)//修改前
2. Store(ShiftRight(Or(B1B2(BTD0,BTD1),0xC0),8), BTD1)
3. Store(Or(B1B2(BTD0,BTD1),0xC0), BTD0)

复制代码

​                  3.**如果出现****And （你要修改的参数，xxx，你要修改的参数）****的****形式则修改形式如下：**

1. And  (BATD, 0xFF3F, BATD)//修改前
2. Store(ShiftRight(And(B1B2(BTD0,BTD1),0xFF3F),8), BTD1)
3. Store(And(B1B2(BTD0,BTD1),0xFF3F), BTD0)

复制代码

​      至此，16位修改完毕，得到形如下补丁：

1. \# 16-bit registers
2. into device label H_EC code_regex BDC0,\s+16 replace_matched begin DC00,8,DC01,8 end;
3. into device label H_EC code_regex BDC1,\s+16 replace_matched begin DC10,8,DC11,8 end;
4. into device label H_EC code_regex BFC0,\s+16 replace_matched begin FC00,8,FC01,8 end;
5. into device label H_EC code_regex BFC1,\s+16 replace_matched begin FC10,8,FC11,8 end;
6. into device label H_EC code_regex BDV0,\s+16 replace_matched begin DV00,8,DV01,8 end;
7. into device label H_EC code_regex BDV1,\s+16 replace_matched begin DV10,8,DV11,
8. \# fix 16-bit methods
9. into method label GBTI code_regex \(BDC0, replaceall_matched begin (B1B2(DC00,DC01), end;
10. into method label GBTI code_regex \(BDC1, replaceall_matched begin (B1B2(DC10,DC11), end;
11. into method label GBTI code_regex \(BFC0, replaceall_matched begin (B1B2(FC00,FC01), end;
12. into method label GBTI code_regex \(BFC1, replaceall_matched begin (B1B2(FC10,FC11), end;
13. into method label BTIF code_regex \(BFC0, replaceall_matched begin (B1B2(FC00,FC01), end;
14. into method label BTIF code_regex \(BFC1, replaceall_matched begin (B1B2(FC10,FC11), end;
15. into method label ITLB code_regex \(BFC1, replaceall_matched begin (B1B2(FC10,FC11), end;

复制代码

   接着是32位字段的修改
​       这是与16位类似的处理方法：直接打进去就好

1. nto method label B1B4 remove_entry;
2. into definitionblock code_regex . insert
3. begin
4. Method (B1B4, 4, NotSerialized)\n
5. {\n
6. ​    Store(Arg3, Local0)\n
7. ​    Or(Arg2, ShiftLeft(Local0, 8), Local0)\n
8. ​    Or(Arg1, ShiftLeft(Local0, 8), Local0)\n
9. ​    Or(Arg0, ShiftLeft(Local0, 8), Local0)\n
10. ​    Return(Local0)\n
11. }\n
12. end;

复制代码

​        32位的修改方法与16位差不多。形如：

1. \# 32-bit registers
2. into device label H_EC code_regex BTY0,\s+32 replace_matched begin TY00,8,TY01,8,TY02,8,TY03,8 end;
3. into device label H_EC code_regex BTY1,\s+32 replace_matched begin TY10,8,TY11,8,TY12,8,TY13,8 end;
4. \# fix 32-bit methods
5. into method label GBTI code_regex \(BTY0, replaceall_matched begin (B1B4(TY00,TY01,TY02,TY03), end;

复制代码

​       这部分不懂的去看16位的修改方法，完全相同，只是数据变成了四个！**二、大于32位的字段补丁处理**
**对于大于32位的字段不用进行拆分操作，只需要将用到的地方进行处理就行了。**
**       我们先来认识个东西：偏移量。偏移量是啥？  看看图中的offset代表的就是偏移量。中间的咋算？**
**       偏移量逢8进1，所以在对嘴上面的offset往下加就可以得出，如图：**

1. Offset (0x04),
2. ​                        CMCM,   8, //0x04
3. ​                        CMD1,   8, //0x05（8位是1字节，所以加1）
4. ​                        CMD2,   8, //0x06
5. ​                        CMD3,   8, //0x07
6. ​                        Offset (0x18), 这里空了一些，不用纠结，按原始DSDT给出的偏移量计算就好（会给开头的偏移量）
7. ​                        Offset (0x19),
8. ​                        SMST,   8, //0x19
9. ​                        MBMN,   80, //0x1A
10. ​                        MBPN,   96, //0x25 = 0x1A+A+1（0x1A是上一个的起始地址，A的得来：80除以8得10，也就是上一个占了10个字节，16进制表示就是A。 0x2A+A是它占到了哪个地址，它的下一个地址才是下一个开始，所以再加1。）
11. ​                        GPB1,   8, // 0x32 = 0x25 + C（96位占了12个字节）+1
12. ​                        GPB2,   8, //0x33
13. ​                        GPB3,   8, //0x34
14. ​                        GPB4,   8, //0x35

复制代码

​         另外上r神的方法：（其中的H_EC同上 请改为自己的设备名，不知道在呢？去看一！）

1. \# utility methods to read/write buffers from/to EC
2. into method label RE1B parent_label H_EC remove_entry;
3. into method label RECB parent_label H_EC remove_entry;
4. into device label H_EC insert
5. begin
6. Method (RE1B, 1, NotSerialized)\n
7. {\n
8. ​    OperationRegion(ERAM, EmbeddedControl, Arg0, 1)\n
9. ​    Field(ERAM, ByteAcc, NoLock, Preserve) { BYTE, 8 }\n
10. ​    Return(BYTE)\n
11. }\n
12. Method (RECB, 2, Serialized)\n
13. // Arg0 - offset in bytes from zero-based EC\n
14. // Arg1 - size of buffer in bits\n
15. {\n
16. ​    ShiftRight(Arg1, 3, Arg1)\n
17. ​    Name(TEMP, Buffer(Arg1) { })\n
18. ​    Add(Arg0, Arg1, Arg1)\n
19. ​    Store(0, Local0)\n
20. ​    While (LLess(Arg0, Arg1))\n
21. ​    {\n
22. ​        Store(RE1B(Arg0), Index(TEMP, Local0))\n
23. ​        Increment(Arg0)\n
24. ​        Increment(Local0)\n
25. ​    }\n
26. ​    Return(TEMP)\n
27. }\n
28. end;

复制代码

1. into method label WE1B parent_label H_EC remove_entry;
2. into method label WECB parent_label H_EC remove_entry;
3. into device label H_EC insert
4. begin
5. Method (WE1B, 2, NotSerialized)\n
6. {\n
7. ​    OperationRegion(ERAM, EmbeddedControl, Arg0, 1)\n
8. ​    Field(ERAM, ByteAcc, NoLock, Preserve) { BYTE, 8 }\n
9. ​    Store(Arg1, BYTE)\n
10. }\n
11. Method (WECB, 3, Serialized)\n
12. // Arg0 - offset in bytes from zero-based EC\n
13. // Arg1 - size of buffer in bits\n
14. // Arg2 - value to write\n
15. {\n
16. ​    ShiftRight(Add(Arg1,7), 3, Arg1)\n
17. ​    Name(TEMP, Buffer(Arg1) { })\n
18. ​    Store(Arg2, TEMP)\n
19. ​    Add(Arg0, Arg1, Arg1)\n
20. ​    Store(0, Local0)\n
21. ​    While (LLess(Arg0, Arg1))\n
22. ​    {\n
23. ​        WE1B(Arg0, DerefOf(Index(TEMP, Local0)))\n
24. ​        Increment(Arg0)\n
25. ​        Increment(Local0)\n
26. ​    }\n
27. }\n
28. end;

复制代码

​     两个方法不用同时打，简单来说如果你要改的参数挨着左括号则用一，如果你改的参数离右括号进就用二！   修改形式：如图改法：

1. Store(MBMN, XXXX) -> Store(RECB(0x1A, 80), XXXX)

复制代码

​    这时补丁就是

1. into method label XXXX code_regex \(MBMN, replaceall_matched begin (RECB(0x1A,80), end;
2. into method label XXXX code_regex \(MBPN, replaceall_matched begin (RECB(0x25,96), end;

复制代码

​     对比16位改对应的位置  如果你的要改参数离右括号进则：

1. Store (Arg3, \_SB.PCI0.LPCB.EC0.SMD0) -> \_SB.PCI0.LPCB.EC0.WECB(0x1C,264,Arg3)

复制代码

​        这时补丁则为：

1. nto method label SMRW code_regex Store\s\(Arg3,\s\\_SB.PCI0.LPCB.EC0.SMD0\) replaceall_matched begin \\_SB.PCI0.LPCB.EC0.WECB(0x1C,264,Arg3) end;

复制代码

最后总结下补丁结构：

1. \# Tip: If you get a 0% battery status,you should also patch the Rehabman's "Fix Mutex with non-zero SyncLevel" patch.
2. \# You also can patch the both of your computer's battery patch and the Rehabman's patch at one time.
3. 
4. \# 注意：如果打过电量补丁后，有获取的电池状态显示为0%的情况，还需要打 Rehabman的 “Fix Mutex with non-zero SyncLevel” 补丁。
5. \# 你也可以，一次性打好 自己电脑的电量补丁 和 Rehabman 的那个补丁。
6. 
7. \# ==== Field devide 字段拆分 ====
8. 
9. \# ==== Replace called method 替换调用方法 ====
10. 
11. \# ==== Data handling method 数据处理方法 ====

复制代码

最后的解释：文中多次提到特殊情况和离括号的的远近不同的处理方法，这是为什么呢？
  很简答的原因是sotre（A，B）是一个从左到右的操作，也就是将A写到B
   所以如果A是你的参数则是读的操作，而如果是B则是写的操作，也就用到不同的方法。
  而Or 的第三个参数，是把前两个数的计算结果，写入到第三个参数的意思。
  And 的第三个参数，是把前两个数的计算结果，写入到第三个参数的意思。
  不过能理解store就够了。
**  将整理好的补丁保存位txt格式就能打入了 软件中点patch。点open就行**
最后，特别感谢翻译贴和r神的帖子，也希望你们都能搞定电量显示的问题，另外，如果成功请回馈社会将补丁放于最上面所说帖子的补丁源！