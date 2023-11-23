<template>
  <Transition>
    <div v-if="show" class="modal-overlay" @click.stop="show = !show">
      <div class="modal-content">
        <slot></slot>
        <span class="modal-close" @click.stop="show = !show">x</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['show']);
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed !important;
  z-index: 999999;
  top: 0px;
  left: 0px;
  min-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-duration: 1000ms !important;
  animation-delay: 0ms;
  overflow: hidden;
  box-sizing: content-box;
  background: rgba(0, 0, 0, 0.7);
}
.modal-content {
  width: 680px;
  height: 80vh;
  border-radius: 6px;
  // overflow: hidden;
  position: relative;
  .modal-close {
    position: absolute;
    display: block;
    top: 0;
    right: -30px;
    line-height: 1 !important;
    font-size: 40px;
    font-family: arial !important;
    color: #ff5722;
    text-align: center;
    cursor: pointer;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
