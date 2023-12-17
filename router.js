// router.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import StartScreenPage from '/components/StartScreenPage';
import AnotherPage from './components/AnotherPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: StartScreenPage },
  { path: '/another-page', component: AnotherPage },
  // Add more routes as needed
];

const router = new VueRouter({
  routes,
});

export default router;
