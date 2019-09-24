<template>
  <v-container text-center>
    <h1 class="register__title text-center">Login</h1>
    <v-form @submit.prevent="handleSubmit" v-model="valid" class="home-section">
      <v-flex xs12 offset-md4 md4>
        <v-text-field required type="email" :rules="usernameRules" v-model="username" label="E-mail" />
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
import { oauth as userAuth } from '@/services/auth';

export default {
  name: 'home',
  data() {
    return {
      username: '',
      usernameRules: [
        v => !!v || 'O usuário é obrigatório!',
        v => /.+@.+\..+/.test(v) || 'O usuário deve ser um e-mail válido',
      ],
      password: '',
      passwordRules: [v => !!v || 'A senhá é obrigatória'],
      valid: true,
    };
  },
  methods: {
    async handleSubmit() {
      const {
        username,
        password
      } = this;

      this.error = false;
      this.loading = true;

      try {
        await userAuth({ username, password });

        this.$toasted.success('Login realizado com sucesso!')
      } catch (err) {
        this.$toasted.error('Não foi possível realizar o login');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register__title {
  margin: 3rem 0 2rem;
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
