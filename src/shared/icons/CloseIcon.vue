<!-- eslint-disable max-len -->
<!-- eslint-disable no-tabs -->
<template>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg xmlns="http://www.w3.org/2000/svg" :class="className" viewBox="0 0 50 50" :width="width" :height="height">
    <path
      d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsIcon',
  props: {
    width: {
      type: String,
      default: '30',
    },
    height: {
      type: String,
      default: '30',
    },
    className: {
      type: String,
    },
  },
});
</script>
