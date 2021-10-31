<template>
  <div>
    <p>Liked Videos</p>
    <LikedVideoLists :videos='videos' />
  </div>
</template>

<script>
import LikedVideoLists from '../../components/LikedVideosList'
export default {
  name: 'LikedPage',
  components: { LikedVideoLists },
  async asyncData({ $axios, error }) {
    try {
      const videos = await $axios.$get(`/video/liked_videos`)
      return { videos }
    } catch (err) {
      return error({
        message: err.message
      })
    }
  },
}
</script>

<style scoped>

</style>
