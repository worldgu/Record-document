重点记录

1. 启动线程的三种方式
   1. new Thread().start();
   2. new Thread(实现Runable方法的类).start();
   3. Exectors.newCachedThreadPool()    拿到线程池之后通过线程池启动一个线程，其实这种方式内部也是通过前面两种实现的。
   4. FutureFask + Callable 

