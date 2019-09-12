<template>
  <v-container text-center>
    <h1 class="register__title text-center">Login</h1>
    <v-form @submit.prevent="handleSubmit" v-model="valid" class="home-section">
      <v-flex xs12 offset-md4 md4>
        <v-text-field required type="email" :rules="emailRules" v-model="email" label="E-mail" />
        <v-text-field required type="password" :rules="passwordRules" v-model="password" label="Password" />
        <v-btn color="success" :disabled="!valid" block type="submit">Logar</v-btn>
        <p class="register__text">
          Ainda não é cadastrado? <router-link to="/register" class="register__text-link">Crie sua conta.</router-link>
        </p>
      </v-flex>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail obrigatório!',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      password: '',
      passwordRules: [v => !!v || 'Password obrigatório!'],
      valid: true,
    };
  },
  methods: {
    handleSubmit: () => {
      console.log('logando');
    },
  },
};
</script>

<style lang="scss" scoped>
.register__title {
  margin: 5rem 0 2rem;
}

.register__text {
  font-size: 12px;
  text-align: right;
  margin-top: .5rem;

  &-link {
    text-decoration: none;
  }
}
</style>
