<template>
  <div>
    <HomeCardsLists :videos='videos' />
  </div>
</template>

<script>
  import HomeCardsLists from '../components/HomeCardsLists'
  export default {
    name: 'Home',
    components: { HomeCardsLists },
    async asyncData({ $axios, error }) {
      try {
        const videos = await $axios.$get(`/video`)
        return { videos }
      } catch (err) {
        return error({
          message: err.message
        })
      }
    },
    head: {
      title: 'Home'
    },
  }
</script>
