# vue-element-template

> Vue Element Template

## 基础搭建

> 这是一个 基于[vue-cli3](https://cli.vuejs.org/zh/guide/)的 极简的 vue admin 管理后台。来源于开源项目 vue-admin-template。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[Github](https://github.com/PanJiaChen/vue-admin-template)
[Demo](https://panjiachen.github.io/vue-admin-template)

## 相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [Documentation](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)

## 开发

```bash
# Clone project
git clone git@github.com:ruimintan/vue-element-template.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev
或
npm start

# build for production with minification
npm run build
```

## 发布

```bash

# 测试环境 tester
npm run build:tester

# uat环境 uat
npm run build:uat

# 生产环境 release
npm run build:pro
```
