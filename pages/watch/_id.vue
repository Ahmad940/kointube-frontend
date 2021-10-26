<template>
  <div>
    <v-row>
      <v-col cols='12' md='8'>
        <v-card>
          <v-card-title>
            <v-avatar size='30' class='mr-2 white--text' :color='randomColor'>
              {{ video.author.username.charAt(0).toUpperCase() }}
            </v-avatar>
            <span class='text-h6 font-weight-light'>
              {{ video.author.username | capitalize }}
            </span>
            <v-spacer />
            <v-btn color='secondary' small depressed @click='dev'
            >Subscribe
            </v-btn
            >
          </v-card-title>

          <v-card-subtitle>{{
              $dayjs(video.createdAt).fromNow()
            }}
          </v-card-subtitle>

          <video controls width='100%' height='320'>
            <source :src='video.videoUrl' type='video/mp4' />
          </video>

          <!--          <v-card-text>-->
          <v-card-title>{{ video.title | capitalize }}</v-card-title>
          <!--          </v-card-text>-->

          <v-card-actions class='my-0'>
            <v-spacer />
            <v-btn v-if='!video._count.Like' icon @click='dev'>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-badge
              v-else
              color='green'
              overlap
              :content='video._count.Like'
            >
              <v-btn icon @click='dev'>
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
            </v-badge>


            <v-btn v-if='!video._count.dislike' icon @click='dev'>
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
            <v-badge
              v-else
              color='green'
              overlap
              :content='video._count.dislike'
            >
              <v-btn icon @click='dev'>
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </v-badge>
            <v-btn depressed text elevation='=0' @click='dev'>
              <v-icon left>mdi-cloud-upload</v-icon>
              Download
            </v-btn>
            <v-btn text depressed elevation='=0' @click='dev'>
              <v-icon left>mdi-share</v-icon>
              Share
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols='12' md='4'>
        <recommended-section-list />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Report } from 'notiflix'
import recommendedSectionList from '../../components/recommended-section-list.vue'

export default {
  name: 'WatchPage',
  components: { recommendedSectionList },
  async asyncData({ $axios, params, error }) {
    try {
      const video = await $axios.$get(`/video/${params.id}`)
      // eslint-disable-next-line no-console
      console.log('video', video)

      return {
        video
      }
    } catch ({ response }) {
      // Report.failure('Error', response.data.message, 'Ok')
      if (response.status === 404)
        return error({
          statusCode: response.status,
          message: response.data.message
        })
      return error({
        statusCode: response.status,
        message: response.data.message
      })
    }
  },
  computed: {
    randomColor: () => {
      const colors = [
        'red',
        'brown',
        'orange',
        'green',
        'tomato',
        'indigo',
        'purple'
      ]
      const randIndex = Math.floor(Math.random() * colors.length)
      return colors[randIndex]
    },
    formatedDate() {
      // eslint-disable-next-line no-console
      console.log('dayjs', this.$dayjs)
      return this.$dayjs().format('YYYY/MM/DD')
    }
  },
  methods: {
    dev() {
      Report.success(
        'Coming soon...',
        'This feature is under development...',
        'Ok'
      )
    }
  }
}
</script>

<style scoped></style>
