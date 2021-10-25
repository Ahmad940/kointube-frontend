<template>
  <v-img
    :src="image"
    :lazy-src="`/minilogo.png`"
    aspect-ratio="1"
    class="grey lighten-2"
  >
    <template #placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: 'KImage',
  props: {
    image: {
      required: true,
      type: String,
    },
  },
}
</script>

<style scoped></style>
