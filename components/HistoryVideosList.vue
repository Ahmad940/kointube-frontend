<template>
  <div>
    <v-row>
      <v-col v-for='video in mutableVideos' :key='video.id' cols='12' sm='6' md='4'>
        <HistoryThumbCard :video='video.video' @deleteVideo='deleteVideo' />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Notify } from 'notiflix'
import HistoryThumbCard from './HistoryThumbCard'

export default {
  name: 'HistoryVideoLists',
  components: { HistoryThumbCard },
  props: {
    videos: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      mutableVideos: this.videos
    }
  },
  methods: {
    async deleteVideo(videoid) {
      try {
        await this.$axios.$delete(`/history/${videoid}`)
        this.mutableVideos = this.mutableVideos.filter((history) => history.video.id !== videoid)
        Notify.success('video removed successfully', {
          position: 'right-bottom',
          timeout: 2000,
        })
      } catch ({ response }) {
        // eslint-disable-next-line no-console
        console.log('response', response.data.message)
        Notify.failure('Unable to remove item', {
          position: 'right-bottom',
          timeout: 2000,
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
