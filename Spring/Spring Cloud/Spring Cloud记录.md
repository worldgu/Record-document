## Spring Cloud 全栈快速上手(三)

> Eureka高可用远程服务调用

Eureka 的高可用集群搭建以及各个参数的详解

Provider(服务提供方)的注册到Eureka

Consumer(服务调用方)通过RestTemp..以及Ribbon通过负载均衡策略进行服务对的调用。

## Spring Cloud 全栈快速上手(四)

> 服务手动上下线
>
> ribbon
>
> 负载均衡

集成actuator，可以进行手动 的上下限  up  / shutdown

添加安全保护机制 -- 添加 security

jrebel好用些

Devtools的热部署就需要重启一次

手写负载均衡策略

修改Cunsumer端请求后台服务时的请求地址拼接，  还需要在application中的RestTemplet的Bean中添加@LoadBanlance注解



## Spring Cloud 全家桶 Hoxton SR3 (五)

> Restful风格的API、远程服务器调用RestTemplate、声明式服务调用Feign

Restful 可以用程序动态调用

Feign 必须先声明才能用

**Web API 的设计与开发**

Spring Cloud  Rest Template 调用服务时硬编码

Http协议   --->  异构平台

soap

Dubbo    

axis2

grpc

Rest Template底层封装的是JDK中的URLConnection

**为什么要使用Rest**

**RestTemplate使用**

**Feign原生调用**

---

### 概念

> 计算机名，计算机全称，计算机描述，工作组



## Spring Cloud 全家桶 Hoxton SR3(六)

> Feign 常用调用方式
>
> Ribbon的重试策略与服务恢复
>
> Hystrix原理
>
> Hystrix独立使用
>
> Hystrix整合RestTemplate
>
> Hystrix整合Feign

Hystrix ->  熔断、降级、限流

Jfinal  詹波

将对象转换为String  -->  **ToStringBuilder.reflectionToString(对象);**

流程:  浏览器-->  consumer --> 中间接口包  --> provider

@RequestParamParam解决请求中属性名与形参名不一致，无法绑定的问题



限流  ->  降级  ->  熔断

手写时可能使用 AOP、代理进行实现 限流、降级、熔断

本节课户主要讲了:

**Feign的负载均衡、重试机制**

**手动实现Hystrix 降级、熔断、隔离**



在**服务提供方**进行限流使用:  倒立的计数器、漏斗、google提供的令牌总算法

熔断最好的是在网关的时候进行熔断

服务提供方是有必要进行限流的



## Spring Cloud 全家桶 Hoxton SR3 (七)

> 本节课目标
>
> Hystrix feign 整合
>
> Hystrix Dashboard服务监控
>
> Hystrix线程隔离，信号量隔离
>
> 网关概念
>
> 启用Zuul及常见应用
>
> 网关替代方案

兜底数据

servlet 3.1纯响应式编程：  异步指的是处理连接与线程之间的异步，用户和服务之间没有办法达到异步，真正想让用户和服务之间达成异步需要的是netty,建立起用户与服务之间的长连接，半长连接；

rbMQ使用的是长轮询；

Http无法实现长轮询，因为超时时间无法控制。

Hystrix线程池隔离:  官方推荐，Hystrix的线程池是异步的，可以处理更多的请求

Hystrix信号量隔离:  Hystrix的信号量走的是tomcat的work线程池隔离



一个请求多次请求返回不了数据进行**熔断** ，然后**降级**返回**兜底数据**，在熔断和降级前进行**隔离**

线程池内部:  服务异常隔离，代码健壮，不可能出问题的情况下计算速度飞快。



信号量使用的是Tomcat的work线程无法进行隔离，信号量中的线程出现异常后，work线程也会出现异常。

线程池使用的是Tomcat的work线程的一部分，将work中的一部分线程拿了出来，建立连接，线程池的线程出现异常后，不影响work线程

线程池是为了控制IO阻塞，worker100个线程，远程只能用10个，剩下的90多个线程给别的使用了。



Tomcat总的worker线程分为两个部分:

远程调用服务的线程；

本地运行服务的线程；

jsonp  跨域请求



Feign 整合Hystrix，RestTemplate整合Hystrix,Hystrix信号量与线程池隔离，Hystrix的Dashboard服务监控

## Spring Cloud 全家桶 Hoxton SR3 (八)

> 网关:  Zuul，  gateway
>
> 链路追踪
>
> Openresty

Zuul与nginx的区别

路由是一个功能，反向代理是一种模式

基于隧道模式的网关  叫做业务网关  Zuul、Nginx,kong



隧道模式与路由模式(DR)

隧道模式请求方与服务方必须通过该网关

路由模式不接入请求调用方与服务方任何事

**所有拒绝策略，尽可能的前置**



链路追踪

Sleuth单独

zipkin(需要Sleuth将信息上报到zipkin上面)，

zipkin的客户端在zipkin的官网上面现在一个jar(大概50多M)进行启动

Skywalking

链路追踪   zipkin    ArchSummit

## Spring Cloud 全家桶 Hoxton SR3 (九)

> 什么是配置中心及应用场景
>
> SpringCloud Config + GitHub单机搭建
>
> SpringCloud Config 配置命名规则
>
> SpringCloud Config + GitHub 分支读取
>
> 微服务整合 SpringCloud Config 加载远程配置
>
> SpringCloud Config微服务手动刷新与自动刷新配置
>
> 第一阶段课程总结

nacos

apollo

Rabbit面向与应用的开发

KafKa面向与大的问题，类似于数据中转开发



Spring Cloud Bus 的底层实现是MQ(消息中间件)

MQ需要支持amqp协议才能使用，统一化的接口标准，Rabbit与Kafka都是支持的。