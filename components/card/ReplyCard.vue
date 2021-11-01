<template>
  <div>
    <p class="mb-0">
      {{ reply.content }}
    </p>
    <small
      >by {{ reply.user.username }},
      {{ $dayjs(reply.createdAt).fromNow() }}</small
    >
  </div>
</template>
<script>
export default {
  name: 'Reply',
  props: {
    reply: {
      required: true,
      type: Object,
    },
  },
}
</script>
