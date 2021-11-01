<template>
  <div v-if='$fetchState.pending'>
    <v-skeleton-loader type='card' />
  </div>
  <v-row v-else class="mt-2">
    <v-col cols="12" sm="11" md="4">
      <MaterialStatsCard
        color="secondary"
        class="mt-6"
        icon="mdi-badge-account"
        title="Channels"
        :value="channelsLength"
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
        :value="videoLength"
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
        :value="reportLength"
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
  name: 'KAdminDashboardCards',
  components: { MaterialStatsCard },
  data() {
    return {
      videoLength: '0',
      channelsLength: '0',
      reportLength: '0',
    }
  },
  async fetch() {
    try {
      this.loading = true
      const videolength = await this.$axios.$get(`/video/total_video_count`)
      const channelsList = await this.$axios.$get(`users/channel`)

      this.videoLength = videolength.videos.toString()
      this.channelsLength = channelsList.length.toString()

      this.loading = false
    } catch ({ response }) {
      this.loading = false
      Report.failure('Error', response.data.message, 'Ok')
    }
  }
}
</script>

<style scoped></style>
