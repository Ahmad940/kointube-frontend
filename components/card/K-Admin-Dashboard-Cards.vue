<template>
  <v-row class="mt-2">
    <v-col cols="12" sm="11" md="4">
      <MaterialStatsCard
        color="secondary"
        class="mt-6"
        icon="mdi-badge-account"
        title="Channels"
        value="100"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <MaterialStatsCard
        color="secondary"
        class="mt-6"
        icon="mdi-video"
        title="Videos"
        value="344"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <MaterialStatsCard
        color="secondary"
        class="mt-6"
        icon="mdi-eye"
        title="Report"
        value="3443"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
  </v-row>
</template>

<script>
import MaterialStatsCard from '~/components/card/MaterialStatsCard'

export default {
  name: 'KAdminDashboardCards',
  components: { MaterialStatsCard },
}
</script>

<style scoped></style>
