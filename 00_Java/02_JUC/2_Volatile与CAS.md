## Volatile与CAS

> 伊甸区什么时候进入Old区  通过一个参数进行设置
>
> #### -XX:PretenureSizeThreshold 的默认值和作用
>
> https://www.jianshu.com/p/f7cde625d849

Lock与synchronized进行锁定时是有区别的

Lock的实现使用的是CAS的操作，在等待自旋时，是占用CPU时间的。自旋是积极的等待。

synchronized等待时，是不占用CPU时间的，是进入wait对列中的。



创建守护线程?



### volatile







### 间歇性复习

1. synchronized
2. volatile
3. atomicXXX -> CAS
4. increment -> sync atomicXXX LongAdder





### ReentrantLock

可重入锁



























































