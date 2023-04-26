import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { getDirname, path } from '@vuepress/utils';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: '/',

  lang: 'en-US',

  dest: './dist',

  head: [
    [
      'script',
      {},
      `
        window.onload = function() {
          (function() {
            var logoEleLight = document.querySelector(".navbar-left a.brand .logo.light") ;
            var logoEleDark = document.querySelector(".navbar-left a.brand .logo.dark") ;
            
            logoEleLight.href = "https://www.cnosdb.com";
            logoEleDark.href = "https://www.cnosdb.com";
            
            logoEleLight.addEventListener('click', function() {
              window.location.href = 'https://www.cnosdb.com'
            })
            logoEleDark.addEventListener('click', function() {
              window.location.href = 'https://www.cnosdb.com'
            })
          })();
        }   
      `,
    ],
    [
      'script',
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?667048807bc5edda32d1c6f4185c219b";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `,
    ],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Docs',
      description: 'A docs for CnosDB',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '文档',
      description: 'CnosDB 的文档',
    },
  },

  theme,
  alias: (app, isServe) => {
    return {
      // 你可以在这里将别名定向到自己的组件
      // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
      '@theme-hope/components/PageFooter.js': path.resolve(
        __dirname,
        './components/wrapper.js'
      ),
    };
  },
  plugins: [
    docsearchPlugin({
      appId: '4O093YZHL1',
      apiKey: 'b02a6bb324334323de977f71e73d06d0',
      indexName: 'cnosdb',
      locales: {
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }),
  ],
});
