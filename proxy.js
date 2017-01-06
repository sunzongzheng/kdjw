var express = require("express"),
    cors = require('cors'),
    request = require("request"),
    http = require("http"),
    httpProxy = require('http-proxy');

var app = express();
var proxy = httpProxy.createServer();

const site_url = "http://kdjw.dev.cc"

http.createServer(app).listen(9039, '0.0.0.0');

app.use('/kdjw', function (req, res) {
    res.header("Access-Control-Allow-Origin", site_url);
    res.header("Access-Control-Allow-Credentials", true);
    proxy.web(req, res, {
        target: 'http://kdjw.hnust.cn/kdjw'
    })
});
app.use('/xxjw', function (req, res) {
    res.header("Access-Control-Allow-Origin", site_url);
    res.header("Access-Control-Allow-Credentials", true);
    proxy.web(req, res, {
        target: 'http://xxjw.hnust.cn/xxjw'
    })
});