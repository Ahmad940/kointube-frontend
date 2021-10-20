<template>
  <v-app dark>

    <v-app-bar app flat>
      <v-btn icon class='hidden-md-and-down' @click='miniVariant = !miniVariant'>
        <v-icon color='grey'>mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon class='grey--text mr-3' @click='drawer = !drawer' />
      <nuxt-link to='/app' class='text-decoration-none white--text'>
        <v-app-bar-title class='grey--text'>
          {{ NAME }}
        </v-app-bar-title>
      </nuxt-link>
      <v-spacer />
      <v-avatar class='d-none d-sm-flex' size='35'>
        <img
          src='https://cdn.vuetifyjs.com/images/john.jpg'
          alt='John'
        >
      </v-avatar>
      <profile-menu />
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
import appStore from '~/mixins/app-store'
import ProfileMenu from '~/components/app/profilemenu'

export default {
  name: 'DashBoardLayout',
  components: { ProfileMenu },
  mixins: [appStore],
  data: () => ({
    title: 'Mid',
    drawer: null,
    miniVariant: false,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', to: '/app' },
      { title: 'Cards', icon: 'mdi-card-account-details', to: '/app/cards' },
      { title: 'Records', icon: 'mdi-account-details', to: '/app/records' },
      { title: 'Hospitals', icon: 'mdi-hospital', to: '/app/hospitals' }
    ]
  }),
  computed: {}
}
</script>
