# String,StringBuffer,StringBuilder的区别



## String

String类是不可变类，即一旦一个String对象被创建以后，包含在这个对象中的字符序列是不可改变的，直至这个对象被销毁。

![image-20200615171715071](H:\MsbSpace\Zero\Record-document\Java\JavaEE\IMAGE\String赋值图.png)

详细解释:

> 有两种情况：
>
> 1. 如果你是String a = "aaa"; a = a + "bbb",则会根据你字符串常量池是否有"aaabbb",有就不会新建，a存在栈中,作为引用，指向那个已经存在字符常量池里面的"aaa",没有就会在字符串常量池新生成一个"aaabbb". 
> 2. 如果你是String x = new String("aaa"); 首先会在堆中生成一个new String("aaa")对象,然后还是根据你字符串常量池是否有"aaa",如果有则堆中只会创建一个new String("aaa")对象，如果没有则会在字符串常量池创建"aaa",然后拷贝一份到堆中,所以堆中总共创建了两个对象。所以这种情况可能是生成一个，也可能是生成2个。 
>
> 如果有错恳求指正，勿喷,谢谢。 

## StringBuffer (线程安全)

>  StringBuffer对象是一个字符序列可变的字符串，它没有重新生成一个对象，而且在原来的对象中可以连接新的字符串。

  StringBuffer对象则代表一个字符序列可变的字符串，当一个StringBuffer被创建以后，通过StringBuffer提供的append()、insert()、reverse()、setCharAt()、setLength()等方法可以改变这个字符串对象的字符序列。一旦通过StringBuffer生成了最终想要的字符串，就可以调用它的toString()方法将其转换为一个String对象。

## StringBuilder
  StringBuilder类也代表可变字符串对象。实际上，StringBuilder和StringBuffer基本相似，两个类的构造器和方法也基本相同。不同的是：StringBuffer是线程安全的，而StringBuilder则没有实现线程安全功能，所以性能略高。

三者继承结构

![image-20200615171156754](H:\MsbSpace\Zero\Record-document\Java\JavaEE\String继承图.png)



三者的区别：

（1）字符修改上的区别（主要）

String：不可变字符串；

StringBuffer：可变字符串、效率低、线程安全；

StringBuilder：可变字符序列、效率高、线程不安全；

（2）初始化上的区别，String可以空赋值，后者不行，报错

```java
①String
StringBuffer s = null;   
StringBuffer s = “abc”;   
②StringBuffer
StringBuffer s = null; //结果警告：Null pointer access: The variable result can only be null at this location
StringBuffer s = new StringBuffer();//StringBuffer对象是一个空的对象
StringBuffer s = new StringBuffer(“abc”);//创建带有内容的StringBuffer对象,对象的内容就是字符串”
```

小结：（1）如果要操作少量的数据用 String；

（2）多线程操作字符串缓冲区下操作大量数据 StringBuffer；

（3）单线程操作字符串缓冲区下操作大量数据 StringBuilder（推荐使用）。

总结表格:

|                            String                            |                         StringBuffer                         |  StringBuilder   |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :--------------: |
| String的值是不可变的，这就导致每次对String的操作都会生成新的String对象，不仅效率低下，而且浪费大量优先的内存空间 | StringBuffer是可变类，和线程安全的字符串操作类，任何对它指向的字符串的操作都不会产生新的对象。每个StringBuffer对象都有一定的缓冲区容量，当字符串大小没有超过容量时，不会分配新的容量，当字符串大小超过容量时，会自动增加容量 | 可变类，速度更快 |
|                            不可变                            |                             可变                             |       可变       |
|                                                              |                           线程安全                           |    线程不安全    |
|                                                              |                       多线程操作字符串                       | 单线程操作字符串 |



## 继续深入

### String 源码注释

![image-20200615175031063](H:\MsbSpace\Zero\Record-document\Java\JavaEE\IMAGE\String源码.png)

**Stirng**类表示字符串。所有 Java程序中的字符串，例如{@code "abc"}，是作为该类的实例实现。

字符串是常量;它们的值在它们之后不能改变,创建。字符串缓冲区支持可变字符串。因为字符串对象是不可变的，它们可以被共享

### StringBuffer

![image-20200615175341976](H:\MsbSpace\Zero\Record-document\Java\JavaEE\IMAGE\StringBuffer源码.png)

由上可以看出 StringBuffer 通过了synchronized关键字保证了线程的安全性，但是效率会降低，又由于StringBuffer不需要重新开辟新的空间进行重新指向等一系列操作，提高了IO的处理速度，比String快，但是在单机并发量不高的情况下，StringBuffer又因为是线程安全的所以处理速度会有所降低。

### StringBuilder

![image-20200615175927049](H:\MsbSpace\Zero\Record-document\Java\JavaEE\IMAGE\StringBuilder源码.png)

StringBuilder提供了String的可变性，提供了内存的处理速度，相比StringBuilder去掉了synchronized关键字，提升了效率，降低了高并发时的安全性。