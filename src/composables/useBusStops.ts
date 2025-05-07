import { TimetableStop } from '@/types/Timetable';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getUUID } from '@/utils/index';
import { FiltersSettings } from '@/types/Filters';
import { SortingOrder, SortingOrderKeys } from '@/types/Sorting';

const useBusStops = () => {
  const store = useStore();
  const filters = ref<FiltersSettings>({
    query: '',
    sortingOrder: SortingOrderKeys.ASC,
  });

  const stops = computed<TimetableStop[]>(() =>
    store.getters['timetable/getAllStops'](filters.value),
  );

  const tableStops = computed(() => {
    return stops.value.map((row) => ({
      key: getUUID(),
      value: row.stop,
      data: row,
    }));
  });

  const setSortingOrder = (sort: SortingOrder) => {
    filters.value.sortingOrder = sort;
  };

  return { stops, tableStops, filters, setSortingOrder };
};

export { useBusStops };
