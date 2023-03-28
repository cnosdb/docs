import { defineUserConfig } from '@condorhero/vuepress-plugin-export-pdf-v2';
import theme from './theme.js';

export default defineUserConfig({
  theme,
  enhanceApp(browser, browserPage) {
    console.log('browser', browser);
    console.log('browserPage', browserPage);
  },
});
