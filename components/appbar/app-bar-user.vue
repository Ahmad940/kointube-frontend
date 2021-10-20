<template>
  <v-app-bar color='primary' flat app dark>
    <v-app-bar-title>
      <nuxt-link to='/'>
        <v-img src='/logolight.png'   height='100' width='150' />
      </nuxt-link>

<!--      <nuxt-link to='/' class='text-decoration-none white&#45;&#45;text'>-->
<!--        KoinTube-->
<!--      </nuxt-link>-->
    </v-app-bar-title>
    <v-spacer />
    <v-btn to="/auth/notification" dark depressed fab icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <ProfileMenu />
  </v-app-bar>

</template>

<script>

import ProfileMenu from './profile_menu'
export default {
  name: 'AppBarUser',
  components: { ProfileMenu },
}
</script>

<style scoped>

</style>
