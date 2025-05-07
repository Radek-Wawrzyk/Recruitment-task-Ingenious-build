<template>
  <section class="app-placeholder-card">
    <transition name="fade" mode="out-in">
      <div class="app-placeholder-card__holder" v-if="!hasContent">
        <img
          src="@/assets/images/card-placeholder-bck.png"
          alt="placeholder"
          class="app-placeholder-card__holder-image"
        />

        <div class="app-placeholder-card__content">
          <h3 class="app-placeholder-card__content-title">
            {{ placeholder }}
          </h3>
        </div>
      </div>

      <template v-else>
        <slot></slot>
      </template>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    placeholder: string | number;
    hasContent: boolean;
  }>(),
  {
    placeholder: '',
    hasContent: false,
  },
);
</script>

<style lang="scss" scoped src="./AppPlaceholderCard.scss" />
