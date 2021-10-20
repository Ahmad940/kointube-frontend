<template>
  <v-container>
  </v-container>
</template>

<script>
import { Notify } from 'notiflix'

export default {
  name: 'Logout',
  mounted() {
    this.$auth.logout()
    Notify.success('Signed out successfully', {
      timeout: 1000,
      position: 'right-bottom',
    })
  }
}
</script>

<style scoped>

</style>
