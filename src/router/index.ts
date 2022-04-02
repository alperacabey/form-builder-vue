import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: () => import('../views/FormBuilder.vue'),
  },
  {
    path: '/form',
    name: 'FormConductor',
    component: () => import('../views/FormConductor.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
