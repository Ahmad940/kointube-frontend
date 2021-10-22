<template>
  <div>
    <v-row>
      <v-col v-for="video in videos" :key="video.id" cols="12" sm="6" md="4">
        <v-card elevation="1" max-width="300" nuxt :href="video.videoUrl">
          <v-img
            height="250"
            :src="video.thumbnailUrl"
            :alt="video.title"
          ></v-img>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>
          </v-card-text>
          <v-card-title>{{ video.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  async asyncData({ params, $axios }) {
    const videos = await $axios.$get(`video/channel/${params.id}`)

    return { videos }
  },
}
</script>
