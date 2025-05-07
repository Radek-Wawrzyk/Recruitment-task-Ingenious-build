import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { TimetableStop } from '@/types/Timetable';
import { SortingOrder, SortingOrderKeys } from '@/types/Sorting';
import { TableRowRecord } from '@/types/Table';
import { FiltersSettings } from '@/types/Filters';
import { getUUID } from '@/utils/';

const useBusLines = () => {
  const store = useStore();

  const activeLine = ref<null | number>(null);
  const activeStop = ref<TimetableStop | null>(null);
  const filters = ref<FiltersSettings>({
    sortingOrder: SortingOrderKeys.ASC,
  });

  const lines = computed<number[]>(() => store.getters['timetable/getAllLines']);
  const hasLines = computed<boolean>(() => !!(lines.value && lines.value.length));

  const getSelectedLineStops = computed<TimetableStop[]>(() =>
    store.getters['timetable/getAllLineStops']({
      line: activeLine.value,
      sortingOrder: filters.value.sortingOrder,
    }),
  );

  const getActiveLineText = computed(() => `Bus Line: ${activeLine.value}`);
  const getActiveStopText = computed(() => `Bus Stop: ${activeStop.value?.stop}`);

  const getActiveStops = computed<TimetableStop[]>(() => {
    return store.getters['timetable/getAllLineStopHours']({
      stop: activeStop.value?.stop,
      line: activeStop.value?.line,
    });
  });

  const tableStopsRows = computed(() => {
    return getSelectedLineStops.value.map((stop) => ({
      key: stop.stop,
      value: stop.stop,
      data: stop,
    }));
  });

  const tableActiveStopsRows = computed(() => {
    return getActiveStops.value.map((stop) => ({
      key: getUUID(),
      value: stop.time,
      data: stop,
    }));
  });

  const setActiveLine = (line: number) => {
    activeStop.value = null;
    activeLine.value = line;
  };

  const setActiveStop = (stop: TableRowRecord) => {
    activeStop.value = stop.data as TimetableStop;
  };

  const setSortingOrder = (sort: SortingOrder) => {
    filters.value.sortingOrder = sort;
  };

  return {
    activeLine,
    activeStop,
    filters,
    lines,
    hasLines,
    getSelectedLineStops,
    getActiveLineText,
    getActiveStopText,
    getActiveStops,
    tableStopsRows,
    tableActiveStopsRows,
    setActiveLine,
    setActiveStop,
    setSortingOrder,
  };
};

export { useBusLines };
