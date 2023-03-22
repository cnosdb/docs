// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CnosDB',
  tagline: 'Time Series Database',
  // TODO: replace with your own favicon
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://cnosdb.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CnosDB', // Usually your GitHub org/user name.
  projectName: 'CnosDB', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en','zh-Hans'],
    path: 'docs',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      zh: {
        label: '简体中文',
        direction: 'rtl',
        htmlLang: 'zh-Hans',
        calendar: 'persian',
        path: 'zh',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/cnosdb/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/cnosdb/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'CnosDB',
        logo: {
          // TODO: Replace with your project's logo
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
            // serach
          {
            type: 'search',
            position: 'right',
          },
            // TODO: Add search engine api
            // You can refer to https://www.docusaurus.io/zh-CN/docs/search
          {
            type: 'docsVersion',
            position: 'right',
            to: '/path',
            label: 'Version',
          },
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                to: 'https://github.com/cnosdb/docs',
                label: '帮助我们翻译',
              },
            ],
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/cnosdb/cnosdb',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/cnosdb',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/cnosdb',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/cnosdb/cnosdb',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        //theme: require('prism-react-renderer/themes/dracula'),
        darkTheme: darkCodeTheme,
        additionalLanguages: ['powershell'],
        additionalLanguages: ['go'],
        additionalLanguages: ['sql'],
        additionalLanguages: ['java'],
        additionalLanguages: ['c'],
        additionalLanguages: ['cpp'],
        additionalLanguages: ['python'],
        additionalLanguages: ['cmake'],
      },
    }),
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        // Options here
        language: "zh",
      },
    ],
  ],
};

module.exports = config;