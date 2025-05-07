<template>
  <transition name="fade" mode="out-in">
    <div class="app-loader" v-if="isLoading">
      <div class="app-loader__wrapper">
        <div class="app-loader__spinner spinner-grow" role="status"></div>
        <span class="app-loader__text">Loading...</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLoading } from '@/composables/useLoading';

const { isLoading } = useLoading();
</script>

<style lang="scss" scoped src="./AppLoader.scss" />
