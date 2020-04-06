##  LInux命令





/var/run/   

/etc/init.d



### [Linux中关机，重启，注销命令](https://www.cnblogs.com/ZGreMount/p/7668749.html)

关机：

　　shutdown -h now  #立刻关机重启，工作中常用

　　shutdown -h +1   #1分钟后关机

　　init 0

　　halt             #立即停止系统，需要人工关闭电源

　　halt -p           #

　　poweroff　　　　  #立即停止系统，并且关闭电源

重启：

　　reboot　　　　　　#工作中常用

　　shutdown -r now    #工作中常用

　　shutdown -r +1　　 #一分钟后重启

　　init 6

注销：

　　logout

　　exit　　　　　　#工作中常用

　　ctrl+d　　　　　#工作中常用



### 文件搜索

**which** : 用来查找可执行文件 加上 ’a‘ 显示所有的查找结果，否则只显示第一个。

**whereis** : 可用来寻找特定文件，使用命令 **whereid filename** 能列出所有和该文件相关的文件名；

> 另外 whereis 命令还可以加参数， -b表示只寻找二进制文件， -s表示只寻找源文件, -m表示在帮助文件目录下（man）下寻找

**locate**命令。使用格式为 # locate filename,他最大的特点就是只要包含有filename文件名的文件都会列出来，如果你只记得部分文件名，可以使用这个命令

**find**命令，命令格式为： find path 参数 ,

最常用的使用find搜索某个路径下的某个文件名，命令为 ：

\**find /home -name passwd** 表示搜索家目录下的passwd文件

另外**find**接参数可以搜索一些指定条件的文件，比如要搜索某个目录下今天修改过内容的文件，使用命令：# find / -mtime 0

这里/表示根目录,-mtime表示修改过， 0数字表示0天之前也就是今天。更多命令可以使用相关的手册，**man command**。