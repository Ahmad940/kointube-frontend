<template>
  <v-row class='mt-10'>
    <v-col cols='12' sm='11' md='4'>
      <MaterialStatsCard color='info'
                         icon='mdi-video'
                         title='Videos'
                         value='100'
                         sub-icon='mdi-clock'
                         sub-text='Just Updated' />
    </v-col>
    <v-col cols='12' sm='12' md='4'>
      <MaterialStatsCard color='info'
                         icon='mdi-badge-account'
                         title='Subscribers'
                         value='344'
                         sub-icon='mdi-clock'
                         sub-text='Just Updated' />
    </v-col>
    <v-col cols='12' sm='12' md='4'>
      <MaterialStatsCard color='info'
                         icon='mdi-eye'
                         title='Views'
                         value='3443'
                         sub-icon='mdi-clock'
                         sub-text='Just Updated' />
    </v-col>
  </v-row>
</template>

<script>
import MaterialStatsCard from '~/components/card/MaterialStatsCard'

export default {
  name: 'KDashboardCards',
  components: { MaterialStatsCard }
}
</script>

<style scoped>

</style>
