<template lang="pug">
v-container(fluid fill-height)
  v-layout(justify-center)
    v-flex(xs12 sm8 md6)
      v-flex.pt-3(x12)
        SearchBox
      v-flex(x12)
        v-flex.my-3(v-for='brochure in brochures' :key='brochure.id')
          BrochureCard(:brochure='brochure')
      v-flex.text-xs-center(x12)
        v-progress-circular(v-if='loading' indeterminate color="primary")
        p.pt-3(v-if='!loadMore') データが見つかりませんでした

  AddBrochureButton
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BrochureCard from '~/components/brochure/BrochureCard'
import SearchBox from '~/components/SearchBox'
import AddBrochureButton from '~/components/AddBrochureButton'

export default {
  head() {
    return {
      title: '探す'
    }
  },
  components: {
    SearchBox,
    BrochureCard,
    AddBrochureButton
  },
  middleware: 'authenticated',
  computed: {
    ...mapState('brochure', {
      loadMore: state => state.condition.loadMore
    }),
    ...mapState('brochure', ['brochures'])
  },
  async asyncData({ store }) {
    await store.dispatch('brochure/initBrochures')
    await store.dispatch('brochure/updateBrochureCondition', { loadMore: true })
    await store.dispatch('brochure/fetchBrochures')
    return {
      loading: false
    }
  },
  mounted() {
    this.scroll()
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (!bottomOfWindow || this.loading || !this.loadMore) return

        this.loading = true
        setTimeout(async () => {
          await this.updateBrochureCondition({ offset: this.brochures.length })
          const response = await this.fetchBrochures()
          if (response.status === 200 && response.data.brochures.length === 0) {
            await this.updateBrochureCondition({ loadMore: false })
          }
          this.loading = false
        }, 200)
      }
    },
    ...mapActions('brochure', ['updateBrochureCondition', 'fetchBrochures'])
  }
}
</script>
