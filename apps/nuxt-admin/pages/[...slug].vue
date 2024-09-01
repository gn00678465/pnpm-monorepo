<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'NotFound',
  keepalive: false,
})

const event = useRequestEvent()

if (event) {
  // Set the status code to 404 for a custom 404 page
  setResponseStatus(event, 404)

  // Set the status message as well
  setResponseStatus(event, 404, 'Page Not Found')
}
</script>

<template>
  <div>
    404
  </div>
</template>

<style scoped></style>
