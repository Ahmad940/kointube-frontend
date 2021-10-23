<template>
  <div class="pt-10">
    <h3>Channels List</h3>
    <!-- <v-divider /> -->
    <v-row class="pt-10">
      <v-col
        v-for="channel in channels"
        :key="channel.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          elevation="1"
          max-width="300"
          nuxt
          :to="'/channel/' + channel.id"
        >
          <v-img
            height="250"
            src="/channellogo.jpg"
            :alt="channel.title"
          ></v-img>
          <v-card-title>
            <v-avatar size='30' class='mr-2 white--text' :color='randomColor'>
              {{ channel.username.charAt(0).toUpperCase() }}
            </v-avatar>
            <span class='text-h6 font-weight-light'> {{ channel.username }} </span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ChannelIndex',
  async asyncData({ $axios }) {
    const channels = await $axios.$get(`users/channel`)

    return { channels }
  },
  computed: {
    randomColor: () => {
      const colors = ['red', 'brown', 'orange', 'green', 'tomato', 'indigo', 'purple']
      const randIndex = Math.floor(Math.random() * colors.length)
      return colors[randIndex]
    },
  }
}
</script>

<style scoped></style>
