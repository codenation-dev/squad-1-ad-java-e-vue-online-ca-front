<template>
  <v-container text-center>
    <h1 class="register__title text-center">Login</h1>
    <v-form @submit.prevent="handleSubmit" v-model="valid" class="home-section">
      <v-flex xs12 offset-md4 md4>
        <v-text-field
          required
          type="email"
          :rules="usernameRules"
          v-model="username"
          label="E-mail"
        />
        <v-text-field
          required
          type="password"
          :rules="passwordRules"
          v-model="password"
          label="Password"
        />
        <v-btn
          color="success"
          :disabled="!valid"
          block
          type="submit"
          :loading="loading"
        >
          Logar
        </v-btn>
        <p class="register__text">
          Ainda não é cadastrado?
          <router-link to="/register" class="register__text-link"
            >Crie sua conta.</router-link
          >
        </p>
      </v-flex>
    </v-form>
  </v-container>
</template>

<script>
import { oauth as userAuth } from '@/services/auth';
import { mapActions } from 'vuex';

export default {
  name: 'home',
  data: () => ({
    loading: false,
    username: '',
    usernameRules: [
      v => !!v || 'O usuário é obrigatório!',
      v => /.+@.+\..+/.test(v) || 'O usuário deve ser um e-mail válido',
    ],
    password: '',
    passwordRules: [v => !!v || 'A senha é obrigatória'],
    valid: true,
  }),
  methods: {
    ...mapActions('user', ['updateUser']),
    async handleSubmit() {
      const { username, password } = this;

      this.loading = true;

      try {
        const response = await userAuth({ username, password });

        const {
          data: { access_token: token, refresh_token: refreshToken },
        } = response;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        this.updateUser({ email: username });

        this.$toasted.success('Login realizado com sucesso!');

        this.$router.push({ name: 'timeline' });
      } catch (err) {
        this.$toasted.error('Não foi possível realizar o login', {
          icon: 'error_outline',
        });
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
  margin-top: 0.5rem;

  &-link {
    text-decoration: none;
  }
}
</style>
