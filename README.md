# esquel-LPD-WeChat
## Use User Technology
* Nodejs(Express,WeChat)
* Microsoft Visual Studio Core
* Ngrok
* WeChat Debug(http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)


# Create Project
## 使用Express创建项目
* npm 安装 express(命令 npm install express -g)
* express 创建项目(命令 express WeChat-Bot)
* 进入WeChat-Bot目录(命令 cd WeChat-Bot)
* npm 安装wechat(命令 npm install wechat -save)
* npm 安装依赖包(命令 npm install)
* 启动项目(命令 npm start)(默认端口3000)

# Logger
## 加入日志功能
* npm 安装fs(命令 npm install fs -save)
* 在WeChat-Bot中创建文件夹log

# WeChat
## 加入wechat功能
* wechat需要配置微信的token/appid/encodingAESKey等信息
var wechat = require('wechat');
var config = {
  token: 'weixin',
  appid: 'wxf6d0ac7f84dc22fb',
  encodingAESKey: 'ZEtViedarf49EUOCDeu45pqhkZhKPFBjSHI2DynP4vq',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false 
};
* express监控/(根目录)或wechat(根目录下的wechat地址)来对消息进行回复
app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上 
  var message = req.weixin;

  console.log(message);

  if(message.MsgType === 'text')
  {    
      res.reply('这是一个自动回复');    
  }
  else if(message.MsgType === 'voice')
  {
    // res.reply({
    //   type: "image",
    //   content: {
    //     mediaId: 'itf0OMdyRZF9hP3xwUAYaEQ3avr_ZQMUryoHzYU9kXMdpHMu7RA3aRnPsM7g5fU_'
    //   }
    // });
  }
  else if(message.MsgType === 'image')
  {
    res.reply([
      {
        title: '文章提示',
        description: '返回的是文章',
        picurl: 'http://pic002.cnblogs.com/images/2011/159097/2011102917303125.jpg',
        url: 'http://doxmate.cool/node-webot/wechat/api.html'
      }
    ]);
  }  
}));

# Publish
## 使用ngrok将本机的站点发布至公网
* 在ngrok目录打开命令ngrok http 3000(这个端口就是Nodejs在代码中默认配置的)
* 将生成的公网目录地址配置至微信公众号的URL当中(请记住，如在代码中监控的是根目录下的wechat地址，则也需要在微信公众号的URL地址后面加入wechat)
