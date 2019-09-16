<template lang="pug">
v-layout.grow(align-center class='link' @click="$router.push('/user/' + user.id)")
  v-list-tile-avatar
    v-img.white.elevation-1(:src='getImageUrl')
  v-list-tile-content
    v-list-tile-title.body-1 {{ user.name }}
</template>

<script>
export default {
  props: {
    user: { type: Object, default: () => {}, required: true }
  },
  computed: {
    getImageUrl() {
      return this.user.avatar ? this.user.avatar : '/avatar/default.png'
    }
  }
}
</script>
<style scoped>
.link:hover {
  cursor: pointer;
}
</style>
