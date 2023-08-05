<template>
  <div class="stats">
    <div class="stats__item">
      <wind-icon class="icon" width="15" height="15" />
      <span>{{ props.stats.wind.speed }} {{ getWindDirection }}</span>
    </div>
    <div class="stats__item">
      <compass-icon class="icon" width="15" height="15" />
      <span>{{ props.stats.pressure }} hPa</span>
    </div>
    <div class="stats__item">
      <span>Humidity: {{ props.stats.humidity }}%</span>
    </div>
    <div class="stats__item">
      <span>Visibility: {{ getVisibilityKilometers }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import WindIcon from '@/shared/icons/WindIcon.vue';
import CompassIcon from '@/shared/icons/CompassIcon.vue';
import { windDirections } from '../lib/config';
import { Stats } from '../model/types';

const props = withDefaults(defineProps<{ stats: Stats }>(), {
  stats: () => ({
    wind: {
      speed: 0,
      deg: 0,
    },
    pressure: 0,
    humidity: 0,
    visibility: 0,
  }
  ),
});

const getWindDirection: ComputedRef = computed(
  (): string => {
    const keys = Object.keys(windDirections).map((key) => Number(key));
    const closest = Math.min(...keys.filter((deg) => Number(deg) >= props.stats.wind.deg));
    return windDirections[closest];
  },
);

const getVisibilityKilometers: ComputedRef = computed(
  (): string => `${Math.round(props.stats.visibility / 100) / 10} km`,
);

</script>

<style lang="scss" scoped>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &__item {
    display: flex;
    align-items: center;
    width: 50%;
    margin: 10px 0px;
  }
}

.icon {
  margin-right: 5px;
}
</style>
