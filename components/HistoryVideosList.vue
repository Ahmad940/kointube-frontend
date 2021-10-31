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
    deleteVideo(videoid) {
      // eslint-disable-next-line no-console
      console.log('video', videoid)
      // this.mutableVideos = this.mutableVideos.filter((video) => video.id !== videoid)
    }
  }
}
</script>

<style scoped>

</style>
