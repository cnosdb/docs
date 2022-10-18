import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { searchPlugin } from '@vuepress/plugin-search';

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
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Docs',
      description: 'A docs for CsonDB',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '文档',
      description: 'CsonDB 的文档',
    },
  },

  theme,

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
