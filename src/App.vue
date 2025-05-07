<template>
  <div class="app">
    <header class="app-header">
      <div class="container">
        <h1 class="app-header__title">Timetable</h1>
        <app-navigation />
      </div>
    </header>

    <main class="app-layout">
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <app-loader />
  </div>
</template>

<script lang="ts" setup>
import AppNavigation from '@/components/AppNavigation/AppNavigation.vue';
import AppLoader from '@/components/AppLoader/AppLoader.vue';

import { useStore } from 'vuex';
import { onMounted } from 'vue';

const store = useStore();

onMounted(() => {
  store.dispatch('timetable/load');
});
</script>
