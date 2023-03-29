import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ router }) {
    router.beforeEach((to, from, next) => {
      if(to.fullPath === '/guide/quick_start.html') {
        next('/en/start/quick_start.html')
      } else {
        next()
      }
    })

    router.afterEach((to) => {
      console.log('after navigation')
    })
  },
})