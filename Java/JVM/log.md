# JVM 学习

## 20200425

第80节课   -->>>  JVM入门及class文件格式

https://docs.oracle.com/javase/specs/       -->>  JDK 官网

JVM是一种规范



JDK  JRE JVM

JDK =  JRE  + development kit

JRE = JVM + CORE LIB

JVM

### Class File Format

一个空白的类中  反编译之后会出现一个出现先一个无参构造

2的十六次方  65536 实际存放的是65535

**常量池**  constant_pool 
constant_pool长度为constant_pool_count-1的表   (索引，标志tag,类型)

常量池的下标从1开始 所以常量池的长度为 constant_pool_count-1 ，0号下标给他做了一个预留，没有任何引用指向这个引用



![image-20200425225257887](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\access_flags.png)



- 有很多可以观察ByteCode的方法
  - javap
  - JBE -- 可以直接修改
  - JClassLib  - IDEA插件之一



//  解读常量池

## 20200426

翻译为Class    对Class文件做过深入研究，了解Class文件的详细信息

JAVA的汇编

![image-20200426202816638](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\JVM13中第7章.png)



aload_0  将this压栈



课后闲聊

80x86 是基于寄存器的    寄存器是直接放在CPU里面的所以就要比 JVM快多了

JVM基于栈的，栈在内存里面

JVM只有八个指令是原子性的

![image-20200426212314145](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\八大原子操作.png)

long  和 Double在多线程的时候，鼓励程序员是生成64位的

JVM的内部规范，使实现保证了，Volatile long 和 volatile double 是原子性的

最早的实现是CPU层面的。 总线锁直接锁总线

现在的实现是 MESI(CPU缓存一致性协议)

![image-20200426212920169](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\read_writer_volatile_atomic.png)



# 详解Class加载过程

### Loading Linking  Initializing

class 被load到内存中，事件上分为两个部分，一部分是calss文件，另一部分是生成一个class对象，这个对象指向内存中的class文件。

method Area(方法区)  1.8之前叫 永久代，1.8之后叫metaspace



ClassLoader 动态解析

Jprel  热部署



ClassLoader中的findClass在父类中已经定义好了，需要自己进行实现，这种方式对应的设计模式 。钩子函数(模板方法)

**Compiler API**      直接在内存里面将内存进行编译，就不需要将Class放在内存中



lazylizing  懒加载

混合模式    解释器 + JIT

JIT 将热代码编译为本地代码(C语言编译后的代码为本地代码)   wodows 下的本地代码为  exe       Linux下的本地代码为 elf

class对象放在final方法区中



问题: 

1. Class对象保存再哪里?
   - 马老师猜测是放在 metaSpace中
2. ClassLoader 中的parent什么时候进行赋值的
3. 问题图片:
   1. ![image-20200427230343022](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\问题.png)



# Java 内存模型

JDK的动态代理也是基于ASM进行实现的

如何打破双亲委派机制， 重写ClassLoader中的loadClass方法

什么时候需要打破双亲委派机制:  

```
何时打破过？
   1. JDK1.2之前，自定义ClassLoader都必须重写loadClass()
   2. ThreadContextClassLoader可以实现基础类调用实现类代码，通过thread.setContextClassLoader指定
   3. 热启动，热部署
      1. osgi tomcat 都有自己的模块指定classloader（可以加载同一类库的不同版本）
```



加载过的类放在(1.8之后放在)MetaSpace(方法区)，classloader被被干掉之后，这些类就会被GC回收

class被一个Class对象进行指向？

----

### JMM java内存模型

#### 硬件层的并发优化基础知识

![image-20200518163952123](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\存储器的层次结构.png)



![image-20200518164316673](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\硬件速度的具体值.png)

## 硬件层数据一致性

![image-20200518164546036](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\cache line.png)

多线程是内存中的x,y可能会被缓存在不同的内存中，交由不同的计算单元与寄存器进行处理，可能每个计算单元与寄存器对应着一个线程，也可能超线程。

如何解决问题:

#### 对L3 Cache进行加锁，L2通过总线锁的状态进行判断处理，但是处理效率会降低。

