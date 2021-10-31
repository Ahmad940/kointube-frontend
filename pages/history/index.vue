<template>
  <div>
    <p>History Log</p>
    <HistoryVideoLists :videos='videos' />
  </div>
</template>

<script>
import HistoryVideoLists from '../../components/HistoryVideosList'
export default {
  name: 'HistoryPage',
  components: { HistoryVideoLists },
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
