<template>
  <div class="stops-page">
    <app-card :no-padding-content="true" class="stops-page__card">
      <app-input class="stops-page__search" v-model="filters.query" placeholder="Search">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.83325 7.33337C1.83325 4.29581 4.29569 1.83337 7.33325 1.83337C10.3708 1.83337 12.8333 4.29581 12.8333 7.33337C12.8333 10.3709 10.3708 12.8334 7.33325 12.8334C4.29569 12.8334 1.83325 10.3709 1.83325 7.33337ZM7.33325 0.833374C3.7434 0.833374 0.833252 3.74352 0.833252 7.33337C0.833252 10.9232 3.7434 13.8334 7.33325 13.8334C8.9482 13.8334 10.4256 13.2444 11.5624 12.2696L13.6464 14.3536C13.8416 14.5489 14.1582 14.5489 14.3535 14.3536C14.5487 14.1583 14.5487 13.8418 14.3535 13.6465L12.2695 11.5625C13.2443 10.4257 13.8333 8.94832 13.8333 7.33337C13.8333 3.74352 10.9231 0.833374 7.33325 0.833374Z"
              fill="#9A9DA4"
            />
          </svg>
        </template>
      </app-input>

      <app-table
        :data="tableStops"
        :header="tableStopsHeader"
        :active-sorting-order="filters.sortingOrder"
        @on-sort="setSortingOrder($event)"
      />
    </app-card>
  </div>
</template>

<script setup lang="ts">
import AppCard from '@/components/AppCard/AppCard.vue';
import AppTable from '@/components/AppTable/AppTable.vue';
import AppInput from '@/components/AppInput/AppInput.vue';

import { useBusStops } from '@/composables/useBusStops';

const { tableStops, filters, setSortingOrder } = useBusStops();

const tableStopsHeader = [
  {
    key: 'bus-stops',
    value: 'Bus Stops',
    sort: true,
  },
];
</script>

<style lang="scss" scoped src="./BusStopsPage.scss" />
