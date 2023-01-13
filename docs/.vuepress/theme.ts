import { hopeTheme, HopeThemeSidebarInfo } from 'vuepress-theme-hope';
import { enNavbar, zhNavbar } from './navbar/index.js';
import { enSidebar, zhSidebar } from './sidebar/index.js';

export default hopeTheme({
  author: {
    name: 'CnosDB',
    url: 'https://github.com/cnosdb/cnosdb',
  },

  iconAssets: 'iconfont',

  logo: '/logo.png',
  logoDark: 'https://www.cnosdb.com/wp-content/uploads/2022/05/CnosDB_%E7%99%BD-300x108.png',

  repo: 'cnosdb/docs',

  docsDir: 'docs',

  pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime', 'Word'],

  sidebarSorter: (a: HopeThemeSidebarInfo, b: HopeThemeSidebarInfo): number => {
    let cmp = (
      num_a: number | null | false | undefined,
      num_b: number | null | false | undefined
    ): number => {
      if (num_a === null || num_a === undefined || num_a === false) {
        if (num_b === null || num_b === undefined || num_b === false) {
          return -1;
        }
        return -1;
      } else if (num_b === null || num_b === undefined || num_b === false) {
        return 1;
      } else {
        // For negative orders compare to positive orders
        if (num_a < 0 && num_b > 0) {
          return 1;
        } else if (num_a > 0 && num_b < 0) {
          return -1;
        }

        if (num_a > num_b) {
          return 1;
        } else if (num_a === num_b) {
          return 0;
        }
        return -1;
      }
    };

    let cmpResult = 0;
    if (a.type === 'file') {
      if (b.type === 'dir') {
        cmpResult = 1;
      }
      cmpResult = cmp(a.order, b.order);
    } else {
      if (b.type == 'file') {
        cmpResult = -1;
      }
      cmpResult = cmp(a.frontmatter.order, b.frontmatter.order);
    }

    console.log(
      'Sorting',
      a.frontmatter.title,
      a.type,
      a.frontmatter.order,
      '<',
      cmpResult,
      '>',
      b.frontmatter.title,
      a.type,
      b.frontmatter.order
    );

    return cmpResult;
  },

  locales: {
    /**
     * Chinese locale config
     */
    '/': {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      displayFooter: true,

      copyright: false,
    },
    '/zh/': {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      displayFooter: true,

      copyright: false,
    },
  },

  encrypt: {
    config: {
      '/en/demo/encrypt.html': ['1234'],
      '/demo/encrypt.html': ['1234'],
    },
  },

  plugins: {
    // Disable features you don't want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imageMark: {
        light: ["lightmode"],
        dark: ["darkmode"],
      },
      imageSize: true,
      include: true,
      katex: true,
      lazyLoad: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ['ts', 'vue'],
      },
      presentation: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      },
      stylize: [
        {
          matcher: 'Recommanded',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommanded',
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vpre: true,
      vuePlayground: true,
    },
  },
});
