import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;

Vue.use(Toasted, {
  duration: 5000,
  keepOnHover: true,
  closeOnSwipe: true,
  iconPack : 'material',
  icon: 'done',
});

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
