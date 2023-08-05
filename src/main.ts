/* eslint-disable import/no-extraneous-dependencies */
import Vue, { createApp } from 'vue';
import wrap from '@vue/web-component-wrapper';
import WeatherWidget from '@/entities/WeatherWidget/ui/WeatherWidget.vue';
import App from './app/App.vue';

// const Widget = wrap(Vue, WeatherWidget);
// window.customElements.define('weather-widget', Widget);

createApp(App).mount('#app');
