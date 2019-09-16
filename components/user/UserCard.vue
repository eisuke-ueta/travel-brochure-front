<template lang="pug">
v-card
  v-card-title
    AvatarButton(:user='user')
    v-layout(align-center justify-end)
      v-layout(v-if='currentUser.id !== user.id'  justify-end @click='handleFollow')
        v-btn.mr-0.primary.primary--text(v-if='!isFollowing' outline flat) フォロー
        v-btn.mr-0.primary(v-if='isFollowing' flat) フォロー中
  v-card-text(v-html='convertToHTML(user.biography)')
  v-card-actions
    v-list-tile.grow
      span.subheading.mr-1 {{ user.followers }}
      span.caption.mr-3 フォロワー
      span.subheading.mr-1 {{ user.follows }}
      span.caption.mr-3 フォロー
</template>

<script>
import { mapActions, mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import AvatarButton from '~/components/AvatarButton'

export default {
  components: {
    AvatarButton
  },
  props: {
    user: { type: Object, default: () => {}, required: true }
  },
  data() {
    return {
      isFollowing: this.user.isFollowing
    }
  },
  computed: {
    ...mapState('auth', {
      currentUser: state => state.currentUser
    })
  },
  methods: {
    convertToHTML(text) {
      if (!text) return ''
      const expLink = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi
      const expLine = /\n/gi
      return text.replace(expLink, "<a target='_blank' href='$1'>$1</a>").replace(expLine, '</br>')
    },
    handleFollow() {
      const user = cloneDeep(this.user)
      this.isFollowing = !this.isFollowing
      this.userFollow({ isFollowing: this.isFollowing, userId: user.id })
    },
    ...mapActions('user', ['userFollow'])
  }
}
</script>
<style scoped>
.link:hover {
  cursor: pointer;
}
</style>
