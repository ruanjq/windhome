const sideBar = require("./modules/sideBar");
module.exports = {
    port: 8894,
    base: '/',
    title: '風之家',
    head: [
        ['link', {
            rel: 'icon',
            href: '/images/logo.png'
        }], // 这个是标签页 logo
        ['link', {
            rel: 'shortcut icon',
            type: "image/x-icon",
            href: `/images/favicon.ico`
        }]
    ],
    description: '我不去想身后会不会袭来寒风冷雨，既然目标是地平线，留给世界的只能是背影',
    markdown: {
        lineNumbers: false,

    },
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': './public/'
            }
        }
    },
    themeConfig: {
        // 添加导航栏
        logo: '/images/logo.png',
        sidebar: 'auto',
        lastUpdated: '最近修改:', // 文档更新时间：每个文件git最后提交的时间
        repo: 'https://github.com/ruanjq/windhome', // 你的 Git 项目地址，添加后会在导航栏的最后追加
        editLinks: true,  // 启用编辑
        docsDir: 'docs',  // 编辑文档的所在目录
        nav: [{
            text: '博客列表', // 这里是下拉列表展现形式。
            link: '/blog/'
        }, {
            text: '大前端',
            link: '/front/'
        }, {
            text: '关于我',
            link: '/resume/'
        },{
            text: '关于风之家',
            link: '/about/'
        }],
        sidebar: sideBar()

    }
}




