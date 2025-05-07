<template>
  <li class="app-badge">
    <button
      class="app-badge__button"
      :class="{ 'app-badge__button--is-active': isActive }"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </li>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    isActive?: boolean;
  }>(),
  {
    isActive: false,
  },
);
</script>

<style lang="scss" scoped src="./AppBadge.scss" />
