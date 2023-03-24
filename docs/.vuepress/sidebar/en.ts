import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "README.md",
    {
      text: "Get Started",
      prefix: "en/start/",
      children: 'structure',
      link: "en/start/README.md",
      icon: "launch",
      collapsable: true,
    },
    {
      text: "Deploy",
      prefix: "en/deploy/",
      children: 'structure',
      link: "en/deploy/README.md",
      icon: "stack",
      collapsable: true,
    },
    {
      text: "Develop",
      prefix: "en/develop/",
      children: 'structure',
      link: "en/develop/README.md",
      icon: "creative",
      collapsable: true,
    },
    {
      text: "Manage",
      prefix: "en/manage/",
      children: 'structure',
      link: "en/manage/README.md",
      icon: "tool",
      collapsable: true,
    },
    {
      text: "Reference",
      prefix: "en/reference/",
      children: 'structure',
      link: "en/reference/README.md",
      icon: "generic",
      collapsable: true,
    },{
      text: "Release",
      prefix: "en/release/",
      children: 'structure',
      link: "en/release/README.md",
      icon: "copy",
      collapsable: true,
    },
  ],
});
