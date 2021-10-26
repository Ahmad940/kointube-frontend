<template>
  <div>
    <v-row>
      <v-col cols="5"> <k-image :image="video.thumbnailUrl" /> </v-col>
      <v-col cols="7">
        <p>{{ video.title | capitalize }}</p>
        <p>
          <v-icon>mdi-eye</v-icon> {{ Math.floor(Math.random() * 100) }} Views
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import kImage from './k-image.vue'
export default {
  name: 'RecommendateVideos',
  components: { kImage },
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
}
</script>

<style scoped></style>
