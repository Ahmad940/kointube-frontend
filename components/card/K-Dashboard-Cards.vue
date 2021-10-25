<template>
  <v-row class="mt-2">
    <v-col cols="12" sm="11" md="4">
      <MaterialStatsCard
        color="secondary"
        class="my-6"
        icon="mdi-video"
        title="Videos"
        :value="videoLength"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <MaterialStatsCard
        color="secondary"
        class="my-6"
        icon="mdi-badge-account"
        title="Subscribers"
        value="0"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <MaterialStatsCard
        color="secondary"
        class="my-6"
        icon="mdi-eye"
        title="Views"
        value="0"
        sub-icon="mdi-clock"
        sub-text="Just Updated"
      />
    </v-col>
  </v-row>
</template>

<script>
import { Report } from 'notiflix'
import MaterialStatsCard from '~/components/card/MaterialStatsCard'

export default {
  name: 'KDashboardCards',
  components: { MaterialStatsCard },
  data() {
    return {
      videoLength: '',
      loading: false,
      deleteDialog: false,
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Thumbnail', value: 'thumbnailUrl' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  async fetch() {
    try {
      this.loading = true
      const videos = await this.$axios.$get('/auth/videos')
      this.videoLength = videos.length + ''

      this.loading = false
    } catch ({ response }) {
      this.loading = false
      Report.failure('Error', response.data.message, 'Ok')
    }
  },
}
</script>

<style scoped></style>
