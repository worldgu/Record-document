## Linux 常用命令

## 用户相关操作

```shell
１，查看用户 cat /etc/passwd

２，删除用户 userdel 用户名

３，查看组 cat /etc/group

4，删除组 groupdel 组名

5，查看可以登录系统的用户：cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1

6，查看系统版本：cat /etc/redhat-release
```



## 修改Ip

```shell
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```



## 修改文件权限

然后要给文件file赋权的话，就可以使用Linux命令：

chmod 777 file
1
owner、group和others三种身份各自的三个权限，用u、g、o代表三种身份，用a（all）代表所有身份，所以还有下面的Linux命令

chmod u|g|o|a  =(设置权限)|+(添加权限)|-(减少权限)  r|w|x  文件或者目录



## 防火墙相关操作

```shel
1、直接关闭防火墙

systemctl stop firewalld.service          #停止firewall
systemctl disable firewalld.service    #禁止firewall开机启动

2、设置 iptables service

yum -y install iptables-services
如果要修改防火墙配置，如增加防火墙端口3306
vi /etc/sysconfig/iptables 
增加规则
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT

保存退出后
systemctl restart iptables.service #重启防火墙使配置生效
systemctl enable iptables.service #设置防火墙开机启动
————————————————
版权声明：本文为CSDN博主「NPException」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_36850813/article/details/91353864
```