![image-20200518164855508](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\总线锁锁住总线.png)



有很多种数据一致性协议,但是intel使用的是MESI协议，所以大家使用的使用的也是MESI Cache数据一致性协议

像 MSI、MESI、MOSI、Synapse、Firefly、Dragon这些都是数据一致性协议

![image-20200518165230891](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\数据一致性协议.png)

现在的CPU数据一致性是通过，缓存锁(MESI....)  +  总线锁一起来实现的。



**Cache Line** 缓存行对齐的实际应用。

![image-20200518172227982](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\缓存行对齐的实际应用.png)

## 乱序问题

![image-20200518215644165](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\乱序问题_1.png)

![image-20200518221147558](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\乱序问题_2.png)

![image-20200518221535257](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\cpu的合并写技术.png)



![image-20200518222315397](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\证明指令时乱序执行的.png)

```
乱序执行的证明：JVM/jmm/Disorder.java
```

### 如何保证特定情况下不乱序



volatitle 

![image-20200518223212901](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\cpu内存屏障)




硬件内存屏障 X86

>  sfence:  store| 在sfence指令前的写操作当必须在sfence指令后的写操作前完成。
>  lfence：load | 在lfence指令前的读操作当必须在lfence指令后的读操作前完成。
>  mfence：modify/mix | 在mfence指令前的读写操作当必须在mfence指令后的读写操作前完成。

> 原子指令，如x86上的”lock …” 指令是一个Full Barrier，执行时会锁住内存子系统来确保执行顺序，甚至跨多个CPU。Software Locks通常使用了内存屏障或原子指令来实现变量可见性和保持程序顺序

JVM级别如何规范（JSR133）

> LoadLoad屏障：
>      对于这样的语句Load1; LoadLoad; Load2， 
>
>      在Load2及后续读取操作要读取的数据被访问前，保证Load1要读取的数据被读取完毕。
>
> StoreStore屏障：
>
>      对于这样的语句Store1; StoreStore; Store2，
>  
>      在Store2及后续写入操作执行前，保证Store1的写入操作对其它处理器可见。
>
> LoadStore屏障：
>
>      对于这样的语句Load1; LoadStore; Store2，
>  
>      在Store2及后续写入操作被刷出前，保证Load1要读取的数据被读取完毕。
>
> StoreLoad屏障：
>  对于这样的语句Store1; StoreLoad; Load2，
>
>      在Load2及后续所有读取操作执行前，保证Store1的写入对所有处理器可见。

volatile的实现细节

![image-20200519112619476](H:\MsbSpace\Zero\Record-document\volatile的实现细节.png)

1. 字节码层面
   ACC_VOLATILE

2. JVM层面
   volatile内存区的读写 都加屏障

   > StoreStoreBarrier
   >
   > volatile 写操作
   >
   > StoreLoadBarrier

   > LoadLoadBarrier
   >
   > volatile 读操作
   >
   > LoadStoreBarrier

3. OS和硬件层面
   https://blog.csdn.net/qq_26222859/article/details/52235930
   hsdis - HotSpot Dis Assembler   （观察JVM编译号的字节码，在CPU级别到底是使用什么样的汇编指令来完成的）
   windows lock 指令实现 | MESI实现
   
   ![image-20200519112939557](H:\MsbSpace\Zero\Record-document\硬件层面的使用hsdis观察汇编码.png)




1. 字节码层面
   ACC_SYNCHRONIZED
   monitorenter monitorexit
2. JVM层面
   C C++ 调用了操作系统提供的同步机制
