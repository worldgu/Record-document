# NPM初识

NPM是随同NodeJS一起安装的包管理工具

- 许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

查看帮助命令

> npm help



1. **更新命令**

```shell
  npm install npm -g
```

2. **命令安装模块**

   ```shell
   $ npm install <Module Name>
   ```

3. **全局安装与本地安装**

   ```shell
   npm install express          # 本地安装
   npm install express -g   # 全局安装
   ```

   **可能遇到的错误:**

   ```shell
   npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 
   # 解决
   npm config set proxy nulll    # 代理设置置空
   ```

   > ### 本地安装
   >
   > - 1. 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
   > - 2. 可以通过 require() 来引入本地安装的包。
   >
   > ### 全局安装
   >
   > - 1. 将安装包放在 /usr/local 下或者你 node 的安装目录。
   > - 2. 可以直接在命令行里使用。

4. **查看安装信息**

   ```shell
   npm list -g
   
   # 查看某模块下的版本号
   npm list <Module Name>
   ```

5. **package.json说明**

   package.json 位于模块的目录下，用于定义包的属性。接下来让我们来看下 express 包的 package.json 文件。

   ### Package.json 属性说明

   - **name** - 包名。
   - **version** - 包的版本号。
   - **description** - 包的描述。
   - **homepage** - 包的官网 url 。
   - **author** - 包的作者姓名。
   - **contributors** - 包的其他贡献者姓名。
   - **dependencies** - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
   - **repository** - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
   - **main** - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
   - **keywords** - 关键字

6.  **卸载模块**

   ```
$ npm uninstall express
   ```
   
   卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：

   ```
$ npm ls
   ```
   
7.    **更新模块**

   ```
$ npm update express
   ```
   
   ------

8.     **搜索模块**

   ```
$ npm search express
   ```

9. **创建模块**

   创建模块，package.json 文件是必不可少的。我们可以使用 NPM 生成 package.json 文件，生成的文件包含了基本的结果。

   ```shell
   $ npm init
   This utility will walk you through creating a package.json file.
   It only covers the most common items, and tries to guess sensible defaults.
   
   See `npm help json` for definitive documentation on these fields
   and exactly what they do.
   
   Use `npm install <pkg> --save` afterwards to install a package and
   save it as a dependency in the package.json file.
   
   Press ^C at any time to quit.
   name: (node_modules) runoob                   # 模块名
   version: (1.0.0) 
   description: Node.js 测试模块(www.runoob.com)  # 描述
   entry point: (index.js) 
   test command: make test
   git repository: https://github.com/runoob/runoob.git  # Github 地址
   keywords: 
   author: 
   license: (ISC) 
   About to write to ……/node_modules/package.json:      # 生成地址
   
   {
     "name": "runoob",
     "version": "1.0.0",
     "description": "Node.js 测试模块(www.runoob.com)",
     ……
   }
   
   
   Is this ok? (yes) yes
   ```

   以上的信息，你需要根据你自己的情况输入。在最后输入 "yes" 后会生成 package.json 文件。

   接下来我们可以使用以下命令在 npm 资源库中注册用户（使用邮箱注册）：

   ```shell
   npm adduser
   Username: mcmohd
   Password:
   Email: (this IS public) mcmohd@gmail.com
   ```

   接下来我们就用以下命令来发布模块：

   ```shell
   npm publish
   ```

   如果你以上的步骤都操作正确，你就可以跟其他模块一样使用 npm 来安装。

10.  **版本号**

    使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码，这里简单介绍一下。

    语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

    - **如果只是修复bug，需要更新Z位。**
    - **如果是新增了功能，但是向下兼容，需要更新Y位。**
    - **如果有大变动，向下不兼容，需要更新X位。**

    版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。
    
11. 设置国内镜像

    ```shell
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    
    # 通过cnpm安装镜像
    cnpm install [name]
    ```