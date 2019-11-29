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
                    result.push({id:current,parent_id:prevFolder,fileName:"",title:"",collapsable:true,sidebarDepth:1,isFile:false,path:splitPath(subFolder)});
                    readDocsFolder(subFolder);
                } else {
                    if (path.extname(item) === ".md") {
                        let title = readDocsTitle(subFolder);
                        result.push({id:current,parent_id:prevFolder,fileName:item,title:title,collapsable:true,sidebarDepth:1,isFile:true,path:splitPath(subFolder)});
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
