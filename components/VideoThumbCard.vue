<template>
  <v-card height='445' width='100%' :to='`/watch/${video.id}`'>
    <v-card-title>
      <v-avatar size='30' class='mr-2 white--text' :color='randomColor'>
        {{ video.author.username.charAt(0).toUpperCase() }}
      </v-avatar>
      <span class='text-h6 font-weight-light'> {{ video.author.username | startCase }} </span>
    </v-card-title>
    <v-card-subtitle>{{ $dayjs(video.createdAt).fromNow() }}</v-card-subtitle>

    <v-img
      height='250'
      :src='video.thumbnailUrl'
      :alt='video.title'
    >
      <template #placeholder>
        <v-row
          class='fill-height ma-0'
          align='center'
          justify='center'
        >
          <v-progress-circular
            indeterminate
            color='grey lighten-5'
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <!--          <v-card-text>-->
    <!--          </v-card-text>-->
    <p class='title pa-2 font-weight-light'>{{ video.title }}</p>

    <v-card-actions>
      <span><v-icon>mdi-eye</v-icon> 23233 views</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import {truncate} from 'lodash-es'
import filterMixin from '~/mixins/filter-mixin'

export default {
  name: 'VideoThumbCard',
  mixins: [filterMixin],
  props: {
    video: {
      required: true,
      type: Object,
    }
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

<style scoped>

</style>
