<template>
  <v-app class="app">
    <v-app-bar app color="#2687e9" >
      <v-toolbar-title class="headline text-uppercase app-title">
        <span>Central de Erros</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer>
      <v-container align-center>
        <p>Desenvolvido por Squad-1</p>
      </v-container>
    </v-footer>
  </v-app>
</template>

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
