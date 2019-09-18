<template>
  <v-snackbar v-model="value" top right :timeout="timeout" :color="color">
    <slot />
    <v-btn
      text
      @click="closeToastr"
    >
      &times;
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Toastr',
  props: {
    color: {
      type: String,
      default: 'success'
    },
    timeout: {
      type: Number,
      default: 4000
    },
    value: {
      default: false
    }
  },
  data: () => ({

  }),
  methods: {
    closeToastr() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
