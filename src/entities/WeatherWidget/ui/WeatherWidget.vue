<template>
  <div class="container">

    <div v-if="cities.length < 1 && currentPage === WIDGET_PAGES.weather" class="no-cities">
      <button class="settings-btn" @click="changePage('settings')">
        <SettingsIcon :width="20" :height="20" />
      </button>
      <span>No added cities yet. Please add one</span>
    </div>

    <div v-if="currentPage === WIDGET_PAGES.weather" class="weather-content">
      <button class="settings-btn" @click="changePage(WIDGET_PAGES.settings)">
        <SettingsIcon :width="20" :height="20" />
      </button>
      <CityWeather v-for="(city) in weather" className="city"
        :key="city.id"
        :city="city.name"
        :country="city.sys.country"
        :stats="{
          wind: {
            speed: city.wind.speed,
            deg: city.wind.deg,
          },
          pressure: city.main.pressure,
          humidity: city.main.humidity,
          visibility: city.visibility,
        }"
        :wind="city.wind"
        :description="city.weather[0].description"
        :temperature="city.main.temp"
        :feelsTemp="city.main.feels_like" />
    </div>

    <WeatherSettings v-else-if="currentPage === WIDGET_PAGES.settings"
      :cities="cities"
      @remove-city="removeCity"
      @add-city="addCity"
      @change-page="changePage(WIDGET_PAGES.weather)" />
  </div>
</template>

<script lang="ts" setup>
import {
  Ref, onMounted, ref, watch,
} from 'vue';
import SettingsIcon from '@/shared/icons/SettingsIcon.vue';
import CityWeather from './CityWeather.vue';
import WeatherSettings from './WeatherSettings.vue';
import { WIDGET_PAGES } from '../lib/config';
import { getWeatherByCities } from '../model/index';
import { City } from '../model/types';

const currentPage: Ref<string> = ref(WIDGET_PAGES.weather);
const cities: Ref<Array<City>> = ref([]);
const weather: Ref<any> = ref([]);

const updateWeathers = () => {
  Promise.resolve(getWeatherByCities(cities.value.map((city) => city.name)))
    .then((result) => {
      Promise.all(result)
        .then((data) => {
          weather.value = data;
        });
    });
};
const changePage = (page: string): void => {
  currentPage.value = page;
};
const addCity = (city: string): void => {
  cities.value.push({
    name: city,
    id: String(Math.random() * 10000),
  });
};
const removeCity = (id: string): void => {
  cities.value = cities.value.filter((city) => city.id !== id);
};

onMounted(() => {
  if (localStorage.getItem('cities')) {
    cities.value = JSON.parse(localStorage.getItem('cities')!);
  }
  updateWeathers();
});

watch(
  cities,
  () => {
    localStorage.setItem('cities', JSON.stringify(cities.value));
    updateWeathers();
  },
  { deep: true },
);

</script>

<style lang="scss" scoped>
@import '@/shared/styles/variables.scss';

.container {
  position: relative;
  width: 290px;
  margin: 15px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 15px;
}

.no-cities {
  text-align: center;
  @include font-h2;
}

.city {
  &:not(:first-of-type) {
    margin-top: 40px;
  }
}

.settings-btn {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>
