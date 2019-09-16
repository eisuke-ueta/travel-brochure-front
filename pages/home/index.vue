<template lang="pug">
v-container(fluid fill-height)
  v-layout(justify-center)
    v-flex(xs12 sm8 md6)
      v-flex.pt-3(x12 v-if='favoriteBrochures.length !== 0')
        v-layout(align-center)
          v-icon.mr-1(color='grey') favorite
          h4.subheading.grey--text.text--darken-2 人気の旅のしおり
        v-flex.my-3(v-for='brochure in favoriteBrochures' :key='brochure.id')
          BrochureCard(:brochure='brochure')
      v-flex.pt-3(x12 v-if='recommendUsers.length !== 0')
        v-layout(align-center)
          v-icon.mr-1(color='grey') person
          h4.subheading.grey--text.text--darken-2 おすすめユーザー
        v-flex.my-3(v-for='user in recommendUsers' :key='user.id')
          UserCard(:user='user')
      v-flex.pt-3(x12 v-if='activeUsers.length !== 0')
        v-layout(align-center)
          v-icon.mr-1(color='grey') trending_up
          h4.subheading.grey--text.text--darken-2 アクティブなユーザー
        v-flex.my-3(v-for='user in activeUsers' :key='user.id')
          UserCard(:user='user')

  AddBrochureButton
</template>

<script>
import { mapState } from 'vuex'
import BrochureCard from '~/components/brochure/BrochureCard'
import UserCard from '~/components/user/UserCard'
import AddBrochureButton from '~/components/AddBrochureButton'

export default {
  head() {
    return {
      title: 'ホーム'
    }
  },
  components: {
    BrochureCard,
    UserCard,
    AddBrochureButton
  },
  middleware: 'authenticated',
  computed: {
    ...mapState('brochure', ['favoriteBrochures', 'starBrochures']),
    ...mapState('user', ['recommendUsers', 'activeUsers'])
  },
  async asyncData({ store }) {
    await Promise.all(
      [store.dispatch('brochure/fetchBrochuresByRanking')],
      [store.dispatch('user/fetchUsersByRanking')]
    )
  }
}
</script>
