// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const versions = require('./versions.json');
const versionsArchived = require('./versionsArchived.json');

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
  // TODO: somthing wrong with baseUrl
  // you can refer to : https://github.com/facebook/docusaurus/issues/6294
  // https://github.com/facebook/docusaurus/issues/6294
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CnosDB', // Usually your GitHub org/user name.
  projectName: 'CnosDB', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // TODO: 'routeBasePath: '/'' is for docs only mod.
          routeBasePath: '/',
          path: 'docs/en/docusaurus-plugin-content-docs/current',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Please change this to your repo.
          editUrl:
            'https://github.com/cnosdb/docs',
          lastVersion: versions[0],
          versions: {
            current: {
              label: `2.0 🚧`,
              path: 'v2',
            },
            '2.0': {
              label: '2.0',
              path: 'v2',
            },
          },
          // TODO: fix editUrl
          // editUrl: ({ versionDocsDirPath, docPath, locale, version }) => {
          //   if ('en' === locale) {
          //     return `https://github.com/cnosdb/docs/main/${versionDocsDirPath}/${docPath}`;
          //   } else {
          //     return 'current' === version
          //         ? `https://github.com/cnosdb/docs/main/docs/${locale}/docusaurus-plugin-content-docs/${version}/${docPath}`
          //         : `https://github.com/cnosdb/docs/main/docs/${locale}/docusaurus-plugin-content-docs/version-${version}/${docPath}`;
          //   }
          // },
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: ['docusaurus-theme-search-typesense'],
  themes: ['@docusaurus/theme-live-codeblock'],

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
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              ...versionsArchived.wiki,
            ],
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
            label: 'Docs',
          },
          {
            href: 'https://github.com/cnosdb/cnosdb',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // TODO: add footer
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/v2/intro',
              },
            ],
            title: 'More',
            items: [
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

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en','zh-Hans'],
    path: 'docs',
    localeConfigs: {
      'en': {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
        calendar: 'gregory',
        path: 'en',
      },
      'zh-Hans': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-Hans',
        calendar: 'persian',
        path: 'zh',
      },
    },
  },
};

module.exports = config;