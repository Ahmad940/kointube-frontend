<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="12" md="8">
        <v-card flat outlined>
          <v-card-title>
            <v-avatar size="30" class="mr-2 white--text" :color="randomColor">
<!--              {{ video.author.username.charAt(0).toUpperCase() }}-->
              <v-img :src='video.author.profile_img' lazy-src='/minilogo.png' />
            </v-avatar>
            <span class="text-h6 font-weight-light">
              {{ video.author.username | capitalize }}
            </span>
            <v-spacer />
            <v-btn color="secondary" small depressed @click="dev"
              >Subscribe
            </v-btn>
          </v-card-title>

          <v-card-subtitle
            >{{ $dayjs(video.createdAt).fromNow() }}
          </v-card-subtitle>

          <video controls width="100%" height="320">
            <source :src="video.videoUrl" type="video/mp4" />
          </video>

          <!--          <v-card-text>-->
          <v-card-title>{{ video.title | capitalize }}</v-card-title>
          <!--          </v-card-text>-->

          <v-card-actions class="my-0">
            <p><v-icon>mdi-eye</v-icon> {{ video._count.View }} Views</p>
            <v-spacer />
            <v-btn
              v-if="!video._count.Like"
              :color="video.liked ? 'primary' : 'grey'"
              icon
              @click="like"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-badge v-else color="green" overlap :content="video._count.Like">
              <v-btn
                icon
                :color="video.liked ? 'primary' : 'grey'"
                @click="like"
              >
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
            </v-badge>

            <v-btn
              v-if="!video._count.dislike"
              :color="video.disliked ? 'primary' : 'grey'"
              icon
              @click="dislike"
            >
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
            <v-badge
              v-else
              color="green"
              overlap
              :content="video._count.dislike"
            >
              <v-btn
                icon
                :color="video.disliked ? 'primary' : 'grey'"
                @click="dislike"
              >
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </v-badge>
            <!--            <v-btn depressed text elevation='=0' @click='dev'>-->
            <!--              <v-icon left>mdi-cloud-upload</v-icon>-->
            <!--              Download-->
            <!--            </v-btn>-->
            <v-btn text depressed elevation="=0" @click="dev">
              <v-icon left>mdi-share</v-icon>
              Share
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <recommended-section-list />
      </v-col>
    </v-row>
    <div>
      <v-divider class="my-10" />
      <h4>Comments</h4>
      <div class="mt-5">
        <v-expansion-panels flat multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>Comment 1</v-expansion-panel-header>
            <v-expansion-panel-content> Replies </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Comment 2</v-expansion-panel-header>
            <v-expansion-panel-content> Replies </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Comment 3</v-expansion-panel-header>
            <v-expansion-panel-content> Replies </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
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
      // // eslint-disable-next-line no-console
      // console.log('video', video)

      return {
        video,
      }
    } catch ({ response }) {
      // Report.failure('Error', response.data.message, 'Ok')
      if (response.status === 404)
        return error({
          statusCode: response.status,
          message: response.data.message,
        })
      return error({
        statusCode: response.status,
        message: response.data.message,
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
        'purple',
      ]
      const randIndex = Math.floor(Math.random() * colors.length)
      return colors[randIndex]
    },
    formatedDate() {
      // eslint-disable-next-line no-console
      console.log('dayjs', this.$dayjs)
      return this.$dayjs().format('YYYY/MM/DD')
    },
  },
  methods: {
    dev() {
      Report.success(
        'Coming soon...',
        'This feature is under development...',
        'Ok'
      )
    },
    async like() {
      // checking if the video is already dislike then you update some properties
      if (this.video.disliked) {
        // setting the disliked property to false
        this.video.disliked = false
        // decreasing the dislike number
        this.video._count.dislike = this.video._count.dislike - 1
      }

      try {
        // setting the liked boolean porperty to opposite of it value
        this.video.liked = !this.video.liked

        // sending the like to server
        const request = await this.$axios.$post('/video/action/like', {
          videoid: this.video.id,
        })

        // to improve performance we are not going to send a request to retreive the video meta data again
        // or run this.$nuxt.refresh() we are going to target the video object properties and update it
        this.video._count.Like = request.likes
      } catch ({ response }) {
        Report.failure('Error', response.data.message, 'Ok')
      }
    },
    async dislike() {
      // if video already like we are going to unlike it
      if (this.video.liked) {
        // removing the count number from the video object
        this.video.liked = false
        // decreasing the like number
        this.video._count.Like = this.video._count.Like - 1
      }

      try {
        // setting the object property to opposite of it self
        this.video.disliked = !this.video.disliked
        await this.$axios.$post('/video/action/dislike', {
          videoid: this.video.id,
        })

        // to improve performance we are not going to send a request to retreive the video meta data again
        // or run this.$nuxt.refresh() we are going to target the video object properties and update it

        // the server is returning an unexpected value for the dislike
        // it was tested and it working normal in postman
        // but i dont know why it not working in production
        if (!this.video.disliked)
          this.video._count.dislike = this.video._count.dislike - 1
        else this.video._count.dislike = this.video._count.dislike + 1
      } catch ({ response }) {
        Report.failure('Error', response.data.message, 'Ok')
      }
    },
  },
}
</script>

<style scoped></style>
