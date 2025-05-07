<template>
  <div class="lines-page">
    <app-card title="Select Bus Line">
      <ul class="lines-page__list" v-if="hasLines">
        <app-badge
          v-for="line in lines"
          :key="line"
          :is-active="line === activeLine"
          @click="setActiveLine(line)"
        >
          {{ line }}
        </app-badge>
      </ul>
    </app-card>

    <div class="lines-page__content">
      <app-placeholder-card
        placeholder="Please select the bus line first"
        :hasContent="!!activeLine"
      >
        <app-card :title="getActiveLineText" :no-padding-content="true" class="lines-page__card">
          <app-table
            :data="tableStopsRows"
            :header="tableStopsHeader"
            :active-sorting-order="filters.sortingOrder"
            :active-row-key="activeStop?.stop"
            @on-row-click="setActiveStop($event)"
            @on-sort="setSortingOrder($event)"
          />
        </app-card>
      </app-placeholder-card>

      <app-placeholder-card
        :placeholder="
          !activeLine ? 'Please select the bus line first' : 'Please select the bus stop first'
        "
        :hasContent="!!activeStop"
      >
        <app-card :title="getActiveStopText" :no-padding-content="true" class="lines-page__card">
          <app-table :data="tableActiveStopsRows" :header="tableStopTimesHeader" />
        </app-card>
      </app-placeholder-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppCard from '@/components/AppCard/AppCard.vue';
import AppPlaceholderCard from '@/components/AppPlaceholderCard/AppPlaceholderCard.vue';
import AppBadge from '@/components/AppBadge/AppBadge.vue';
import AppTable from '@/components/AppTable/AppTable.vue';
import { useBusLines } from '@/composables/useBusLines';

const {
  activeLine,
  activeStop,
  filters,
  lines,
  hasLines,
  getActiveLineText,
  getActiveStopText,
  tableStopsRows,
  tableActiveStopsRows,
  setActiveLine,
  setActiveStop,
  setSortingOrder,
} = useBusLines();

const tableStopsHeader = [
  {
    key: 'bus-stops',
    value: 'Bus Stops',
    sort: true,
  },
];

const tableStopTimesHeader = [
  {
    key: 'bus-time-stops',
    value: 'Time',
    sort: false,
  },
];
</script>

<style lang="scss" scoped src="./BusLinesPage.scss" />
