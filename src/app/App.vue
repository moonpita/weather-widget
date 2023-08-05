<template>
  <MainPage />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainPage from '@/pages/MainPage.vue';

import '@/shared/styles/index.scss';

export default defineComponent({
  name: 'App',
  components: {
    MainPage,
  },
});
</script>

<style lang="scss"></style>
