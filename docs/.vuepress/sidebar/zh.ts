import { sidebar } from 'vuepress-theme-hope';

export const zhSidebar = sidebar({
  '/zh/': [
    "README.md",
    {
      text: "开始",
      prefix: "guide/start/",
      children: 'structure',
      icon: "launch",
      link: "guide/start/README.md",
      collapsable: true,
    },
    {
      text: "部署",
      prefix: "guide/deploy/",
      children: 'structure',
      link: "guide/deploy/README.md",
      icon: "creative",
      collapsable: true,
    },
    {
      text: "开发",
      prefix: "guide/develop/",
      children: 'structure',
      link: "guide/develop/README.md",
      icon: "creative",
      collapsable: true,
    },
    {
      text: "管理",
      prefix: "guide/manage/",
      children: 'structure',
      link: "guide/manage/README.md",
      icon: "tool",
      collapsable: true,
    },
    {
      text: "指南",
      prefix: "guide/reference/",
      children: 'structure',
      link: "guide/reference/README.md",
      icon: "generic",
      collapsable: true,
    },
    {
      text: "生态",
      prefix: "guide/eco/",
      children: 'structure',
      link: "guide/eco/README.md",
      icon: "leaf",
      collapsable: true,
    },
    {
      text: "发布",
      prefix: "guide/release/",
      children: 'structure',
      link: "guide/release/README.md",
      icon: "copy",
      collapsable: true,
    },
  ],
});
