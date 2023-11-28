<template>
  <div class="footer-warpper">
    <button id="lepopup-CnosDB-contact-us" @click="showContact = !showContact">
      联系咨询
    </button>
    <v-modal :show="showContact">
      <iframe
        id="goldendata_form_qrj9lq"
        src="https://jinshuju.net/f/qrj9lq?background=white&banner=show&embedded=true&inner_redirect=true"
        width="100%"
        frameborder="0"
        allowTransparency="true"
        style="height: 650px"
      ></iframe>
    </v-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VModal from './VModal.vue';

const showContact = ref(false);
</script>

<style lang="scss" scoped>
#lepopup-CnosDB-contact-us {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 500;
  border-radius: 36px;
  font-size: 18px;
  color: #e05e31;
}
</style>
