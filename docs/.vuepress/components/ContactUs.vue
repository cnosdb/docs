<template>
  <div class="footer-warpper">
    <button id="lepopup-CnosDB-contact-us" @click="showContact = !showContact">
      Contact Us
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
  background-color: #f25319;
  font-weight: 500;
  background-color: #f25319;
  border-radius: 36px;
  padding: 12px 24px;
}
</style>
