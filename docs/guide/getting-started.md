# 快速开始

本节将帮助您从头开始构建一个基本的 mmc-ssg 文档站点。如果您已有一个现有项目并希望在项目中保留文档，请从第 2 步开始。

## 第 1 步：创建一个新项目

```sh
$ mkdir mmc-ssg-starter && cd mmc-ssg-starter
```

执行 `npm init -y` 来初始化一个项目。你可以使用 npm、yarn 或 pnpm 安装


```sh
# pnpm 
pnpm i @mmc-cloud/ssg
```

```sh
# yarn
yarn add @mmc-cloud/ssg
```

```sh
# npm
npm i @mmc-cloud/ssg
```

然后通过如下命令创建文件:

```bash
mkdir docs && echo '# Hello World' > docs/index.md
```


在`package.json`中加上以下的脚本:

```json
{
  "scripts": {
    "dev": "mmc-ssg dev docs",
    "build:docs": "mmc-ssg build docs"
  }
}
```

## 第 2 步: 启动 Dev Server

通过如下命令启动本地开发服务:

```sh
npm run dev
```

站点将在 http://localhost:5173 启动开发服务。

## 第 3 步: 构建静态站点
通过如下命令启动构建服务:

```sh
npm run build:docs
```