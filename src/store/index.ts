import { createStore } from 'vuex';
import { timetable } from './modules/timetable';

export default createStore({
  modules: {
    timetable,
  },
});
