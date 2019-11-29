---
sidebar: auto
title: node 转发接口请求
lang: zh-CN
---


### Node 转发接口请求

使用`request` 包转发接口,每次请求登录表单认证接口 `headers` 头部`Cookie`字段都要置位空，否则会缓存上一个客户端连接请求过来的登录信息，造成第二个客户端连接本地node服务请求第三方登录接口认为已经登陆了
* 注意点
* 1：传递 formData 提交第三方 form 接口请求，登录认证成功后，获取 `response.headers['set-cookie']` 的值，
* 2：将 `response.headers['set-cookie']` 的获取的值 express router res 对象写入客户端cookie res.cookie('S_SESSIONID', phpsession);
* 3：登录认证成功后,每次客户端请求接口都带上刚刚获取的第三方cookie,第三方接口则会认为登录认证成功，返回数据

````javascript
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var router = express.Router();


// rejectUnauthorized 忽略安全警告
// ca                 证书
// jar                启用cookie
// var request = request.defaults({
//     jar: true
// });


//设置模板目录
app.set('views', path.join(__dirname, './static/views'));

// 设置引擎后缀.  index.html 中的内容可以是 ejs 代码
ejs.delimiter = "?";

app.engine('html', ejs.renderFile);

// 设置模板引擎
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './', 'favicon.ico')));

app.set('showStackError', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
// 设置响应类型为 json 数据格式
// parse various different custom JSON types as JSON
app.use(bodyParser.json({
    type: 'application/json'
}))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({
    type: 'application/vnd.custom-type'
}))

// parse an HTML body into a string
app.use(bodyParser.text({
    type: 'text/html'
}));
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
// 静态资源目录
app.use(express.static(path.join(__dirname, './static'), {
    maxAge: 1000 * 60 * 60
}))



app.use(session({
    name: "SESSIONID",
    secret: 'great', // 用来对session id相关的cookie进行签名
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 240 * 1000 * 60 // 有效期，单位是毫秒 30 分钟
    }
}));


router.use((req, res, next) => {
    // 设置跨域请求
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.removeHeader("X-Powered-By");
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();

});

function authorize(req, res, next) {
    if (!req.session.SESSIONID) {
        return res.redirect('/login');
    }
    next();
}

function authorizeApi(req, res, next) {
    if (!req.session.SESSIONID) {
        return res.json({
            status: -1,
            msg: "未登录"
        });
    }
    next();
}

let defaultHeaders = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
    "Host": "www.windhome.com",
    "Upgrade-Insecure-Requests": 1,
    "jar": true,
    "Pragma": "no-cache",
    "Connection": "keep-alive"
}


var get_cookies = function (cookieArr) {
    var cookies = {};
    cookieArr.forEach(function (cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/)
        cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
    return cookies;
};


function loginService(params) {
    let option = {
        method: "POST",
        url: 'https://www.windhome.com/index.php?m=great&a=sub&t=' + Date.now(),
        headers: Object.assign(defaultHeaders, {
            Cookie:[]
        }),
        formData: {
            uname: params.uname,
            pwd: params.pwd
        }
    }
    return new Promise((resolve, reject) => {
        request(option, function (error, response, body) {
            console.log("cookie",response.headers['set-cookie'])
            if (!error && response) {
                resolve(response.headers['set-cookie']);
            } else {
                reject();
            }
        })
    });
}


function getGreat(reqCookie) {
    let headers = {
        Cookie: ['S_SESSIONID='+reqCookie.S_SESSIONID],
    }
    let option = {
        method: "POST",
        url: "https://www.windhome.com/index.php?m=great&a=getTotalAmount&t=" + Date.now(),
        headers: Object.assign(defaultHeaders, headers),
    }
    return new Promise((resolve, reject) => {
        request(option, function (error, response, body) {
            if (!error) {
                resolve(body);
            } else {
                reject();
            }
        })
    });
}

router.get('/', authorize, (req, res, next) => {
    res.render("index", {
        title: '2019'
    });
});

router.get("/login", (req, res, next) => {
    res.render("login", {
        title: '2019'
    });
});

router.post("/api/login", (req, res, next) => {
    let _user = req.body;
    if (_user.uname === "lookgreat" && _user.pwd === "qcHZzFlHa9") {
        loginService(_user).then(function (result) {
            let phpsession = get_cookies(result)["S_SESSIONID"];
            if (phpsession) {
                // 登录校验成功，写入cookie
                req.session.SESSIONID = _user.uname;
                res.cookie('S_SESSIONID', phpsession);
                res.json({
                    status: 1,
                    msg: "登录成功"
                })
            } else {
                res.json({
                    status: 0,
                    msg: "登录失败!!!!"
                })
            }
        }).catch(err => {
            res.json({
                status: 0,
                msg: "登录失败!!!!"
            })
        });
    } else {
        return res.json({
            status: 0,
            msg: "账号密码错误登录失败!!!!"
        })
    }
});


router.get("/api/getgreat", authorizeApi, (req, res, next) => {
    getGreat(req.cookies).then(function (result) {
        try {
            return res.json(JSON.parse(result));
        } catch (error) {
            return res.json({
                status: 0,
                msg: "接口数据获取失败"
            });
        }
    }).catch(err => {
        res.json({
            status: 0,
            msg: "接口数据获取失败"
        });
    })
});


router.get('*', function (req, res) {
    res.send('404');
});

app.use('/', router);


app.listen(8896, '10.36.5.88', () => {
    console.log('Listening at http://127.0.0.1:8896' + ' \n')
});


function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}



function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({
            error: 'Something failed!'
        })
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', {
        error: err
    })
}
````