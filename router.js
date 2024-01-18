// router.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import stylesheet from './stylesheet';
import StartScreen from '/components/StartScreen.vue';
import Blog from '/components/Blog.vue';

const routes = [{
  routes: [{
    path: '/', component: StartScreen,
    path: '/Blog', component: Blog
  }]
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(Blog);
app.use(router);
router.beforeEach(stylesheet);

app.mount("#app");
export default router;
