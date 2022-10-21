import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { searchPlugin } from '@vuepress/plugin-search';
import { getDirname, path } from '@vuepress/utils';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: '/',

  lang: 'zh-CN',

  dest: './dist',

  head: [
    [
      'script',
      {},
      `
        (function() {
          var logoEle = document.querySelector(".navbar-left a.brand");
          logoEle.href = "https://www.cnosdb.com/cnosdb-v2/";
          
          logoEle.addEventListener('click', function() {
            window.location.href = 'https://www.cnosdb.com/cnosdb-v2/'
          })
        })();
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
      `
    ],
    [
      'script',
      {
        defer: true,
        src: path.resolve(
          __dirname,
          './components/jQuery.js'
        ),
      }
    ],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  locales: {
    '/zh/': {
      lang: 'zh-CN',
      title: '文档',
      description: 'CnosDB 的文档',
    },
    '/': {
      lang: 'en-US',
      title: 'Docs',
      description: 'A docs for CnosDB',
    },
  },

  theme,
  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    '@theme-hope/components/PageFooter.js': path.resolve(
      __dirname,
      './components/wrapper.js'
    ),
  },
  plugins: [
    searchPlugin({
      locales: {
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
  ],
});
