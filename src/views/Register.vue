<template>
  <v-container text-center>
    <h1 class="register__title text-center">Cadastro</h1>
    <v-form v-model="isValid" @submit.prevent="handleSubmit">
      <v-flex xs12 offset-md4 md4>
        <v-text-field required v-model="name" :rules="nameRules" label="Nome" />
        <v-text-field required v-model="email" :rules="emailRules" label="E-mail" />
        <v-text-field required v-model="password" :rules="passwordRules" label="Senha" type="password" />
        <v-btn color="success" :loading="loading" :disabled="!isValid" block type="submit">Cadastrar</v-btn>
        <p class="login__text">
          Já possui uma conta? <router-link to="/" class="login__text-link">Faça o seu login.</router-link>
        </p>
      </v-flex>
    </v-form>
  </v-container>
</template>

<script>
import { register as registerUser } from '@/services/users';

export default {
  name: 'register',
  data: () => ({
    isValid: true,
    loading: false,
    responseMessage: false,
    error: false,
    name: '',
    email: '',
    password: '',
    // Rules
    nameRules: [
      v => !!v || 'O nome é obrigatório',
      v => (v && v.length >= 3) || 'O nome deve ter mais do que 3 caracteres',
    ],
    emailRules: [
      v => !!v || 'O e-mail é obrigatório',
      v => /.+@.+\..+/.test(v) || 'Você deve informar um e-mail válido',
    ],
    passwordRules: [
      v => !!v || 'A senha é obrigatória',
      v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caracteres',
      v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(v) || 'A senha deve conter letras e números',
    ]
  }),
  methods: {
    async handleSubmit() {
      const { name, email, password } = this;

      this.error = false;
      this.loading = true;

      try {
        await registerUser({ name, email, password });

        this.$toasted.success('Cadastro efetuado com sucesso!')
      } catch (err) {
        this.$toasted.error('Não foi possível efetuar o cadastro. :(');
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

.login__text {
  font-size: 12px;
  text-align: right;
  margin-top: .5rem;

  &-link {
    text-decoration: none;
  }
}
</style>
