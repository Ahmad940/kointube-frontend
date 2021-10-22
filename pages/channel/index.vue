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
            src=" https://via.placeholder.com/468x60?text=Channel+Poster"
            :alt="channel.title"
          ></v-img>
          <v-card-title>{{ channel.username }}</v-card-title>
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
}
</script>

<style scoped></style>
