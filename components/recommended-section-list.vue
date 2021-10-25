<template>
  <div>
    <div v-if="$fetchState.pending">
      <div v-for="skeleton in [1, 2, 3, 4]" :key="skeleton">
        <v-skeleton-loader type="card" />
      </div>
    </div>
    <div v-for="video in videos" v-else :key="video.id">
      <v-card color="accent" flat :to="`/watch/${video.id}`">
        <recommended-video :video="video" />
      </v-card>
    </div>
  </div>
</template>

<script>
import { Report } from 'notiflix'
import recommendedVideo from './recommended-video.vue'

export default {
  name: 'RecommendedVideosList',
  components: { recommendedVideo },
  data: () => ({
    videos: [],
  }),
  async fetch() {
    try {
      const videos = await this.$axios.$get(`/video`)
      // eslint-disable-next-line no-console
      // console.log("FormData", this.formData)
      this.videos = videos.slice(0, 4)
    } catch ({ response }) {
      Report.failure('Error', response.data.message, 'Ok')
      if (response.status === 404)
        return this.error({
          statusCode: response.status,
          message: response.data.message,
        })
    }
  },
}
</script>
