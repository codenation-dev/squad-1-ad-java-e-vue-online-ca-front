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
      <div class="text-center" v-if="loading">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <v-simple-table fixed-header height="400px" v-else >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                <input type="checkbox" id="selectAll" @change="handleChangeSelectAll" v-model="selectAll" :checked="logs.length === selectedLogs.length">
              </th>
              <th class="text-left">Level</th>
              <th class="text-center">Log</th>
              <th class="text-center">Origem</th>
              <th class="text-right">Eventos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :key="log.id" class="item">
              <td class="text-center">
                <input
                  type="checkbox"
                  :checked="selectAll"
                  @change="handleChangeSelected(log.id)"
                />
              </td>
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
    loading: false,
    selectAll: false,
    environment: ['Produção', 'Homologação', 'Dev'],
    orderBy: ['Level', 'Frequência'],
    searchBy: ['Level', 'Descrição', 'Origem'],
    logs: [],
    selectedLogs: [],
  }),
  computed: {
    ...mapState('user', ['user']),
  },
  mounted() {
    this.checkAuth();
    this.handleGetAllLogs();
    this.$emit('toggleLogout');
  },
  methods: {
    checkAuth() {
      if (!localStorage.getItem('token')) {
        this.$router.replace({ name: 'login' });
        return;
      }
    },
    async handleGetAllLogs() {
      this.loading = true;

      try {
        const response = await getAllLogs();

        const { data } = response;

        this.logs = data;
      } catch (err) {
        this.$toasted.error('Não foi possível obter os logs de erro', {
          icon: 'error_outline',
        });
      } finally {
        this.loading = false;
      }
    },
    handleChangeSelected(id) {
      const { selectedLogs } = this;

      if (selectedLogs.includes(id)) {
        console.log('remover item ', id);
        const index = selectedLogs.indexOf(id);
        this.selectedLogs.splice(index, 0);

        return;
      }

      console.log('adicionar item ', id);
      this.selectedLogs.push(id);
    },
    handleChangeSelectAll() {
      const { selectAll, selectedLogs, logs } = this;

      if (selectAll) {
        logs.map(log => {
          if (!selectedLogs.includes(log.id)) {
            this.selectedLogs.push(log.id);
          }
        });
        return;
      }

      this.selectedLogs = [];
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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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
