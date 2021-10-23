<template>
  <v-container>
    <KAdminDashboardCards />
  </v-container>
</template>

<script>
import KAdminDashboardCards from '../../components/card/K-Admin-Dashboard-Cards'
export default {
  name: 'AdminDashBoard',
  components: { KAdminDashboardCards },
  layout: 'admin',
  head: {
    title: 'Dashboard',
  }
}
</script>

<style scoped>

</style>
