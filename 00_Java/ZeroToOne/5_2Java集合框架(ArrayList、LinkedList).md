## 容器

- 容器的概念
- 容器API
- **Collection**接口
- **Iterator**接口
- **Iterable**接口
- **Set** 接口
- **Comparable**接口
- **List**接口
- **Map**接口



*面向接口编程*

数组需要初始化长度

集合框架不固定长度



**Collection**

JUC  --->>>>>  java.util.Concurrent   高并发下使用较多

java.util.concurrent/LinkedBlockingQueue



Java集合框架提供了一套性能优良、使用方便的接口和类，它们位于java.util包中

![5_1_5](C:\Users\86158\Desktop\后端\Java\ZeroToOne\image\5_1_5.jpg)



Collection是一个接口

Collections是一个工具类



List有三个子类: ArrayList、LinkedList、Vector

### Vector

这个 



### Iterator接口

---

所有实现了Collection接口的容器类都有一个iterator方法用以返回一个实现了Iterator接口。

Iterator对象称作迭代器，用以方便的实现对容器内容元素的遍历操作。

Iterator接口定义了如下方法:

```java
boolean  hasNext();      //判断是否有元素没有被便利
Object  next();			//返回游标当前位置的元素并将游标移动到下一个位置
void remove();			//删除游标左面的元素，在执行完next之后该操作只能执行一次
```



### ArrayList 和LinkedList



#### ArrayList

1. 遍历元素和随机访问元素的效率比较高
2. 插入、删除等操作频繁时性能低下
3. 线程安全
4. 集合扩容，每次当前的1.5倍

#### LinkedList

1. 插入、删除元素时效率比较高
2. 查找效率较低
3. 线程不安全
4. 集合扩容，每次当前的2倍











## Set接口中的实现类

![5_2_1](C:\Users\86158\Desktop\后端\Java\ZeroToOne\image\5_2_1.jpg)



### Set常用实现类

![5_2_2](C:\Users\86158\Desktop\后端\Java\ZeroToOne\image\5_2_2.jpg)



### TreeSet

#### 红黑树、是一种特殊的平衡树

二叉树、平衡树、查找树、搜索树

树、有一个分支叫多元树、或者叫多支树。

AVL树，  本身而是一个二叉树。 AVL需要经过 1-N次的旋转才能达到平衡，这是一个严格意义上的平衡。

红黑树是在AVL树之上来实现的这个东西

红黑树牺牲了部分平衡性以换取插入/删除操作时少量的旋转操作，提升了查找的性能。

### HashSet操作

总结

> HashSet是如何保证元素的唯一性的呢?
>
> 答:  是通过元素的两个方法，hashCode和equals方法来完成
>
> 如果元素的HashCode值相同，才会判断equals是否为true
>
> 如果元素的HashCode值不同，不会调用equals方法

### TreeSet

> TreeSet
>
> 采用二叉树(红黑树)的存储结构
>
> 优点: 有序（排列后的升序）查询速度比List快
>
> 缺点: 查询速度没有HashSet快

```java
package com.mashibing;

import java.util.*;

/**
 * @author: 马士兵教育
 * @create: 2019-09-08 16:36
 */
/*
*   1、set中存放的是无序，唯一的数据
*   2、set不可以通过下标获取对应位置的元素的值，因为无序的特点
*   3、使用treeset底层的实现是treemap,利用红黑树来进行实现
*   4、设置元素的时候，如果是自定义对象，会查找对象中的equals和hashcode的方法，如果没有，比较的是地址
*   5、树中的元素是要默认进行排序操作的，如果是基本数据类型，自动比较，如果是引用类型的话，需要自定义比较器
*       比较器分类：
*         内部比较器
*               定义在元素的类中，通过实现comparable接口来进行实现
*         外部比较器
*               定义在当前类中，通过实现comparator接口来实现，但是要将该比较器传递到集合中
*         注意：外部比较器可以定义成一个工具类，此时所有需要比较的规则如果一致的话，可以复用，而
*               内部比较器只有在存储当前对象的时候才可以使用
*               如果两者同时存在，使用外部比较器
*               当使用比较器的时候，不会调用equals方法
* */
public class SetDemo implements Comparator<Person> {
    public static void main(String[] args) {
//        Set set = new HashSet();
//        set.add("123");
//        set.add(1);
//        set.add(true);
//        set.add("123");
//        System.out.println(set);
//        Iterator iterator = set.iterator();
//        while (iterator.hasNext()){
//            System.out.println(iterator.next());
//        }
//        System.out.println("---------");
//        //将while循环改成for循环,推荐使用
//        for(Iterator iter = set.iterator(); iter.hasNext();){
//            System.out.println(iter.next());
//        }

//        TreeSet treeSet = new TreeSet();
//        treeSet.add(34);
//        treeSet.add(1);
//        treeSet.add(65);
//        System.out.println(treeSet.ceiling(1));
//        System.out.println(treeSet);
//        HashSet hashSet = new HashSet();
//        hashSet.add(new Person("zhangsan",12));
//        hashSet.add(new Person("zhangsan",12));
//        hashSet.add(new Person("lisi",13));
//        System.out.println(hashSet);

        TreeSet treeSet = new TreeSet(new SetDemo());
        treeSet.add(new Person("lisi",15));
        treeSet.add(new Person("wangwu",13));
        treeSet.add(new Person("maliu",12));
        treeSet.add(new Person("zhangsan",19));
        treeSet.add(new Person("zhangsan",12));
        System.out.println(treeSet);


    }

    @Override
    public int compare(Person o1, Person o2) {
        if(o1.getAge()>o2.getAge()){
            return -1;
        }else if(o1.getAge() < o2.getAge()){
            return 1;
        }else{
            return 0;
        }
    }
}

```



```java
package com.mashibing;

import java.util.Objects;

/**
 * @author: 马士兵教育
 * @create: 2019-09-21 15:32
 */
public class Person implements Comparable{
    private String name;
    private int age;

    public Person(){

    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age &&
                Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {

        return Objects.hash(name, age);
    }

    /**
     * 此比较器按照name的长度来进行比较
     * @param o
     * @return
     */
    @Override
    public int compareTo(Object o) {
        Person p  = (Person) o;
        if (p.name.length()>this.name.length()){
            return -1;
        }else if(p.name.length()<this.name.length()){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```



