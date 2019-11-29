---
title: 关于风之家
sidebar: false
lang: zh-CN
---
[[toc]]


## 风之家博客


### 1: 背景
作为一名开发人员，都希望拥有一个属于个人的博客网站，但是考虑到部署服务器、数据库那些比较麻烦，而博客主要是记录，分享一些文档，这时候静态博客网站就得心应手些。

曾几何时，`Wordpress` 平台在博客领域占据重要地位，它基于`PHP`动态语言 和 `MySQL` 数据库动态创建站点,丰富的插件模板及主题样式，得到了广大的程序员的追捧, 然而对于一名前端开发人员来说：后端语言基于php，对于一个前端开发人员来说，还是习惯使用 `Node.js`，于是乎我又去了解了基于 `Hexo` 框架，

 `Hexo` 是一个快速、简洁且高效的博客框架，底层基于`Node.js`技术实现，Hexo 使用 `Markdown`（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页，也拥有丰富的主题模板及插件，很适合前端开发人员上手。

 在了解到`Hexo`框架的时候，欣喜若狂，终于找到一个合适的框架来搭建自己的博客站点，网上学一些文档教程，很快就启动了一个本地站点，然而在浏览文档的时候，又发现了一个新起之秀的博客框架 `vuepress`,咋一看跟`Vue` 有什么关系，于是乎打开了[vuepress](https://vuepress.vuejs.org/) 文档，瞬间被惊艳了.


 `Vue`作为现在前端界最流行的前端框架，能用`Vue`技术快速搭建文档站点，简直就是巨大的福利，

` VuePress` 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。更多特性 [vuepress](https://vuepress.vuejs.org/) 

在经历一番折腾后，终于选定风之家博客的技术栈---- `vuepress`

### 2:踩坑之旅
1: 按照官网步骤，本地初始化了项目
2: 进行一些简单的配置后，站点很快的就运行起来
3: 发现一些存在的问题：
* 侧边栏菜单 sideBar 属性每次需要手动配置
* `npm run docs:build` 命令生成的文件夹dist 目录每次都会重新删除，提交git 部署后git 日志完全丢失

### 3:自动生成sideBar菜单
siderBar.js
```
windhome
└───docs
    └───.vuepress
        └───modules
            └───siderBar.js

```

````javascript
/**
 * @description 读取docs 文件夹目录文件自动创建菜单数据结构
 * 
 */
const fs = require("fs");
const path = require("path");


// 读取.md 文件YAML front matter title 值或者sideBarTitle 内容设置导航栏标题
function readDocsTitle(filepath) {
    if (fs.existsSync(filepath)) {
        // -- 同步读取文件
        let content = fs.readFileSync(filepath, 'utf8');
        let match = content.match(/(sideBarTitle|title):(.*)/);
        if (match && match[2]) {
            return match[2]
        } else {
            return "";
        }
    } else {
        return "";
    }
}


// 截取文件路径设置为 路由path 值
function splitPath(p) {
    let regMatch = p.replace(/\\/g,"/").match(/docs(.*)/);
    return regMatch && regMatch[1];
}

// 读取文件夹
function readDocs(dir) {
    let result = [];
    (function readDocsFolder(dir_path) {
        if (fs.existsSync(dir_path)) {
            return fs.readdirSync(dir_path).forEach((item,index) => {
                // 过滤以点开头的文件夹，mac os 系统存在 .DS_Store 隐藏文件夹，过滤 node_modules 文件夹
                if (/^(\.|node_modules)/.test(item)) return;
                let current = `/${item}`;
                let subFolder = path.join(dir_path, `/${item}`);
                let prevFolder = "/" + path.parse(path.resolve(subFolder, "..")).name;
                if(prevFolder === "/docs") prevFolder = "";
                let info = fs.statSync(subFolder);
                if (info.isDirectory()) {
                    result.push({
                        id:current,parent_id:
                        prevFolder,fileName:"",title:"",
                        collapsable:true,sidebarDepth:1,isFile:false,path:splitPath(subFolder)});
                    readDocsFolder(subFolder);
                } else {
                    if (path.extname(item) === ".md") {
                        let title = readDocsTitle(subFolder);
                        result.push({id:current,parent_id:prevFolder,
                        fileName:item,title:title,
                        collapsable:true,sidebarDepth:1,isFile:true,path:splitPath(subFolder)});
                    }
                }
            });
        }
    })(dir);
    return result;
}

function toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });
    // 将数据存储为 以 path 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
        map[item.id] = item;
    });
    var val = [];
    data.forEach(function (item) {
        // 以当前遍历项，的parent_id,去map对象中找到索引的id
        var parent = map[item.parent_id];
  
        // 修改README.md 文件名路径为空
        if(item.fileName === "README.md"){
            item.path = item.path.replace(/README\.md/,"");
        }
        if (parent) {
            if(item.parent_id + "/" !== item.path){
                (parent.children || (parent.children = [])).push(item);
            }
            if(item.id === "/README.md"){
                parent.title = item.title;
            }
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });

    return  val;
}



function transformData(data){

    var result = {};

    // 侧边栏菜单过滤的文件夹路径
    const filterFolders = ["/resume","/about"]
    data.forEach(item => {
        // 过滤不需要生成侧边栏菜单的目录
        if(!filterFolders.includes(item.id)){
            result[item.id] = [item];
        }
    });

    return result;
}    

let sideBar = () => {
    // docs 根目录下
    let docsDir = path.resolve(__dirname, "../../");

    // 排除 .vuepress、node_modules 文件夹
    let folders = readDocs(docsDir);
    let tree = toTree(folders);
    return transformData(tree);
}

module.exports = sideBar;

````

### 4:提交GitHub 
`npm run docs:build` 命令生成的文件夹dist 目录每次都会删除，然后导致 .git 日志文件完全丢失
代码提交每次都需要往GitHub重新创建项目，`vuepress` 官网提供的部署教程是使用 sh脚本文件，无法将项目开发目录同时提交至GitHub，于是乎自己写了一个task 脚本命令，将dist 目录下的文件copy 至文档跟目录，方便提交git 进行版本维护

````javascript
const shell = require('shelljs');
const path = require("path");
const fs = require("fs");

const rootDir = path.resolve(__dirname);

const distDir = path.resolve(__dirname, "./docs/.vuepress/dist");

function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

function findCopyFolders(dir) {
    let copyDistFolders = [];
    let files = fs.readdirSync(dir);
    files.forEach((item,index) => {
        copyDistFolders.push(path.join(rootDir,item));
    });
    return copyDistFolders;
}


function removeMoveFolders(folders){
    folders.forEach((item) => {
        if(fsExistsSync(item)){
            shell.rm("-rf",item);
        }
    });
}


removeMoveFolders(findCopyFolders(distDir));


shell.cp("-R",path.resolve(__dirname,"./docs/.vuepress/dist/*"), path.resolve(__dirname));  // 将move文件移动到target文件夹
````

### 5:部署GitHub Pages
1:准备购买备案好的域名 [www.windhome.win](https://www.windhome.win)

2:GitHub ---> Setting ----> master branch ----> Custom domain  (www.windhome.win) 




