<template>
  <v-app class="app">
    <v-app-bar app color="#0B486B">
      <v-toolbar-title class="headline text-uppercase app-title">
        <span>Central de Erros</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        right
        rounded
        color="#79BD9A"
        v-if="hasLogin"
        @click="handleLogout"
      >
        Sair
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view @toggleLogout="toggleLogout" />
    </v-content>
    <v-footer>
      <v-container align-center>
        <p>Desenvolvido por Squad-1</p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    hasLogin: false,
  }),
  methods: {
    toggleLogout() {
      const { hasLogin } = this;
      this.hasLogin = !hasLogin;
    },
    handleLogout() {
      localStorage.setItem('token', null);
      localStorage.setItem('refreshToken', null);

      this.toggleLogout();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app-title {
  color: #fff;
}
</style>
