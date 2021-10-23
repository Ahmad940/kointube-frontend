<template>
  <div class="pt-10 px-4">
    <h2>Channels List</h2>
    <!-- <v-divider /> -->
    <v-row class="pt-10">
      <v-col
        v-for="channel in channels"
        :key="channel.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card elevation="1" nuxt width="100%" :to="'/channels/' + channel.id">
          <v-img height="250" src="/channellogo.jpg" :alt="channel.title">
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title>
            <v-avatar size="30" class="mr-2 white--text" :color="randomColor">
              {{ channel.username.charAt(0).toUpperCase() }}
            </v-avatar>
            <span class="text-h6 font-weight-light">
              {{ channel.username | startCase }}
            </span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import filterMixin from '~/mixins/filter-mixin'

export default {
  name: 'ChannelIndex',
  mixins: [filterMixin],
  async asyncData({ $axios }) {
    const channels = await $axios.$get(`users/channel`)

    return { channels }
  },
  computed: {
    randomColor: () => {
      const colors = [
        'red',
        'brown',
        'orange',
        'green',
        'tomato',
        'indigo',
        'purple',
      ]
      const randIndex = Math.floor(Math.random() * colors.length)
      return colors[randIndex]
    },
  },
}
</script>

<style scoped></style>
