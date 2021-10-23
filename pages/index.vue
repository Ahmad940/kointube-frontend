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
    async asyncData({ $axios }) {
      const videos = await $axios.$get(`/video`)

      return { videos }
    },
    head: {
      title: 'Home'
    },
  }
</script>
