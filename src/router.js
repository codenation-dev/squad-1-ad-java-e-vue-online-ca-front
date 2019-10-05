import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () =>
        import(/* webpackChunkName: "timeline" */ './views/Timeline.vue'),
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) {
          next();
          return;
        }

        next('/');
      },
    },
  ],
});
