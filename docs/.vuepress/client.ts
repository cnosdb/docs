import { defineClientConfig } from '@vuepress/client';

export default defineClientConfig({
  enhance({ router }) {
    router.beforeEach((to, _from, next) => {
      console.log('before navigation', to);
      if (to.path === '/') {
        next({ path: '/en/latest/' });
      } else if (to.path === '/en/') {
        next({ path: '/en/latest/' });
      } else if (to.path === '/zh/') {
        next({ path: '/zh/latest/' });
      }
      next();
    });
  },
});
