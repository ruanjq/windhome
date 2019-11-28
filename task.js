var path = require("path");
var shell = require('shelljs');



shell.mv(path.resolve(__dirname,"./dist/index.html"), path.resolve(__dirname));  // 将move文件移动到target文件夹