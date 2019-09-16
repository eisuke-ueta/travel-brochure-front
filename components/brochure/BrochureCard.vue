<template lang="pug">
v-card
  v-card-title(align-center)
    h3
      nuxt-link(:to="'/brochure/' + brochure.id") {{ brochure.title }}
  v-card-text {{ brochure.overview }}
  v-card-actions
    v-list-tile.grow
      AvatarButton(:user='brochure.user')
      SocialButtonGroup(v-if='!isDraft' :brochure='brochure')
      v-chip(v-if='isDraft' small) 下書き

  v-snackbar(v-model='snackbar' bottom left)
    | {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import { mapActions } from 'vuex'
import SocialButtonGroup from '~/components/social/SocialButtonGroup'
import AvatarButton from '~/components/AvatarButton'

export default {
  components: {
    SocialButtonGroup,
    AvatarButton
  },
  props: {
    brochure: { type: Object, default: () => {}, required: true }
  },
  data() {
    return {
      snackbar: false,
      snackbarText: ''
    }
  },
  computed: {
    isDraft() {
      return this.brochure.status === 'draft'
    }
  },
  methods: {
    ...mapActions('brochure', ['updateBrochureShare', 'updateBrochureStar'])
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
