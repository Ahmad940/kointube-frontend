<template>
  <v-app dark>

    <v-app-bar app flat>
      <v-btn icon class='hidden-md-and-down' @click='miniVariant = !miniVariant'>
        <v-icon color='darkgrey'>mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon class='darkgrey--text mr-3' @click='drawer = !drawer' />
      <nuxt-link to='/channel/dashboard'>
        <v-img src='/logodark.png' height='80' width='150' />
      </nuxt-link>
<!--      <nuxt-link to='/app' class='text-decoration-none white&#45;&#45;text'>-->
<!--        <v-app-bar-title class='grey&#45;&#45;text'>-->
<!--          {{ title }}-->
<!--        </v-app-bar-title>-->
<!--      </nuxt-link>-->
      <v-spacer />
<!--      <v-avatar class='d-none d-sm-flex' size='35'>-->
<!--        <img-->
<!--          src='https://cdn.vuetifyjs.com/images/john.jpg'-->
<!--          alt='John'-->
<!--        >-->
<!--      </v-avatar>-->
      <ChannelProfileMenu />
    </v-app-bar>

    <!--    <_mid-navigation />-->
    <v-navigation-drawer v-model='drawer' :mini-variant='miniVariant' color='primary' app>
      <v-list nav>
        <v-list-item
          v-for='item in items'
          :key='item.title'
          link
          :to='item.to'
          exact
        >
          <v-list-item-icon>
            <v-icon color='white'>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class='white--text'>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class='grey lighten-4'>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>

import ChannelProfileMenu from '../components/appbar/channel_profile_menu'
export default {
  name: 'DashBoardLayout',
  components: { ChannelProfileMenu },
  data: () => ({
    title: 'KoinTube',
    drawer: null,
    miniVariant: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/studio/dashboard' },
      { title: 'Content', icon: 'mdi-card-account-details', to: '/studio/content' },
      { title: 'Upload', icon: 'mdi-account-details', to: '/studio/upload' },
    ]
  }),
  computed: {}
}
</script>
