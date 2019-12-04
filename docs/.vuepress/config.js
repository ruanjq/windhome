const sideBar = require("./modules/sideBar");
module.exports = {
    port: 8894,
    base: '/',
    title: '風之家',
    head: [
        ['link', {rel: 'icon',href: '/images/icons/logo_256x256.png'}], // 这个是标签页 logo
        ['link', {rel: 'shortcut icon',type: "image/x-icon",href: `/icons/favicon.ico`}],
        ['script', {}, `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?ab4ebebbea4df8ea62cf5195aff6b3a2";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        `],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#4BB547' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/images/icons/logo_256x256.png' }],
        ['link', { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#4BB547' }],
        ['meta', { name: 'msapplication-TileImage', content: '/images/icons/logo_256x256.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    description: '我不去想身后会不会袭来寒风冷雨，既然目标是地平线，留给世界的只能是背影',
    markdown: {
        lineNumbers: false,
    },
    plugins: [
        '@vuepress/back-to-top',
        // '@vuepress/pwa',
        // {
        //     serviceWorker: true,
        //     popupComponent: 'SWUpdatePopup',
        //     updatePopup: true
        // }
    ],
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': './public/'
            }
        }
    },
    themeConfig: {
        // 添加导航栏
        logo: '/images/icons/logo_256x256.png',
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
            text: '关于風之家',
            link: '/about/'
        }],
        sidebar: sideBar()

    }
}




