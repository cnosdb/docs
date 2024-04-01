// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { localizePath } = require('@docusaurus/utils');
const math = require('remark-math');
const katex = require('rehype-katex');

const url =
  process.env.NODE_ENV !== 'development'
    ? 'https://docs.cnosdb.com'
    : 'http://localhost:3000';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CnosDB',
  tagline: 'CnosDB 是一款高性能、高压缩率、高易用性的开源分布式时序数据库。',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.cnosdb.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cnosdb', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
        label: 'English',
      },
      zh: {
        htmlLang: 'zh-Hans',
        label: '简体中文',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          remarkPlugins: [math],
          rehypePlugins: [katex],

          // 部署的时候使用以下的方法对于搜索会更加友好：
          // https://docs.netlify.com/routing/redirects/redirect-options/#redirect-by-country-or-language
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          lastVersion: 'current',
          versions: {
            current: {
              label: 'latest',
            },
            '2.4.0': {
              label: '2.4.0',
              banner: 'none',
            },
            '2.3.x': {
              label: '2.3.x',
              banner: 'none',
            },
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/cnosdb/docs/edit/main',
          editLocalizedFiles: true,
        },
        gtag: {
          trackingID: 'G-N59H7G52ZW',
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: 'GTM-K9WXG5PX',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'eco-integration',
        path: 'eco-integration',
        routeBasePath: 'eco-integration',
        sidebarPath: require.resolve('./sidebars.js'),
        sidebarCollapsible: false,
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebars.js'),
        sidebarCollapsed: false,
        editCurrentVersion: true,
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],
  scripts: ['/custom.js'],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Replace with your project's social card
      navbar: {
        logo: {
          alt: 'CnosDB',
          src: 'img/logo.png',
          srcDark: 'img/logo_dark.png',
          href: 'https://www.cnosdb.com',
        },
        items: [
          // left
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: '文档',
          },
          { to: 'eco-integration', label: '生态集成', position: 'left' },
          { to: 'community/changelist', label: '社区', position: 'left' },
          //right
          {
            to: 'https://docs.cnosdb.cloud',
            label: 'Cloud',
            position: 'right',
            className: 'nav-cloud', // 这里主要为了只在英文时展示所声明
          },
          { type: 'docsVersionDropdown', position: 'right' },
          { type: 'localeDropdown', position: 'right' },
          {
            href: 'https://github.com/cnosdb/cnosdb',
            className: 'header-github-link',
            position: 'right',
          },
          { type: 'search', position: 'right' },
        ],
      },
      footer: {
        copyright: `CnosDB ©  ${new Date().getFullYear()}`,
      },
      algolia: {
        appId: '4O093YZHL1',
        apiKey: '97bd7e824266635087a8957aaf6d94b2',
        indexName: 'cnosdb',
        locales: {
          '/zh-CN/': {
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
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
};

module.exports = config;
