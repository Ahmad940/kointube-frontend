<template>
  <v-container>
    <p class='title'>Videos</p>

    <div v-if='$fetchState.pending'>
      <v-skeleton-loader type='card' />
    </div>
    <v-data-table
      v-else
      :headers='headers'
      :items='videos'
      :items-per-page='5'
      class='elevation-1'
    >

      <!--      profile image sluts-->
      <template #[`item.thumbnailUrl`]='{ item }'>
        <v-img
          class='ma-5'
          :src='item.thumbnailUrl'
          lazy-src='/minilogo.png'
          height='100'
          width='100'>
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
      </template>

      <!--    Actions slut      -->
      <template #[`item.actions`]='{ item }'>
        <v-icon
          small
          class='mr-2'
          @click='dev(item)'
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click='dev(item)'
        >
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>
  </v-container>
</template>

<script>
import { Report } from 'notiflix'

export default {
  name: 'VideosPage',
  layout: 'admin',
  data: () => ({
    videos: [],
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Title', value: 'title' },
      { text: 'Thumbnail', value: 'thumbnailUrl' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  async fetch() {
    this.videos = await this.$axios.$get('/video')
  },
  head: {
    title: 'Videos',
  },
  methods: {
    dev(item) {
      Report.success('Coming soon', 'Feature under core development', 'Ok')
    }
  }
}
</script>

<style scoped>

</style>
