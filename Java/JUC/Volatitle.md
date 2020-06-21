#  Volatitle 浅析



## 首先知道为什么需要Volatitle

**存储器的层次结构:** 

![存储器的层次机结构](H:\MsbSpace\Zero\Record-document\Java\JUC\Image\存储器的层次机结构.jpg)

**层次之间的速度:**

![硬件速度的具体值](H:\MsbSpace\Zero\Record-document\Java\JVM\Image\硬件速度的具体值.png)

CPU的处理速度和内存的访问速度之间的速度差距相差还是很大的

Cache Line 可以认为是Cpu Cache中最小的缓存单位；

缓存对齐后面会写，大概意思就是寄存器读取数据，按照4k一块的进行读取，程序运行最好的情况是，每4k进行一次计算，不需要在多次的进行读取，并发量足够大的情况下，程序的处理速度有所提升。

---

由于CPU与内存之间的速度严重不对等，通过传统FSB直连内存的访问方式明显会导致CPU资源收到大量的限制，降低CPU整体的吞吐量，于是在CPU和**主内存**之间增加缓存的设计。

其中L1 Cache又被划分成了L1i（i 是 instruction的首字母）和 L1d（d 是 datad的首字母）这两种有各自专门用途的内存。



## CPU一致性协议

主要说明MESI 协议





