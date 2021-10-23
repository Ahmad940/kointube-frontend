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
import {truncate} from 'lodash-es'
import VideoThumbCard from '../../components/VideoThumbCard'
import filterMixin from '~/mixins/filter-mixin'

export default {
  components: { VideoThumbCard },
  mixins: [filterMixin],
  async asyncData({ params, $axios }) {
    const videos = await $axios.$get(`video/channel/${params.id}`)

    return { videos }
  },
  computed: {
    randomColor: () => {
      const colors = ['red', 'brown', 'orange', 'green', 'tomato', 'indigo', 'purple']
      const randIndex = Math.floor(Math.random() * colors.length)
      return colors[randIndex]
    },
  },
  methods: {
    truncateText(text) {
        return truncate(text, {
          'length': 26,
          'separator': ' '
        });
    },
  }
}
</script>
