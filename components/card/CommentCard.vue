<template>
  <div>
    <div>
      <div class="d-flex flex-column">
        <v-row align="start" justify="start">
          <v-col class="flex-grow-0">
            <v-avatar color="red" size="40">
              <img :src="comment.user.profile_img" alt="John" />
            </v-avatar>
          </v-col>
          <v-col>
            <p class="mb-0">
              {{ comment.content }}
            </p>
            <small
              >by {{ comment.user.username }} -
              {{ $dayjs(comment.createdAt).fromNow() }}</small
            >
            <div align="start" justify="start" class="mt-5">
              <div><v-text-field v-model="replyContent" outlined dense /></div>
            </div>
            <div class="flex-grow-0">
              <v-btn color="primary" @click="makeReply">reply</v-btn>
            </div>
            <div>
              <div v-for="reply in replies" :key="reply.id" class="mt-5 ml-5">
                <reply-card :reply="reply" />
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import { Report } from 'notiflix'
import ReplyCard from './ReplyCard.vue'

export default {
  name: 'Comments',
  components: { ReplyCard },
  props: {
    comment: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      replies: [],
      replyContent: '',
    }
  },
  async fetch() {
    const replyData = await this.$axios.$get(
      `/video/action/reply/${this.comment.id}`
    )
    this.replies = replyData
  },

  methods: {
    async makeReply() {
      try {
        console.log('reply content', this.replyContent)
        await this.$axios.$post('/video/action/reply', {
          content: this.replyContent,
          commentid: this.comment.id,
        })
      } catch (error) {
        Report.failure('Error')
      }
    },
  },
}
</script>
