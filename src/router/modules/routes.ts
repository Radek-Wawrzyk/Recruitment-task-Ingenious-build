import type { RouteRecordRaw } from 'vue-router';
import { ROUTING } from '@/constants/Routing';

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTING.LINES.PATH,
    name: ROUTING.LINES.NAME,
    component: () =>
      import(/* webpackChunkName: "lines-page" */ '@/pages/BusLinesPage/BusLinesPage.vue'),
  },
  {
    path: ROUTING.STOPS.PATH,
    name: ROUTING.STOPS.NAME,
    component: () =>
      import(/* webpackChunkName: "stops-page" */ '@/pages/BusStopsPage/BusStopsPage.vue'),
  },
];

export { routes };
