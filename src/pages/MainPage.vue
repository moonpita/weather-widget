<template>
  <WeatherWidget />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherWidget from '@/entities/WeatherWidget/ui/WeatherWidget.vue';

export default defineComponent({
  components: { WeatherWidget },
  name: 'MainPage',
});
</script>
