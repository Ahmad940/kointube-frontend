<template>
  <v-card height="445" width="100%" flat outlined :to="`/watch/${video.id}`">
    <v-card-title>
      <v-avatar size="30" class="mr-2 white--text">
        <v-img :src='video.author.profile_img' lazy-src='/minilogo.png' />
      </v-avatar>
      <span class="text-h6 font-weight-light">
        {{ video.author.channel_name || video.author.username | capitalize }}
      </span>

      <v-spacer />
      <v-icon @click.prevent="$emit('deleteVideo', video)">mdi-close</v-icon>

    </v-card-title>
    <v-card-subtitle>{{ $dayjs(video.createdAt).fromNow() }}</v-card-subtitle>

    <v-img height="250" :src="video.thumbnailUrl" :alt="video.title">
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <!--          <v-card-text>-->
    <!--          </v-card-text>-->
    <p class="title pa-2 font-weight-light">
      {{ truncateText(video.title) | capitalize }}
    </p>

    <v-card-actions>
      <span><v-icon>mdi-eye</v-icon> {{ video._count.View }} views</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { truncate } from 'lodash-es'
import filterMixin from '~/mixins/filter-mixin'

export default {
  name: 'HistoryThumbCard',
  mixins: [filterMixin],
  props: {
    video: {
      required: true,
      type: Object,
    },
  },
  computed: {
  },
  methods: {
    truncateText(text) {
      return truncate(text, {
        length: 30,
        separator: ' ',
      })
    },
  },
}
</script>

<style scoped></style>
