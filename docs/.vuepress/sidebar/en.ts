import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
    "/en/latest/": [
    "README.md",
    {
      text: "Get Started",
      prefix: "start/",
      children: 'structure',
      link: "start/README.md",
      icon: "launch",
      collapsible: true,
    },
    {
      text: "Deploy",
      prefix: "deploy/",
      children: 'structure',
      link: "deploy/README.md",
      icon: "stack",
      collapsible: true,
    },
    {
      text: "Develop",
      prefix: "develop/",
      children: 'structure',
      link: "develop/README.md",
      icon: "creative",
      collapsible: true,
    },
    {
      text: "Manage",
      prefix: "manage/",
      children: 'structure',
      link: "manage/README.md",
      icon: "tool",
      collapsible: true,
    },
    {
      text: "Reference",
      prefix: "reference/",
      children: 'structure',
      link: "reference/README.md",
      icon: "generic",
      collapsible: true,
    },
      {
        text: "Enterprise",
        prefix: "enterprise/",
        children: 'structure',
        link: "enterprise/README.md",
        icon: "categoryselected",
        collapsible: true,
      },
      {
      text: "Eco-integration",
      prefix: "versatility/",
      children: 'structure',
      link: "versatility/README.md",
      icon: "leaf",
      collapsible: true,
    },
      {
      text: "Release",
      prefix: "release/",
      children: 'structure',
      link: "release/README.md",
      icon: "copy",
      collapsible: true,
    },
  ],
  "/en/v2.3/": ["README.md",
    {
      text: "Get Started",
      prefix: "start/",
      children: 'structure',
      link: "start/README.md",
      icon: "launch",
      collapsible: true,
    },
    {
      text: "Deploy",
      prefix: "deploy/",
      children: 'structure',
      link: "deploy/README.md",
      icon: "stack",
      collapsible: true,
    },
    {
      text: "Develop",
      prefix: "develop/",
      children: 'structure',
      link: "develop/README.md",
      icon: "creative",
      collapsible: true,
    },
    {
      text: "Manage",
      prefix: "manage/",
      children: 'structure',
      link: "manage/README.md",
      icon: "tool",
      collapsible: true,
    },
    {
      text: "Reference",
      prefix: "reference/",
      children: 'structure',
      link: "reference/README.md",
      icon: "generic",
      collapsible: true,
    },
    {
      text: "Enterprise",
      prefix: "enterprise/",
      children: 'structure',
      link: "enterprise/README.md",
      icon: "categoryselected",
      collapsible: true,
    },
    {
      text: "Eco-integration",
      prefix: "versatility/",
      children: 'structure',
      link: "versatility/README.md",
      icon: "leaf",
      collapsible: true,
    },
    {
      text: "Release",
      prefix: "release/",
      children: 'structure',
      link: "release/README.md",
      icon: "copy",
      collapsible: true,
    },
  ],

  "/en/cloud/": [
    "README.md",
    {
      text: "Get Started",
      link: "get-started.md",
      icon: "launch",
      collapsible: true,
    },

    {
      text: "Billing",
      link: "billing.md",
      icon: "creative",
      collapsible: true,
    },
    {
      text: "Navigator",
      link: "navigator.md",
      icon: "tool",
      collapsible: true,
    },
    {
      text: "Dashboard",
      link: "dashboard.md",
      icon: "generic",
      collapsible: true,
    },
    {
      text: "Tenant View",
      link: "tenant.md",
      icon: "leaf",
      collapsible: true,
    },
    {
      text: "Alerts",
      link: "alerts.md",
      icon: "notice",
      collapsible: true,
    },
  ],
});
