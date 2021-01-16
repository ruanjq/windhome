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