<template>
  <div>
    <v-container>
      <p class="timeline-title">Bem-vindo {{ user.email }}</p>
      <div class="timeline-wrapper">
        <v-select class="timeline-wrapper-select" placeholder="Produção" :items="environment"></v-select>
        <v-select class="timeline-wrapper-select" placeholder="Ordenar por" :items="orderBy"></v-select>
        <v-select class="timeline-wrapper-select" placeholder="Buscar por" :items="searchBy"></v-select>
      </div>
    </v-container>
    <div class="timeline-content">
      <v-btn class="timeline-actions" @click="this.save">Arquivar</v-btn>
      <v-btn class="timeline-actions" @click="this.delete">Apagar</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { getAllLogs, getOneLog } from '@/services/errorLogs';

export default {
  name: 'Timeline',
  data: () => ({
    environment: ['Produção', 'Homologação', 'Dev'],
    orderBy: ['Level', 'Frequência'],
    searchBy: ['Level', 'Descrição', 'Origem'],
  }),
  computed: {
    ...mapState('user', ['user']),
  },
  mounted() {
    this.handleGetAllLogs();
  },
  methods: {
    async handleGetAllLogs() {
       try {
        const response = await getAllLogs();

        const { data } = response;

        console.log(data);

      } catch (err) {
        console.error(err);
      }
    },
    save: () => {
      console.log('salvando');
    },
    delete: () => {
      console.log('deletando');
    },
  },
};
</script>

<style lang="scss" scoped>
.timeline {
  &-title {
    font-size: 24px;
  }
  &-wrapper {
    display: flex;

    & > div {
      margin-right: 30px;
    }

    &-select {
      width: 280px;
    }
  }

  &-actions {
    &:last-child {
      margin-left: 30px;
    }
  }

  &-content {
    width: 100%;
    padding: 12px 130px;
    background-color: #e6e6e6;
  }
}
</style>
