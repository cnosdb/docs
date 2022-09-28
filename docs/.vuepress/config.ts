import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { searchPlugin } from '@vuepress/plugin-search';

export default defineUserConfig({
  base: '/',

  dest: './dist',

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

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
