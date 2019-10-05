import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;

Vue.use(Toasted, {
  duration: 4000,
  keepOnHover: true,
  closeOnSwipe: true,
  iconPack: 'material',
  icon: 'done',
});

new Vue({
  router,
  vuetify,
  render: h => h(App),
  store,
}).$mount('#app');
