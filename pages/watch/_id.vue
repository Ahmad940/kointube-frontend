<template>
  <v-div>
    <v-row>
      <v-col cols='12' md='8'>
        <v-card>
          <v-card-title>
            <v-avatar size='30' class='mr-2 white--text' :color='randomColor'>
              {{ video.author.username.charAt(0).toUpperCase() }}
            </v-avatar>
            <span class='text-h6 font-weight-light'> {{ video.author.username }} </span>
            <v-spacer />
            <v-btn color='secondary' small depressed @click='subscribe'>Subscribe</v-btn>
          </v-card-title>

          <video controls width='100%'>
            <source :src='video.videoUrl' type='video/mp4' />
          </video>

          <!--          <v-card-text>-->
          <v-card-title>{{ video.title }}</v-card-title>
          <!--          </v-card-text>-->

          <v-card-actions class='my-0'>
            <v-spacer />
            <v-btn icon>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
            <v-btn depressed text elevation='=0'>
              <v-icon left>mdi-cloud-upload</v-icon>
              Download
            </v-btn>
            <v-btn text depressed elevation='=0'>
              <v-icon left>mdi-share</v-icon>
              Share
            </v-btn>
            <v-btn depressed elevation='=0' text>
              <v-icon left>mdi-flag</v-icon>
              Report
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
      <v-col cols='12' md='4'>
        <p>Hello to ma space</p>
      </v-col>
    </v-row>
  </v-div>
</template>

<script>
import { Report } from 'notiflix'

export default {
  name: 'WatchPage',
  async asyncData({ $axios, params, error }) {
    try {
      const video = await $axios.$get(`/video/${params.id}`)
      // eslint-disable-next-line no-console
      // console.log("FormData", this.formData)
      return {
        video
      }
    } catch ({ response }) {
      // Report.failure('Error', response.data.message, 'Ok')
      if (response.status === 404)
        return error({ statusCode: response.status, message: response.data.message })
      return error({ statusCode: response.status, message: response.data.message })
    }
  },
  computed: {
    randomColor: () => {
      const colors = ['red', 'brown', 'orange', 'green', 'tomato', 'indigo', 'purple']
      const randIndex = Math.floor(Math.random() * colors.length)
      return colors[randIndex]
    }
  },
  methods: {
    subscribe() {
      Report.success('Coming soon...', 'This feature is under development...', 'Ok')
    }
  }
}
</script>

<style scoped>

</style>
