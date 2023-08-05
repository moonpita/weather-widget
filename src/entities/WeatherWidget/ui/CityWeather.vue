<!-- eslint-disable import/no-dynamic-require -->
<template>
  <div :class="className">
    <div class="header">{{ getHeader }}</div>
    <div class="main">
      <img class="image" :src="getWeatherImage(description!)" alt="">
      <span class="temperature">{{ getCelsiusTemperature(temperature) }}°C</span>
    </div>
    <span class="description">
      {{ description }}, feels like {{ getCelsiusTemperature(feelsTemp) }}°C
    </span>
    <weather-stats :stats="stats" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import WeatherStats from './WeatherStats.vue';
import { Stats } from '../model/types';

const props = defineProps<{
  className: string,
  country: string,
  city: string,
  temperature: number,
  description: string,
  feelsTemp: number,
  stats: Stats,
}>();

const getHeader = computed((): string => `${props.city}, ${props.country}`);

const getCelsiusTemperature = (temp: number): number => Math.round(temp - 273.15);
// eslint-disable-next-line import/no-dynamic-require, global-require
const getWeatherImage = (image: string) => require(`@/assets/weathers/${image}.png`);

</script>

<style lang="scss" scoped>
@import '../../../shared/styles/variables.scss';

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
}

.image {
  width: 90px;
  height: 90px;
  margin-right: 15px;
  object-fit: contain
}

.temperature {
  @include font-h2;
}

.description {
  display: block;
  margin: 15px 0px;
}
</style>
