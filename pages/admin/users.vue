<template>
  <v-container>
    <p class='title'>Users</p>

    <div v-if='$fetchState.pending'>
      <v-skeleton-loader type='card' />
    </div>
    <v-data-table
      v-else
      :headers='headers'
      :items='users'
      :items-per-page='5'
      class='elevation-1'
    >

      <!--      profile image sluts-->
      <template #[`item.profile_img`]='{ item }'>
        <v-img
          class='ma-5'
          :src='item.profile_img'
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
  name: 'UsersPage',
  layout: 'admin',
  data: () => ({
    users: [],
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'User name', value: 'username' },
      { text: 'Profile Image', value: 'profile_img' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  async fetch() {
    this.users = await this.$axios.$get('/users')
  },
  head: {
    title: 'Users'
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
