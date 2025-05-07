import { TimetableModuleState, TimetableStop } from '@/types/Timetable';
import { busStopsService } from '@/api/services/stops';
import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { LOCALE_CODES } from '@/constants/Locale';
import { FiltersLinesSettings, FiltersSettings } from '@/types/Filters';
import { useLoading } from '@/composables/useLoading';
import { removeStopDuplicates, sleep, sortStops } from '@/utils/index';

const timetable = {
  namespaced: true,
  state: () => ({
    stops: [],
    loading: false,
    error: false,
  }),
  mutations: <MutationTree<TimetableModuleState>>{
    SET_STOPS: (state, payload: TimetableStop[]) => {
      state.stops = payload;
    },
    SET_ERROR: (state, payload: boolean) => {
      state.error = payload;
    },
  },
  actions: <ActionTree<TimetableModuleState, unknown>>{
    load: async ({ commit }) => {
      const { setLoading } = useLoading();
      setLoading(true);

      try {
        const { data } = await busStopsService.getAll();

        await sleep(750);
        commit('SET_STOPS', data);
        commit('SET_ERROR', false);
      } catch (error) {
        commit('SET_ERROR', true);
      } finally {
        await sleep(750);
        setLoading(false);
      }
    },
  },
  getters: <GetterTree<TimetableModuleState, unknown>>{
    getAllLines: (state) => {
      return state.stops
        .reduce((acc: number[], stop: TimetableStop) => {
          if (!acc.includes(stop.line)) acc.push(stop.line);
          return acc;
        }, [])
        .sort();
    },
    getAllLineStops: (state) => (filters: FiltersLinesSettings) => {
      if (!filters.line) return [];

      const stops = removeStopDuplicates(
        state.stops.filter((busLine) => busLine.line === filters.line),
      );
      return sortStops(stops, filters.sortingOrder, 'stop');
    },
    getAllLineStopHours: (state) => (filters: FiltersLinesSettings) => {
      if (!filters) return [];
      const stops = state.stops.filter(
        (stop) => stop.line === filters.line && stop.stop === filters.stop,
      );

      // INFO: Sort based on the split method as we need to have the same format of time (4 digits like 04:15 instead of 4:15)
      return stops.sort((a, b) => {
        const [aHour, aMinute] = a.time.split(':').map(Number);
        const [bHour, bMinute] = b.time.split(':').map(Number);

        return aHour - bHour || aMinute - bMinute;
      });
    },
    getAllStops: (state) => (filters: FiltersSettings) => {
      const stops = removeStopDuplicates(state.stops);

      if (!filters) return stops.sort((a, b) => a.stop.localeCompare(b.stop, LOCALE_CODES.POLISH));

      const filteredStops = stops.filter((item) =>
        item.stop.toLocaleLowerCase().includes(filters.query ? filters.query : ''),
      );
      return sortStops(filteredStops, filters.sortingOrder, 'stop');
    },
  },
};

export { timetable };
