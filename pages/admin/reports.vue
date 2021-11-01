<template>
  <v-container>
    <p class='title'>Reports </p>

    <v-data-table
      :headers='headers'
      :items='reports'
      :items-per-page='5'
      class='elevation-1'
    >
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'ReportsPage',
  layout: 'admin',
  data: () => ({
    reports: [],
    headers: [
      { text: 'Video id', value: 'video.id' },
      { text: 'Title', value: 'video.title' },
      { text: 'Thumbnail', value: 'video.thumbnailUrl' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  head: {
    title: 'Reports',
  }
}
</script>

<style scoped>

</style>
