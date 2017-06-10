var express = require("express"),
    cors = require('cors'),
    request = require("request"),
    http = require("http"),
    httpProxy = require('http-proxy');

var app = express();
var proxy = httpProxy.createServer();

http.createServer(app).listen(9039, '0.0.0.0');

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.referer.substr(0, req.headers.referer.length - 1));
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use('/kdjw', function (req, res) {
    proxy.web(req, res, {
        target: 'http://kdjw.hnust.cn/kdjw'
    })
});
app.use('/xxjw', function (req, res) {
    proxy.web(req, res, {
        target: 'http://xxjw.hnust.cn/xxjw'
    })
});