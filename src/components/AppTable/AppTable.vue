<template>
  <table class="table app-table">
    <thead>
      <tr>
        <th
          v-for="element in header"
          :key="element.key"
          scope="col"
          class="app-table__header-cell"
          @click="onSortClick(element)"
        >
          <span class="app-table__header-value">{{ element.value }}</span>

          <svg
            v-if="element.sort"
            class="app-table__header-icon"
            :class="{ 'app-table__header-icon--is-active': activeSortingOrder === 'desc' }"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6668 8.66671L8.00004 11.3334M8.00004 11.3334L5.33337 8.66671M8.00004 11.3334L8.00004 4.66671M6.6667 14.6667H9.33337C11.2002 14.6667 12.1336 14.6667 12.8467 14.3034C13.4739 13.9838 13.9838 13.4739 14.3034 12.8467C14.6667 12.1336 14.6667 11.2002 14.6667 9.33338V6.66671C14.6667 4.79987 14.6667 3.86644 14.3034 3.15341C13.9838 2.5262 13.4739 2.01626 12.8467 1.69669C12.1336 1.33337 11.2002 1.33337 9.33338 1.33337H6.66671C4.79987 1.33337 3.86644 1.33337 3.15341 1.69669C2.5262 2.01626 2.01626 2.5262 1.69669 3.15341C1.33337 3.86644 1.33337 4.79986 1.33337 6.6667V9.33337C1.33337 11.2002 1.33337 12.1336 1.69669 12.8467C2.01626 13.4739 2.5262 13.9838 3.15341 14.3034C3.86644 14.6667 4.79986 14.6667 6.6667 14.6667Z"
              stroke="#63666E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in data" :key="row.key" @click="onRowClick(row)" class="app-table__data">
        <th
          scope="row"
          class="app-table__data-cell"
          :class="{ 'app-table__data-cell--is-active': activeRowKey === row.key }"
        >
          {{ row.value }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
import { SortingOrder } from '@/types/Sorting';

interface TableHeaderRecord {
  key: string;
  value: string | number;
  sort: boolean;
}

interface TableRowRecord {
  key: string;
  value: string | number;
  data: unknown;
}

const emits = defineEmits<{
  (e: 'on-sort', order: SortingOrder): void;
  (e: 'on-row-click', row: TableRowRecord): void;
}>();

const props = withDefaults(
  defineProps<{
    header: TableHeaderRecord[];
    data: TableRowRecord[];
    activeSortingOrder?: SortingOrder;
    activeRowKey?: string;
  }>(),
  {
    header: () => [],
    data: () => [],
    activeSortingOrder: 'asc',
    activeRowKey: '',
  },
);

const onSortClick = (row: TableHeaderRecord) => {
  if (!row.sort) return;
  emits('on-sort', props.activeSortingOrder === 'asc' ? 'desc' : 'asc');
};

const onRowClick = (row: TableRowRecord) => {
  emits('on-row-click', row);
};
</script>

<style lang="scss" scoped src="./AppTable.scss" />
