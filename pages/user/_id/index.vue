<template lang="pug">
v-container(fluid fill-height)
  v-layout(justify-center)
    v-flex(xs12 sm8 md6)
      v-flex.mt-3(x12)
        UserCard(:user='user')
        v-tabs.elevation-1(v-model='tab' slider-color='primary')
          v-tab(@change="handleTabChange('brochure')") 旅のしおり
          v-tab(@change="handleTabChange('star')") お気に入り
          v-tab(@change="handleTabChange('follows')") フォロー
          v-tab(@change="handleTabChange('followers')") フォロワー
        v-tabs-items(v-model='tab')
          v-tab-item
            v-layout.my-3(v-for='brochure in brochures' :key='brochure.id')
              v-flex
                BrochureCard(:brochure='brochure')
          v-tab-item
            v-layout.my-3(v-for='brochure in brochures' :key='brochure.id')
              v-flex
                BrochureCard(:brochure='brochure')
          v-tab-item
            v-layout.my-3(v-for='targetUser in users' :key='targetUser.id')
              v-flex
                UserCard(:user='targetUser')
          v-tab-item
            v-layout.my-3(v-for='targetUser in users' :key='targetUser.id')
              v-flex
                UserCard(:user='targetUser')
          v-flex.text-xs-center(x12)
            v-progress-circular(v-if='loading' indeterminate color="primary")
            p.pt-3(v-if='!loadMore') データが見つかりませんでした
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserCard from '~/components/user/UserCard'
import BrochureCard from '~/components/brochure/BrochureCard'

export default {
  head() {
    return {
      title: this.user.name
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  middleware: 'authenticated',
  components: {
    UserCard,
    BrochureCard
  },
  data() {
    return {
      tab: null,
      tabType: 'brochure',
      loading: false,
      loadMore: true
    }
  },
  computed: {
    isBrochure() {
      return this.tabType === 'brochure' || this.tabType === 'star'
    },
    ...mapState('user', ['user', 'users']),
    ...mapState('brochure', ['brochures'])
  },
  async asyncData({ redirect, params, store }) {
    await Promise.all([
      store.dispatch('brochure/initBrochures'),
      store.dispatch('user/initUsers'),
      store.dispatch('user/fetchUser', { id: params.id })
    ])
      .then(results => {
        results.forEach(response => {
          if (response && response.status !== 200) redirect('/')
        })
      })
      .catch(resluts => redirect('/'))

    // Init brochures
    await store.dispatch('brochure/updateBrochureCondition', { loadMore: true, userId: params.id })
    await store.dispatch('brochure/fetchBrochures')
  },
  mounted() {
    this.scroll()
  },
  methods: {
    isBrochureType() {
      return this.tabType === 'brochure' || this.tabType === 'star'
    },
    async handleTabChange(type) {
      this.tabType = type
      const onlyStar = this.tabType === 'star'
      const isFollows = this.tabType === 'follows'

      await this.initBrochures()
      await this.initUsers()

      this.loadMore = true

      switch (this.tabType) {
        case 'brochure':
          await this.updateBrochureCondition({ loadMore: true, userId: this.user.id })
          await this.fetchBrochures()
          break
        case 'star':
          await this.updateBrochureCondition({ onlyStar: onlyStar, loadMore: this.loadMore })
          await this.fetchBrochures()
          break
        case 'follows':
        case 'followers':
          await this.updateUserCondition({ isFollows: isFollows, loadMore: this.loadMore })
          await this.fetchUsers({ id: this.user.id })
          break
        default:
          break
      }
    },
    async fetchMoreData() {
      switch (this.tabType) {
        case 'brochure':
          await this.updateBrochureCondition({ offset: this.brochures.length })
          return this.fetchBrochures()
        case 'star':
          await this.updateBrochureCondition({ offset: this.brochures.length })
          return this.fetchBrochures()
        case 'follows':
        case 'followers':
          await this.updateUserCondition({ offset: this.users.length })
          return this.fetchUsers({ id: this.user.id })
        default:
          return {}
      }
    },
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (!bottomOfWindow || this.loading || !this.loadMore) return

        this.loading = true
        setTimeout(async () => {
          const response = await this.fetchMoreData()
          if (response.status === 200 && this.isBrochureType()) {
            this.loadMore = response.data.brochures.length !== 0
            await this.updateBrochureCondition({ loadMore: this.loadMore })
          }
          if (response.status === 200 && !this.isBrochureType()) {
            this.loadMore = response.data.users.length !== 0
            await this.updateUserCondition({ loadMore: this.loadMore })
          }
          this.loading = false
        }, 200)
      }
    },
    ...mapActions('brochure', ['initBrochures', 'updateBrochureCondition', 'fetchBrochures']),
    ...mapActions('user', ['initUsers', 'fetchUsers', 'updateUserCondition'])
  }
}
</script>
