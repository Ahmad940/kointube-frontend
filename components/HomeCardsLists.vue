<template>
  <div>
    <v-row>
      <v-col v-for='video in videos' :key='video.id' cols='12' sm='6' md='4'>
        <VideoThumbCard :video='video' />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VideoThumbCard from './VideoThumbCard'

export default {
  name: 'HomeCardsLists',
  components: { VideoThumbCard  },
  props: {
    videos: {
      required: true,
      type: Array,
    }
  },
}
</script>

<style scoped>

</style>
