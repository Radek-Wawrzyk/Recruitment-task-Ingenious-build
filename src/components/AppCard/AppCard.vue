<template>
  <section class="app-card">
    <h2 class="app-card__title" v-if="title">
      {{ title }}
    </h2>

    <div class="app-card__content" :class="{ 'app-card__content--no-padding': noPaddingContent }">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    title?: string;
    noPaddingContent?: boolean;
  }>(),
  {
    title: '',
    noPaddingContent: false,
  },
);
</script>

<style lang="scss" scoped src="./AppCard.scss" />
