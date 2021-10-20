<template>
  <v-app-bar color='primary' app dark>
    <v-app-bar-title>
      <nuxt-link to='/' class='text-decoration-none white--text'>
        {{ NAME }}
      </nuxt-link>
    </v-app-bar-title>
    <v-spacer />
    <v-btn color='primary' depressed dark link to='/auth/login'>Sign In</v-btn>
    <v-btn color='primary' depressed dark link to='/auth/signup'>Sign Up</v-btn>
  </v-app-bar>

</template>

<script>
import appStore from '~/mixins/app-store'

export default {
  name: 'MidAppBarGuess',
  mixins: [appStore]
}
</script>

<style scoped>

</style>
