<template>
  <div>
    <p>History Log</p>
    <LikedVideoLists :videos='videos' />
  </div>
</template>

<script>
import LikedVideoLists from '../../components/LikedVideosList'
export default {
  name: 'HistoryPage',
  components: { LikedVideoLists },
  async asyncData({ $axios, error, $auth }) {
    try {
      const videos = await $axios.$get(`/history/${$auth.user.id}`)
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
