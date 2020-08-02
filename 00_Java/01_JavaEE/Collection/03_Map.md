## Map

- Map
  - 特点key-value映射
- HashMap
  - Key无序 唯一（Set）
  - Value无序 丌唯一(Collection)
- LinkedHashMap
  - 有序的HashMap 速度快
- TreeMap
  - 有序 速度没有hash快
- 问题：Set不Map有关系吗？
  - 采用了相同的数据结构，只用于map的key存储数据,以上是Set



## Map接口

![image-20200615233610956](H:\MsbSpace\Zero\Record-document\Java\JavaEE\Collection\IMAGE\Map接口.png)





## Collections工具类



Collections 和Collection 不同，前者是集合的操作类，后者是集合
接口

- Collections 提供的静态方法
  - addAll():批量添加
  - sort():排序
  - binarySearch()：二分查找
  - fill()：替换
  - shuffle():随机排序
  - reverse():逆序



## 集合总结

![image-20200615233744546](H:\MsbSpace\Zero\Record-document\Java\JavaEE\Collection\IMAGE\集合总结.png)



![image-20200615233810976](H:\MsbSpace\Zero\Record-document\Java\JavaEE\Collection\IMAGE\集合总结_02)



# <font color="red" >面试题</font>
- 集合与数组的比较
- Collection和Collections的区别
- ArrayList和LinkedList的联系和区别
- Vector和ArrayList的联系和区别
- HashMap和Hashtable的联系和区别



1. 集合与数组的比较

    数组不是面向对象的，存在明显的缺陷，集合弥补了数组的一些缺点，比数组更灵活更实用，可大大提高软件的开发效率，而且不同的集合框架类可适用丌同场合。具体如下：

   - 1：数组能存放基本数据类型和对象，而集合类中只能存放对象。
   - 2：数组容易固定无法动态改变，集合类容量动态改变。
   - 3：数组无法判断其中实际存有多少元素，length只告诉了数组的容量，而集合的size()可以确切知道元素的个数
   - 4：集合有多种实现方式和丌同适用场合，丌像数组仅采用顺序表方式
   - 5：集合以类的形式存在，具有封装、继承、多态等类的特性，通过简单的方法和属性即可实现各种复杂操作，大大提高了软件的开发效率

2. Collection和Collections的区别

   - Collection是Java提供的集合接口，存储一组不唯 一，无序的对象。它有两个子接口List和Set。
   - Java还有一个Collections类，与门用来操作集合类，它提供了一系列的静态方法实现对各种集合的搜索、排序、线程安全化等操作。

3. ArrayList和LinkedList的联系和区别

   - ArrayList实现了长度可变的数组，在内存中分配连续空间。遍历元素和随机访问元素效率比较高。
   - LinkedList采用链表存储方式。插入、删除元素效率比较高

4. Vector和ArrayList的联系和区别

   - 实现原理相同，功能相同，都是长度可变的数组结构，很多时候可以互用
   - 两者的主要区别如下
     - Vector是早期的JDK接口，ArrayList是替代Vector的新接口
     - Vector线程安全，ArrayList重速度轻安全，线程非安全
     - 长度需要增长时，Vector默认增长一倍，ArrayList增长50%(1.5+1)

5. HashMap和Hashtable的联系和区别

   - 实现原理相同，功能相同，底层都是哈希表结构，查询速度快，在很多情况下可以互用
   - 两者的主要区别如下
     - Hashtable是早期的JDK提供的接口，HashMap是新版的JDK提供的接口
     - Hashtable继承Dictionary类，HashMap实现Map接口
     - Hashtable是线程安全，HashMap线程非安全
     - Hashtable不允许null值，HashMap允许null值