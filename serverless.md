## 结合腾讯云 serverless 和 nuxt 发布一个线上博客系统
### 涵盖功能
- serverless 部署 nuxt 服务
- nuxt 项目
  - PWA （渐进式 Web 应用程序）旨在使用现有的 Web 技术提供用户更优的使用体验。
  - Nuxt 颜色模式切换 自动根据系统颜色模式完成网页的颜色模式切换
  - SSR 

### serverless 部署 nuxt 服务
登录腾讯云后台，找到 Serverless应用中心，新建应用，选择nuxt模板创建成功之后，在函数管理控制台下载代码或者直接在函数代码开发（建议下载到本地开发）

在本地代码开发完之后全局安装 serverless 
```
npm install -g serverless
```
在 serverless.yml 文件所在的项目根目录，运行以下指令，将会弹出二维码，直接扫码授权进行部署
```
serverless deploy
```
关于serverless的发布流程就这些，当然在serverless后台也可以配置自己的域名

### 渐进式 Web 应用程序
1. 安装@nuxtjs/pwa
2. 配置 pwa； pwa默认所需图标是static/icon.png, 若修改了文件位置或命名,如static/icon2.png,则需要配置icon
关于 icon 配置 @nuxtjs/pwa插件会自动根据 static/icon.png 生成[64, 120, 144, 152, 192, 384, 512]大小的图片
manifest 是支持站点在主屏上创建图标的技术方案，并且定制 PWA 的启动画面的图标和颜色等，如下图

```javascript
export default {
  // ...head
  modules: ["@nuxtjs/pwa"],
  pwa: {
    icon: {
      source: "/icon.png",  //路径为static中的icon.png
      fileName: 'icon.png'
    },
    
    manifest: {
      name: "我是名字",
      short_name: "我是名字",
      lang: "zh-CN",
      theme_color: "#fff", 
      description:
        "我是描述"
    },
    // workbox: {        //开发环境取消注释,调试pwa, 打包时注释
    //   dev: true 
    // }
  },
}
```
关于mainfest最后生成的json如下
```json
{
  "name": "我是名字",
  "short_name": "我是名字缩写",
  "description": "描述...",
  "start_url": "/",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#ffffff",
  "theme_color": "#8a00f9",
  "icons": [
    {
      "src": "images/icons/icon_32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon_512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

```
mainfest.json 属性
- name — 网页显示给用户的完整名称;
- short_name — 这是为了在没有足够空间显示 Web 应用程序的全名时使用;
- description — 关于网站的详细描述;
- start_url — 网页的初始相对 URL 比如 /）
- display — 应用程序的首选显示模式;
  - fullscreen - 全屏显示;
  - standalone - 应用程序将看起来像一个独立的应用程序;
  - minimal-ui - 应用程序将看起来像一个独立的应用程序，但会有浏览器地址栏;
  - browser - 该应用程序在传统的浏览器标签或新窗口中打开.
- orientation — 应用程序的首选显示方向;
- background_color — 启动屏的背景颜色;
- theme_color — 网站的主题颜色;
- icons — 定义了 src、sizes 和 type 的图片对象数组,各种环境中用作应用程序图标的图像对象数组；


@nuxtjs/pwa 最后会自动在生成的 html 里加上manifest.json；会自带hash
```html
<!-- 在 html 页面中添加以下 link 标签 -->
<link rel="manifest" href="/manifest.json" />
```

### Nuxt 颜色模式切换
