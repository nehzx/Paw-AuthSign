# paw 插件开发

> 简介： Paw 是一个功能齐全的 HTTP 客户端
>
> 1. 测试、描述、构建和使用的 API。
> 2. macOS 界面来编写请求、检查服务器响应、生成客户端代码
> 3. 导出 API 定义。
> 4. 简单的插件编写

插件类型总共有三种：[官方地址](https://paw.cloud/extensions/) 1. 代码生成类插件；2. 文档导入型插件；3. 动态类型值插件。
由于网上针对paw 开发插件的中文资料比较少。这里写一下开发的过程。主要记录动态类型值插件的开发；

>开发环境
>
>1. macmini M1 (系统12.0.1)
>2. nodejs v16.10.0

## 一、 配置开发环境

如果不需要使用其他的js包的话简单的使用，按照官网的说明就可以直接写出来一个插件：[地址](https://paw.cloud/docs/extensions/create-dynamic-value)

这里按照[官方demo](https://github.com/luckymarmot/Paw-DigestAuthDynamicValue/) 复制了一个进行简单的修改来使用的并没有创建模版的脚手架可以使用。一下是完成步骤


1. 创建文件夹 文件目录如下

```
Paw-AuthSign
    ├── LICENSE
    ├── README.md
    ├── build
    ├── package.json  配置文件目录
    ├── src
    │   └── AuthSign.js // 主要代码
    └── webpack.config.js // 脚本配置
```

2. 配置 Extension Identifier（标识符）反域名命名 （e.g. com.mycompany.MyImporter）

```json
const name = 'AuthSign'; //插件名称

module.exports = {
    entry: [
        `./src/${name}.js`
    ],
    output: {
        filename: `${name}.js`,
        path: path.resolve(__dirname, 'build', `com.nehza.PawExtensions.${name}`) // 配置输出插件名称
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['safari >= 7']
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    }
};
```


3. 创建插件js文件

```
touch AuthSign
```

4. 创建represented 类

```javascript
class AuthSign {
  // 唯一表示
  static identifier = 'com.nehza.PawExtensions.AuthSign' 
  // 动态值
  static title = 'AuthSign'  
  // 插件说明地址
  static help = 'https://github.com/nehzx/AuthSign.git' 
  // 动态值可以输入多个
  static inputs = [
    DynamicValueInput('authSecret', 'authSecret', "String"),
  ] 

  // 入口方法
  evaluate(context) {
    if (context.runtimeInfo.task != 'requestSend') {
      return '** digest is only generated during request send **'
    }
    // 获取请求对象
    let request = context.getCurrentRequest()
    // 获取输入值
    console.log(this.authSecret)
    return "返回动态值"
  }
}
registerDynamicValueClass(AuthSign)
```

[contete 对象的方法和属性](https://paw.cloud/docs/reference/ExtensionContext) 请参考官方文档

5. 编写自己想要开发的动态值

## 二、 开发插件说明

这里说下主要的开发逻辑：

说明：插件动态值是在发送请求之前执行的。一般都是处理动态签名或者是动态添加参数。还有就是输入指定的值根据请求计算得出新的值，这里对测试比较友好。比如输入一个字典或者数组或者是一个excl表格动态的获取账号密码可以测试登陆。

1. 根据context 上下文获取 request `context.getCurrentRequest()`
2. 获取请求参数
3. 获取input 参数
4. 输出结果


## 三、插件调试

1. 编译代码。`npm run build` 
2. 复制编译后的代码 复制到插件目录
3. 添加动态参数并发送请求查看执行结果

这里也可以执行脚本` ./script.sh` 如果路径不对请查看偏好设置进行修改

## 参考资料

[参考项目](https://github.com/luckymarmot/Paw-DigestAuthDynamicValue)
[官网文档](https://paw.cloud/docs/extensions/create-dynamic-value)

## demo 使用

### Prerequisites

```shell
npm install
```

### Build

```shell
npm run build
```

## License

This Paw Extension is released under the [MIT License](LICENSE). Feel free to fork, and modify!

Copyright © 2021 Paw Inc.




