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

