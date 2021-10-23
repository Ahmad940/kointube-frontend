<template>
  <v-app dark>

    <AppBarUser v-if='$auth.loggedIn' />
    <AppBarGuess v-else />

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>KoinTube &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppBarGuess from '../components/appbar/app-bar-guess'
import AppBarUser from '../components/appbar/app-bar-user'

export default {
  components: { AppBarUser, AppBarGuess },
  data() {
    return {
      title: 'AuthLayout',
    }
  },
}
</script>
