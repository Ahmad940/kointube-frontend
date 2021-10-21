<template>
  <div>

    <p class='title'>Content Page</p>

    <v-data-table
      :headers='headers'
      :items='videos'
      :items-per-page='5'
      class='elevation-1'
    >

      <!--      thumbnails sluts-->
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
          @click='editItem(item)'
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click='deleteItem(item)'
        >
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>

  </div>
</template>

<script>
import { Report, Confirm } from 'notiflix'

export default {
  name: 'ContentIndex',
  layout: 'studio',
  data() {
    return {
      videos: [],
      loading: false,
      deleteDialog: false,
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Thumbnail', value: 'thumbnailUrl' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  async fetch() {
    try {
      this.loading = true
      this.videos = await this.$axios.$get('/auth/videos')
      this.loading = false
    } catch ({ response }) {
      this.loading = false
      Report.failure('Error', response.data.message, 'Ok')
    }
  },
  methods: {
    editItem(item) {
      // eslint-disable-next-line no-console
      console.log('Item', item)
    },
    deleteItem(item) {
      Confirm.show(
        'Delete Item',
        'Are you sure you want to delete this item\nThis action cannot be undone!',
        'Yes',
        'No',
        async () => {
          try {
            await this.$axios.$delete(`/video/${item.id}`)
            this.videos = this.videos.filter(video => video.id !== item.id)
          } catch ({ response }) {
              Report.failure('Error', response.data.message, 'Ok')
          }
        },
        () => {
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
