<template>
  <NavbarPage>
    <!-- 使用 bottom 插槽引入评论组件 -->
    <template #startBefore>
      <div v-if="!dismissInfo" class="notice">
        <span v-html="info"></span>
        <svg viewBox="0 0 15 15" width="14" height="14" class="close-info" @click="closeInfo">
          <g stroke="currentColor" stroke-width="3.1">
            <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path>
          </g>
        </svg>
      </div>
    </template>
  </NavbarPage>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from "vue";
import NavbarPage from "vuepress-theme-hope/modules/navbar/components/Navbar.js";


const infoEn = `Try the public beta of the new docs site at <a href="https://beta.docs.cnosdb.com">beta.docs.cnosdb.com</a>`
const infoZh = `请访问 <a href="https://beta.docs.cnosdb.com">beta.docs.cnosdb.com</a> 尝试新文档网站的公测版`
const info = ref()
const dismissInfo = ref(false)
const route = useRoute();

const closeInfo = () => {
  dismissInfo.value = true
  localStorage.setItem('dismissInfo', 'true')
  document.documentElement.style.setProperty(`--navbar-height`, '3.75rem')
  document.documentElement.style.setProperty(`--navbar-mobile-height`, '3.75rem')
  document.documentElement.style.setProperty(`--navbar-info-height`, '0')
}

const init = () => {
  const _dismissInfo = localStorage.getItem('dismissInfo')
  dismissInfo.value = !!_dismissInfo
  if (!!_dismissInfo) {
    document.documentElement.style.setProperty(`--navbar-height`, '3.75rem')
    document.documentElement.style.setProperty(`--navbar-mobile-height`, '3.75rem')
    document.documentElement.style.setProperty(`--navbar-info-height`, '0')
  } else {
    document.documentElement.style.setProperty(`--navbar-height`, '5.45rem')
    document.documentElement.style.setProperty(`--navbar-mobile-height`, '5.45rem')
    document.documentElement.style.setProperty(`--navbar-info-height`, '1.75rem')
  }
  info.value = route.fullPath.indexOf('en') > -1 ? infoEn : infoZh
}

watch(
  () => route.path,
  () => {
    info.value = route.fullPath.indexOf('en') > -1 ? infoEn : infoZh
  }
);


onMounted(() => {
  init()
})

</script>
<style lang="scss" scoped>
.notice {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  height: var(--navbar-info-height);
  line-height: var(--navbar-info-height);
  color: #000;
  border-bottom: 1px solid #f5f6f7;
  background-color: #fff;

  .close-info {
    position: absolute;
    right: 12px;
    top: 50%;
    margin-top: -7px;
    color: #606770;
    cursor: pointer;
  }
}
</style>