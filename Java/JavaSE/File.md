FileReader

FileWriter

BufferedReader

BufferedWriter

赋值运算符优先级别低于条件运算符，条件运算符优先级别低于算术运算符。

\1. switch选择语句是多分支选择语句，只能处理等值条件判断的情况，表达式可以是int类型、char类型，但不能是double,float类型。(  )

继承是多态的基础，没有继承就没有多态。

对于物理连接，比如数据库连接、输入流输出流、Socket连接等，垃圾回收机制无能为力，必须手动关闭才可以。



<font color="red">数组和集合中的元素可以是任何数据类型，包括基本类型和引用类型</font>

LinkedHashMap是一种有序的HashMap，查询速度快，便于进行添加删除操作

<font color="red">一个File对象可以代表一个文件或目录，它可以获取文件和目录属性，也可以访问文件内容。</font>



***\*方法重载和方法重写（覆盖）的区别。\****

|      | 英文     | 位置不同     | 修饰符   | 返回值   | 方法名 | 参数 | 抛出异常 | 方法体 |
| ---- | -------- | ------------ | -------- | -------- | ------ | ---- | -------- | ------ |
| 重载 | overload | 同一个类中   | 无关     | 无关     | 相同   | 不同 | 无关     | 不同   |
| 重写 | override | 子类和父类间 | 大于等于 | 小于等于 | 相同   | 相同 | 小于等于 | 不同   |



**1.** ***\*写出java.lang.Object类的六个常用方法的声明并说明其作用。（6分）\****

1) public boolean ***\*equals\****(java.lang.Object) 比较内容

2) public native int hashCode() 哈希码

3) public java.lang.String toString() 变成字符串

4) public final native java.lang.Class getClass() 获取类结构信息

5) protected void finalize() throws java.lang.Throwable 垃圾回收前执行的方法

6) protected native Object clone() throws java.lang.CloneNotSupportedException 克隆

7) public final void wait() throws java.lang.InterruptedException 多线程中等待功能

8) public final native void notify() 多线程中唤醒功能

9) public final native void notifyAll() 多线程中唤醒所有等待线程的功能