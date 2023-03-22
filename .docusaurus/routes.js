import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '0a2'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'de4'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '923'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '742'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '637'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '8d9'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'b0c'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '304'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', 'c9b'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '38f'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', 'c26'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '792'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '4de'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '67e'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', 'dd9'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', 'f64'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '9ae'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'e11'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '2f7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '691'),
    routes: [
      {
        path: '/docs/category/deploy',
        component: ComponentCreator('/docs/category/deploy', 'f8e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/develop',
        component: ComponentCreator('/docs/category/develop', '1cc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/get-started',
        component: ComponentCreator('/docs/category/get-started', '9e4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/manage',
        component: ComponentCreator('/docs/category/manage', '787'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/manage-1',
        component: ComponentCreator('/docs/category/manage-1', '9d9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/reference',
        component: ComponentCreator('/docs/category/reference', '8c1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tutorial---basics',
        component: ComponentCreator('/docs/category/tutorial---basics', 'd44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tutorial---extras',
        component: ComponentCreator('/docs/category/tutorial---extras', 'f09'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/deploy/distributed',
        component: ComponentCreator('/docs/deploy/distributed', '122'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/deploy/separation_mod',
        component: ComponentCreator('/docs/deploy/separation_mod', '19a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/deploy/single',
        component: ComponentCreator('/docs/deploy/single', '90d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/develop/api',
        component: ComponentCreator('/docs/develop/api', 'e84'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/develop/query',
        component: ComponentCreator('/docs/develop/query', 'f68'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/develop/write',
        component: ComponentCreator('/docs/develop/write', '42a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage/backup',
        component: ComponentCreator('/docs/manage/backup', '793'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage/cluster_expansion',
        component: ComponentCreator('/docs/manage/cluster_expansion', '791'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage/cluster_shrink',
        component: ComponentCreator('/docs/manage/cluster_shrink', '5d4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage/migration',
        component: ComponentCreator('/docs/manage/migration', '024'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage/monitor',
        component: ComponentCreator('/docs/manage/monitor', 'ed6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage/tenant',
        component: ComponentCreator('/docs/manage/tenant', '5e0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/manage/upgrade',
        component: ComponentCreator('/docs/manage/upgrade', 'ad6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reference/config',
        component: ComponentCreator('/docs/reference/config', '67b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reference/connector',
        component: ComponentCreator('/docs/reference/connector', 'bbc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reference/design',
        component: ComponentCreator('/docs/reference/design', '3e3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reference/ecosystem',
        component: ComponentCreator('/docs/reference/ecosystem', '37d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reference/performance',
        component: ComponentCreator('/docs/reference/performance', '21a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reference/rest_api',
        component: ComponentCreator('/docs/reference/rest_api', '945'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reference/sql',
        component: ComponentCreator('/docs/reference/sql', 'f64'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/reference/tools',
        component: ComponentCreator('/docs/reference/tools', '18c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/release/changelist',
        component: ComponentCreator('/docs/release/changelist', 'e44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/release/roadmap',
        component: ComponentCreator('/docs/release/roadmap', '3a7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/start/install',
        component: ComponentCreator('/docs/start/install', '87f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/start/quick_start',
        component: ComponentCreator('/docs/start/quick_start', 'a1b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/docs/tutorial-basics/congratulations', '793'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post', '68e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/docs/tutorial-basics/create-a-document', 'c2d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/docs/tutorial-basics/create-a-page', 'f44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/docs/tutorial-basics/deploy-your-site', 'e46'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/docs/tutorial-basics/markdown-features', '4b7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', 'fdd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/docs/tutorial-extras/translate-your-site', '2d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'fcc'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