3. OS和硬件层面
   X86 : lock cmpxchg / xxx
   [https](https://blog.csdn.net/21aspnet/article/details/88571740)[://blog.csdn.net/21aspnet/article/details/](https://blog.csdn.net/21aspnet/article/details/88571740)[88571740](https://blog.csdn.net/21aspnet/article/details/88571740)



一下描述在java8种已经放弃

![image-20200519160120170](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\8大原子操作.png)

JAVA并发内存模式是没有变化的

![image-20200519160241397](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\java并发内存模型.png)



![image-20200519160719957](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\JVM规定重排序必须遵守的规则.png)

![image-20200519160853203](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\as is serial.png)



### 对象的内存布局

![image-20200519154850909](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\对象的内存布局面试题.png)



### 1. 对象的创建过程

![image-20200519161753688](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\对象的创建过程.png)



### 2. 对象在内存中的存储布局  以及根据项目获取对应的大小


## 对象大小（64位机）

### 观察虚拟机配置

java -XX:+PrintCommandLineFlags -version

### 普通对象

1. 对象头：markword  8
2. ClassPointer指针：-XX:+UseCompressedClassPointers 为4字节 不开启为8字节
3. 实例数据
   1. 引用类型：-XX:+UseCompressedOops 为4字节 不开启为8字节 
      Oops Ordinary Object Pointers
4. Padding对齐，8的倍数

### 数组对象

1. 对象头：markword 8
2. ClassPointer指针同上
3. 数组长度：4字节
4. 数组数据
5. 对齐 8的倍数

## 实验

1. 新建项目ObjectSize （1.8）

2. 创建文件ObjectSizeAgent

   ```java
   package com.mashibing.jvm.agent;
   
   import java.lang.instrument.Instrumentation;
   
   public class ObjectSizeAgent {
       private static Instrumentation inst;
   
       public static void premain(String agentArgs, Instrumentation _inst) {
           inst = _inst;
       }
   
       public static long sizeOf(Object o) {
           return inst.getObjectSize(o);
       }
   }
   ```

3. src目录下创建META-INF/MANIFEST.MF

   ```java
   Manifest-Version: 1.0
   Created-By: mashibing.com
   Premain-Class: com.mashibing.jvm.agent.ObjectSizeAgent
   ```

   注意Premain-Class这行必须是新的一行（回车 + 换行），确认idea不能有任何错误提示

4. 打包jar文件

5. 在需要使用该Agent Jar的项目中引入该Jar包
   project structure - project settings - library 添加该jar包

6. 运行时需要该Agent Jar的类，加入参数：

   ```java
   -javaagent:C:\work\ijprojects\ObjectSize\out\artifacts\ObjectSize_jar\ObjectSize.jar
   ```

7. 如何使用该类：

   ```java
   ​```java
      package com.mashibing.jvm.c3_jmm;
      
      import com.mashibing.jvm.agent.ObjectSizeAgent;
      
      public class T03_SizeOfAnObject {
          public static void main(String[] args) {
              System.out.println(ObjectSizeAgent.sizeOf(new Object()));
              System.out.println(ObjectSizeAgent.sizeOf(new int[] {}));
              System.out.println(ObjectSizeAgent.sizeOf(new P()));
          }
      
          private static class P {
                              //8 _markword
                              //4 _oop指针
              int id;         //4
              String name;    //4
              int age;        //4
      
              byte b1;        //1
              byte b2;        //1
      
              Object o;       //4
              byte b3;        //1
      
          }
      }
   ```



### 3. 对象头具体包括什么

![image-20200519172456258](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\Hotspotd的源码.md)



#### 具体的分配

![image-20200519172652897](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\对象头大小的具体分配.png)



### 学生问题


## IdentityHashCode的问题

回答白马非马的问题：

当一个对象计算过identityHashCode之后，不能进入偏向锁状态

https://cloud.tencent.com/developer/article/1480590
 https://cloud.tencent.com/developer/article/1484167

https://cloud.tencent.com/developer/article/1485795

https://cloud.tencent.com/developer/article/1482500



![image-20200519172813042](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\oindentity hash code的计算后的影响.png)



![image-20200519172917553](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\完整说明.png)




## 4. 对象定位

•https://blog.csdn.net/clover_lily/article/details/80095580

1. 句柄池
2. 直接指针



## 5. 对象怎么分配

-  GC相关内容  后面会讲

![image-20200519173834952](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\对象的内存分配.png)



## 6.Object o = new Object()在内存中占用多少字节?

16byte



# JVM Runtime Data Area and JVM Instructions



![image-20200519193449482](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\从一道面试题开始谈.png)

![image-20200519220215473](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\查看JVM执行.png)

### 补充

![image-20200520095319971](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\补充.png)

run engine之后的内容

![image-20200519193739038](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\run engine之后eun-time data area.png)



Data areas的区域划分

![image-20200519194736231](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\Run-time data areas.png)


## Runtime Data Area

**PC** 程序计数器

> 存放指令位置
>
> 虚拟机的运行，类似于这样的循环：
>
> while( not end ) {
>
>     取PC中的位置，找到对应位置的指令；
>
>     执行该指令；
>
>     PC ++;
>
> }

JVM中每一个线程有他自己的程序计数器。

![image-20200519195031768](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\Program Counter.png)

**JVM Stack**

![image-20200519195213475](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\JVM Stacks.png)

1. Frame - 每个方法对应一个栈帧
   1. Local Variable Table   (局部变量表)
   2. Operand Stack    （操作数栈）
      对于long的处理（store and load），多数虚拟机的实现都是原子的
      jls 17.7，没必要加volatile
   3. Dynamic Linking   （动态链接）
       https://blog.csdn.net/qq_41813060/article/details/88379473 
      jvms 2.6.3
   4. return address
      a() -> b()，方法a调用了方法b, b方法的返回值放在什么地方

**Heap**

JVM线程中间共享

![image-20200519195351404](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\JVM Heap.png)

**Method Area**

方法区被所有的线程所共享

![image-20200519195614169](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\Method Area.png)

1. Perm Space (<1.8)  （永久区）
   字符串常量位于PermSpace
   FGC不会清理
   大小启动的时候指定，不能变
2. Meta Space (>=1.8) （元数据区）
   字符串常量位于堆
   会触发FGC清理
   不设定的话，最大就是物理内存

Runtime Constant Pool

![image-20200519200455855](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\Run-Time Constant Pool.png)

Native Method Stack

Direct Memory

> JVM可以直接访问的内核空间的内存 (OS 管理的内存)
>
> NIO ， 提高效率，实现zero copy

![image-20200519201350329](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\next 线程共享区域.png)

进入正题:

![image-20200519202121449](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\栈帧Frame.png)

小结回顾:

每个方法对应一个栈帧.

![image-20200520101318877](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\小节回顾.png)





![image-20200520101540265](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\示例-1.png)



int代表的最大数为正127,所以对应的虚拟机指令为 sipush进行压栈,  s-->short

![image-20200520101715476](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\示例-2.png)



非static的方法是需要对象的，这个对象已经被放在了局部变量表里面。

![image-20200520102059125](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\示例-3.png)



![image-20200520102411712](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\示例-4.png)

![image-20200520102807396](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\示例-5.png)



> 内存溢出的几种方式
>
> 堆溢出
>
> 栈溢出
>
> 直接内存溢出
>
> 方法区溢出

![image-20200520103448772](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\示例-6.png)



**这里讲的有点懵逼**

![image-20200520104721943](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\frames of recursion.png)



总结

clinit: 静态语句块；

![image-20200520104821920](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\前面总结.png)




## 常用指令

store

load

pop

mul

sub

invoke

1. InvokeStatic

   调用静态方法

2. InvokeVirtual

   自带多态的

3. InvokeInterface

   ```java
   List<String> list = new ArrayList<String>();
   list.add("hello");
   ```

4. InovkeSpecial
   可以直接定位，不需要多态的方法
   private 方法 ， 构造方法

5. InvokeDynamic
   JVM最难的指令
   lambda表达式或者反射或者其他动态语言scala kotlin，或者CGLib ASM，动态产生的class，会用到的指令



# Garbage Collector GC tuning

> **本章目标**
>
> ​		熟悉GC常用算法，熟悉常见垃圾收集器，具有实际JVM调优实战经验



# Contents 

- what is garbage
- how to find it
- GC algorithms
- available collectors
- tuning



# what is garbage

没有引用指向的对象都叫做垃圾

**java和C++ GC回收的区别:**

![image-20200520153707084](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\javaVSC++.png)





# How to find a grabage？

如何找到垃圾: 

引用计数：

![image-20200520153906472](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\引用计数的方法.png)

引用计数不能解决的情况:

互相引用：  A、B、C之间互相引用。

![image-20200520154153636](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\引用计数的互相引用.png)



根可达算法:

![image-20200520154316408](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\根可达算法.png)



哪些是跟对象:

![image-20200520154512434](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\根对象的范围.png)



> Python语言使用的就是 引用计数。



# GC Algorithms （GC 的常用算法）

- Mark-Sweep（标记清除）
- Copying（拷贝）
- Mark-Compact（标记压缩）

## Mark-Sweep

![image-20200520155424540](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\标记清除.png)



![image-20200520155341136](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\标记清除的详细说明.png)

> 伊甸区的存活对象比较少，所以标记清除算法不适合伊甸区。

## Copying

![image-20200520155833957](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\Copying算法.png)



![image-20200520160344615](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\Copy算法详解.png)





## Mark-Compact

![image-20200520160503285](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\标记压缩算法.png)



![image-20200520160610852](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\标记压缩算法详解.png)



## 堆内存逻辑分区


#### 4.JVM内存分代模型（用于分代垃圾回收算法）

1. 部分垃圾回收器使用的模型

   > 除Epsilon ZGC Shenandoah之外的GC都是使用逻辑分代模型
   >
   > G1是逻辑分代，物理不分代
   >
   > 除此之外不仅逻辑分代，而且物理分代

2. 新生代 + 老年代 + 永久代（1.7）Perm Generation/ 元数据区(1.8) Metaspace
   1. 永久代 元数据 - Class
   2. 永久代必须指定大小限制 ，元数据可以设置，也可以不设置，无上限（受限于物理内存）
   3. 字符串常量 1.7 - 永久代，1.8 - 堆
   4. MethodArea逻辑概念 - 永久代、元数据
   
3. 新生代 = Eden + 2个suvivor区 
   1. YGC回收之后，大多数的对象会被回收，活着的进入s0
   2. 再次YGC，活着的对象eden + s0 -> s1
   3. 再次YGC，eden + s1 -> s0
   4. 年龄足够 -> 老年代 （15 CMS 6）
   5. s区装不下 -> 老年代
   
4. 老年代
   1. 顽固分子
   2. 老年代满了FGC Full GC
   
5. GC Tuning (Generation)
   1. 尽量减少FGC
   2. MinorGC = YGC
   3. MajorGC = FGC
   
6. 对象分配过程图
   
![image-20200520161717401](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\对象分配过程详解.png)
   
7. 动态年龄：（不重要）
   https://www.jianshu.com/p/989d3b06a49d

8. 分配担保：（不重要）
   YGC期间 survivor区空间不够了 空间担保直接进入老年代
   参考：https://cloud.tencent.com/developer/article/1082730



![image-20200520172542039](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\堆内存逻辑分区.png)



一个对象从出生到消亡

![image-20200520162346086](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\一个对象从出生到消亡.png)



GC概念

![image-20200520162535951](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\GC概念.png)



### 详解

![image-20200520163206401](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\详解.png)



```java
package com.mashibing.jvm.c5_gc;

//-XX:-DoEscapeAnalysis -XX:-EliminateAllocations -XX:-UseTLAB -Xlog:c5_gc*
// 逃逸分析 标量替换 线程专有对象分配

public class TestTLAB {
    //User u;
    class User {
        int id;
        String name;

        public User(int id, String name) {
            this.id = id;
            this.name = name;
        }
    }

    void alloc(int i) {
        new User(i, "name " + i);
    }

    public static void main(String[] args) {
        TestTLAB t = new TestTLAB();
        long start = System.currentTimeMillis();
        for(int i=0; i<1000_0000; i++) t.alloc(i);
        long end = System.currentTimeMillis();
        System.out.println(end - start);

        //for(;;);
    }
}
```





#### YGC FGC

![image-20200520164226975](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\YGC FGC.png)



对象何时进入老年代

![image-20200520164355441](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\对象何时进入老年代.png)



总结

![image-20200520161717401](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\对象分配过程详解.png)



> java -XX:+PrintFlagsFinal -version | grep NewSize