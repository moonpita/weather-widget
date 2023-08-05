<template>
  <div class="settings">
    <button class="close-btn" @click="changePage">
      <CloseIcon width="20" height="20" />
    </button>
    <div class="title">Settings</div>
    <draggable :list="props.cities" class="content">
      <template #item="{ element }">
        <li>
          <button class="burger">
            <BurgerIcon width="20" height="20" />
          </button>
          <span class="name">{{ getCityNameWithUpperCaseChars(element.name) }}</span>
          <button class="remove" @click="removeCity(element.id)">Remove</button>
        </li>
      </template>
    </draggable>
    <form class="form" @submit.prevent="addNewCity">
      <!-- По хорошему в большом приложении все подобные инпуты,  стандартные кнопки на некоторых местах и тд
        нужно выносить в shared как, например, базовый <Input />. Который расширяют инпуты для конкретных задач и т.д. .
        Однако здесь в тестовом это, вероятно, лишнее, когда имеется один инпут и всё -->
      <label for="newCityInput">
        <input id="newCityInput"
          class="input"
          type="text"
          name="newCity"
          v-model="newCity"
          placeholder="Type city name">
      </label>
      <button type="submit" class="add-city">Add City</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import draggable from 'vuedraggable';
import CloseIcon from '@/shared/icons/CloseIcon.vue';
import BurgerIcon from '@/shared/icons/BurgerIcon.vue';
import { Cities } from '../model/types';

const emit = defineEmits(['add-city', 'remove-city', 'change-page']);
const props = defineProps<{ cities: Cities }>();

const newCity = ref('');

const getCityNameWithUpperCaseChars = (name: string): string => name
  .split(' ')
  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const changePage = () => {
  emit('change-page');
};
const removeCity = (id: string): void => {
  emit('remove-city', id);
};
// Можно также предусмотреть обработку ошибочных городов и добавлять их только после запроса
// Если АПИ возвращает 404 & message: city not found. Но здесь, я думаю, не обязательно сейчас
const addNewCity = () => {
  emit('add-city', newCity.value.trim().toLowerCase());
};

</script>

<style lang="scss" scoped>
@import '@/shared/styles/variables.scss';

.close-btn {
  position: absolute;
  right: 15px;
  top: 15px;
}

.title {
  @include font-2;
}

.form {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input {
  width: 100%;
  height: 24px;
  margin-right: 10px;
  outline: none;
  border: 1px solid #333;
  border-radius: 5px;
}

.add-city {
  border: 1px solid $lightGray;
  border-radius: 4px;
  background: $lightGray;
  padding: 5px 10px;
  text-align: center;
  min-width: max-content;
}

.content {
  margin-top: 24px;
}

li {
  display: flex;
  align-items: center;
  padding: 6px;
  background: $lightGray;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  & .remove {
    margin-left: auto;
    color: $red;
    font-weight: 700;
  }

  & .burger {
    margin-right: 5px;
  }
}
</style>
