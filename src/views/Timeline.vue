<template>
  <div>
    <v-container>
      <p class="timeline-title">Bem-vindo {{ user.email }}</p>
      <div class="timeline-wrapper">
        <v-select
          class="timeline-wrapper-select"
          placeholder="Produção"
          :items="environment"
        ></v-select>
        <v-select
          class="timeline-wrapper-select"
          placeholder="Ordenar por"
          :items="orderBy"
        ></v-select>
        <v-select
          class="timeline-wrapper-select"
          placeholder="Buscar por"
          :items="searchBy"
        ></v-select>
      </div>
    </v-container>
    <div class="timeline-content">
      <v-btn class="timeline-actions" @click="this.save">Arquivar</v-btn>
      <v-btn class="timeline-actions" @click="this.delete">Apagar</v-btn>
    </div>
    <v-container>
      <v-simple-table fixed-header height="400px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Level</th>
              <th class="text-center">Log</th>
              <th class="text-center">Origem</th>
              <th class="text-right">Eventos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in logs" :key="index" class="item">
              <td>
                <v-chip
                  :color="
                    log.level === 'DEBUG' ? 'primary' : log.level.toLowerCase()
                  "
                >
                  {{ log.level }}
                </v-chip>
              </td>
              <td>
                <div class="text-center item-description">
                  <span class="subtitle-1 font-weight-medium">
                    {{ log.description }}
                  </span>
                  <br />
                  <span class="item-subtitle">{{ log.details }}</span>
                </div>
              </td>
              <td class="text-center">{{ log.origin }}</td>
              <td class="text-right">{{ Math.floor(Math.random() * 100) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { getAllLogs } from '@/services/errorLogs';

export default {
  name: 'Timeline',
  data: () => ({
    environment: ['Produção', 'Homologação', 'Dev'],
    orderBy: ['Level', 'Frequência'],
    searchBy: ['Level', 'Descrição', 'Origem'],
    logs: [],
  }),
  computed: {
    ...mapState('user', ['user']),
  },
  mounted() {
    this.handleGetAllLogs();
    this.$emit('toggleLogout');
  },
  methods: {
    async handleGetAllLogs() {
      try {
        const response = await getAllLogs();

        const { data } = response;

        this.logs = data;
      } catch (err) {
        this.$toasted.error('Não foi possível obter os logs de erro', {
          icon: 'error_outline',
        });
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

.item {
  cursor: pointer;

  &-description {
    margin: 10px 0;
  }

  &-subtitle {
    color: #616161;
  }
}
</style>
