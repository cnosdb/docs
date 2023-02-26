<template>
  <div class="footer-warpper">
    <PageFooterCn v-if="isZh" />
    <PageFooterEn v-else />
  </div>
</template>

<script setup lang="ts">
import PageFooterCn from './PageFooterCn.vue';
import PageFooterEn from './PageFooterEn.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const isZh = ref(false);
const route = useRoute();
console.log('route', route);
isZh.value = route.fullPath.indexOf('zh') > -1;
watch(
  () => route.path,
  () => {
    console.log(' route.fullPath.indexOf', route.fullPath.indexOf('zh'));

    isZh.value = route.fullPath.indexOf('zh') > -1;
  }
);
</script>

<style>
.footer-warpper {
  padding-left: calc(var(--sidebar-width) + 2rem);
  margin: 3rem 0;
  transition: padding var(--transform-transition);
}

@media (min-width: 1440px) {
  .theme-container .footer-warpper {
    padding-right: 16rem;
  }
  .theme-container.sidebar-collapsed .footer-warpper {
    padding-left: 0;
  }
}

@media (max-width: 719px) {
  .theme-container .footer-warpper {
    padding-left: 0;
  }
  .theme-container .footer-warpper .footer {
    /* flex-direction: column;  */
  }
}

@media (max-width: 420px) {
  .theme-container .footer-warpper .footer {
    flex-direction: column;
  }
}

.footer {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: var(--content-width);
  margin: 0 auto;
  text-align: left;
}
@media (max-width: 1200px) {
  .footer {
    text-align: center;
  }
}

.footer ul {
  list-style: none;
  padding-left: 0;
}

.footer ul a {
  color: var(--text-color);
}

#mc_embed_signup {
  clear: left;
  font: 14px Helvetica, Arial, sans-serif;
}
svg {
  fill: var(--text-color);
}

.footer-social-inner-wrap .footer-social-item {
  position: relative;
}
.footer-social-inner-wrap .footer-social-item:nth-of-type(3)::before {
  position: absolute;
  left: -100px;
  z-index: 99;
  content: '';
  visibility: hidden;
  opacity: 0;
  transform: translateY(-360px);
  transition: all 0.5s;
  width: 258px;
  height: 300px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
  background: url('https://www.cnosdb.com/wp-content/uploads/2022/06/CnosDB%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png')
    no-repeat center center;
  background-size: cover;
}
.footer-social-inner-wrap .footer-social-item:nth-of-type(3):hover::before {
  visibility: visible;
  transform: translateY(-300px);
  opacity: 1;
  cursor: pointer !important;
}

.footer-social-inner-wrap .footer-social-item:nth-of-type(4)::before {
  position: absolute;
  left: -100px;
  z-index: 99;
  content: '';
  visibility: hidden;
  width: 258px;
  height: 300px;
  transform: translateY(-360px);
  transition: all 0.5s;
  background: url('https://www.cnosdb.com/wp-content/uploads/2022/06/CnosDB-%E8%A7%86%E9%A2%91%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.jpeg')
    no-repeat center center;
  background-size: cover;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
  opacity: 0;
}
.footer-social-inner-wrap .footer-social-item:nth-of-type(4):hover::before {
  visibility: visible;
  transform: translateY(-300px);
  opacity: 1;
  cursor: pointer !important;
}
</style>
