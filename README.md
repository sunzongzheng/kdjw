# 教务网 非IE解决方案

## 简介：

1. 完全开源
2. 纯前端

## 部署相关：

### 环境：Node.js^6.9.1

### 步骤
修改 /src/utils/config.js

host字段改为你的代理地址
````js
npm install
npm run build
````
将dist目录上传至服务器，推荐[coding page](https://coding.net/help/doc/pages/index.html)

###不知道如何开代理？

参考方案：[proxy.js](https://github.com/sunzongzheng/kdjw/blob/master/proxy.js)

修改site_url为你的站点地址

````node
node proxy.js
````
