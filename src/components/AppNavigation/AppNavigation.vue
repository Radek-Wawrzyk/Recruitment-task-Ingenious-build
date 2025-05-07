<template>
  <nav class="nav app-navigation">
    <ul class="nav app-navigation__content">
      <li class="nav-item app-navigation__item" v-for="link in ROUTING_NAVIGATION" :key="link.name">
        <router-link
          class="nav-link app-navigation__link"
          aria-current="page"
          :to="{
            name: link.name,
          }"
        >
          {{ link.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ROUTING_NAVIGATION } from '@/constants/Routing';
</script>

<style lang="scss" scoped src="./AppNavigation.scss" />
