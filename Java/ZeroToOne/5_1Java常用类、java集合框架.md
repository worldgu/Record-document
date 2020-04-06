## Java常用类、java集合框架

StringBuffer类:   线程安全

> String 增强版，字符缓存区，是一个容器
>
> 创建：
>
> ​		StringBuffer sb = new StringBuffer();   // 容器默认大小为16
>
> 常用方法
>
> ​	apped(参数);     //  拼接元素
>
> ​	length();    //  长度
>
> ​	capacity();  //  容器大小

StringBuffer类:   线程安全、效率低，操作时内部加锁synchronized

StringBuilder类:  线程不安全、效率高

### Date

在引用Date这个类时，两个选择:

java.util.Date、java.sql.Date

.sql为.util下的一个子类

![5_1_1](C:\Users\86158\Desktop\后端\Java\ZeroToOne\image\5_1_1.jpg)

```java

Date date = new Date();
//  获取当前时间
date.getTime();
//  转换日期格式
//  DateFormat为抽象类不可直接new出对象
DateFormat dateFormat = new SimpleDateFormat("y-M-d H:m:s");
//将Date类按照规范转换为字符串格式
String str = dataFormat.format(date);
System.out.println(str);
//将字符串转换为对应的日期类
Date d1 = dateFormat.parse("2010-10-10 20:20:20");
System.out.println(d1);
// .......更多方法查看API

//Calender不可直接new，他的访问修饰符是protected，只能在本包或者本类中使用；
Calender calender = Calender.getInstance();
//  输出格列日志 
System.out.println(calender);
//java.util.GregorianCalendar[time=1584970165490,areFieldsSet=true,areAllFieldsSet=true,lenient=true,zone=sun.util.calendar.ZoneInfo[id="Asia/Shanghai",offset=28800000,dstSavings=0,useDaylight=false,transitions=29,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2020,MONTH=2,WEEK_OF_YEAR=13,WEEK_OF_MONTH=4,DAY_OF_MONTH=23,DAY_OF_YEAR=83,DAY_OF_WEEK=2,DAY_OF_WEEK_IN_MONTH=4,AM_PM=1,HOUR=9,HOUR_OF_DAY=21,MINUTE=29,SECOND=25,MILLISECOND=490,ZONE_OFFSET=28800000,DST_OFFSET=0]
//  设置指定时间的日历类
calendar.setTime(d1);
System.out.println(calendar);

```



### Calendar

![5_1_2](C:\Users\86158\Desktop\后端\Java\ZeroToOne\image\5_1_2.jpg)

###  Math

![5_1_3](C:\Users\86158\Desktop\后端\Java\ZeroToOne\image\5_1_3.jpg)

Math.abs(); // 球绝对值

Math.sqrt(2); // 开方

Math.ceil();  //  向上取整

Math.floor();  // 向下取整

Math.pow(2,3);  // 2的3次方



### 枚举

![5_1_4](C:\Users\86158\Desktop\后端\Java\ZeroToOne\image\5_1_4.jpg)

枚举类的一般写法:

```java
public enum EventEnum {
  
    LAUNCH("lanuch"),PAGEVIEW("pageview"),EVENT("event");
 
    EventEnum(String name){
        this.name = name;
    }
    
    private String name;
    
    public void show(){
        System.out.println(this.name);
        //  values() 获取所有的枚举
        EventEnum[] ee = values();
        /**
        *  打印输出所有的枚举
        *  打印结果为:
        *  		LAUNCH
        *  		PAGEVIEW
        *  		EVENT
        */
        for(int i=0;i<ee.length;i++){
            System.out.println(ee[i])
        }
    }
    
}


/**
*  调用实现
*/
public calss Test {
    
    public static void main(String[] args) {
        EventEnum ee = EventEnum.LAUNCH;
        EE.show();  //  返回 lanuch
        
        //  注意这个调用的是name,是这个枚举的name
        String name = EventEnum.PAGEVIEW.name();
        System.out.println(name);  //  PAGEVIEW
        
    }
}
```



#### 枚举

---

> 枚举类型:
>
> 1. 只能够取特定值的一个
> 2. 使用enum关键值
> 3. 所有的枚举类型隐形地继承自java.lang.Enum。(枚举实质上还是类！！！**而每个被枚举的成员实质就是一个枚举类型的实例**，他们默认都是public static final的，可以直接通过枚举类型名直接使用他们。)
> 4. 强烈建议当你需要定义**一组常量**时，使用枚举类型。



### 总结

- 字符串
  - String       :字符串处理浪费内存
  - StringBuffer :线程安全
  - StringBuilder :线程不安全
- 日期与时间
  - Date
  - DateFormat
  - SimpleDateFormat :格式化日期
  - Calendar
- 枚举类型
  - Enum
- 数学
  - Math
  - Random































