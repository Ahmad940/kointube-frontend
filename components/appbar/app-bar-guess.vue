<template>
  <v-app-bar color='primary' flat app dark>
    <v-app-bar-title>
      <nuxt-link to='/'>
        <v-img src='1.png'   height='100' width='150' />
      </nuxt-link>
<!--      <nuxt-link to='/' class='text-decoration-none white&#45;&#45;text'>-->
<!--        KoinTube-->
<!--      </nuxt-link>-->
    </v-app-bar-title>
    <v-spacer />
    <v-btn color='primary' depressed dark link to='/auth/login'>Sign In</v-btn>
    <v-btn color='primary' depressed dark link to='/auth/signup'>Sign Up</v-btn>
  </v-app-bar>

</template>

<script>

export default {
  name: 'AppBarGuess',
}
</script>

<style scoped>

</style>
