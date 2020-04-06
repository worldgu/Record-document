##  Redis安装

#### 安装环境

系统: CentOS 6.x   

Redis 版本: http://download.redis.io/releases/redis-5.0.7.tar.gz

**安装:** yum install wget

**下载文件:**  wget http://download.redis.io/releases/redis-5.0.7.tar.gz

**解压文件:**  tar xf redis-5.0.7.tar.gz      

>  解压完成后可以首先读一下文件夹中的  README.md

安装gcc :   yum install gcc

在解压后的redis-5.0.7的文件下执行编译命令  make

将应用安装在系统中 make install PREFIX=/opt/zero

修改  vi /etc/profile  文件最后面添加如下命令

``` shell
export REDIS_HOME=/opt/zero/redis5
export PATH=$PATH:$REDIS_HOME/bin
```

**更新配置**  source  /etc/profile

cd 到解压下中的redis中的utils的目录下执行   ./install_server.sh

然后按照提示内容进行选择:  默认执行端口为6379

service redis_6379 status

查看reids的进程  ps -fe | grep redis

#### 基本补充

> 1. 一个物理机中可以有多个redis实例(进程)，通过port进行区分
> 2. 可执行程序就一份在目录，但是内存中未来的多个实例需要各自的配置文件、持久化目录等资源
> 3.  可以通过这个命令来启动 : service redis_6379 start/stop/status
> 4.   也可以在linux中设置开机启动:   /etc/init.d/***   
> 5. 还可以通过脚本进行启动