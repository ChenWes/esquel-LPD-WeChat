var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var wechat = require('wechat');
var winston = require('winston');

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: './log/wechat.log' })
    ]
  });

var config = {
  token: 'weixin',
  appid: 'wxf6d0ac7f84dc22fb',
  encodingAESKey: 'ZEtViedarf49EUOCDeu45pqhkZhKPFBjSHI2DynP4vq',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false 
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//var accessLogStream = fs.createWriteStream(__dirname + '/log/wechat-access.log', {flags: 'a'})
//app.use(logger('combined',{stream: accessLogStream}));
//app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

//以下开始为获取到微信服务器发送过来的消息，并在此处回复消息
//此处监控的是URL的wechat，那么在配置微信的URL时，也需要在主机URL地址后面加入wechat这样才可以获取到数据
app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上 
  var message = req.weixin;
  
  logger.log('info', message);
  //logger.info('Hello again distributed logs');

  if(message.MsgType === 'text')
  {    
      res.reply('这是一个自动回复');    
  }
  else if(message.MsgType === 'voice')
  {
    res.reply({
      type: "voice",
      content: {
        mediaId: 'npKg9Ks7O_iv6DnM0TJqASDWnOftmuf0U_Xo2VkbsEztz8SCbTjrvGq5s_XXkmLk'
      }
    });
  }
  else if(message.MsgType === 'image')
  {
    res.reply({
      type: "image",
      content: {
        mediaId: '_V0Rqkw9xYCzAcKD4grt6R0vPD6dCIkziZyLACTgTE_9tD-lDWFh_cfGvAToyr52'
      }
    });
  }  
  else
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


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
