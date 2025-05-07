import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './modules/routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
