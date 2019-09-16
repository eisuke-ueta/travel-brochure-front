<template lang="pug">
v-container(fluid fill-height)
  v-layout(justify-center)
    v-flex(xs12 sm8 md6)
      Brochure(:brochure='brochure')
</template>

<script>
import { mapState } from 'vuex'
import Brochure from '~/components/brochure/Brochure'

export default {
  head() {
    return {
      title: this.brochure.title
    }
  },
  validate({ params }) {
    return /[a-f0-9]/.test(params.id)
  },
  components: {
    Brochure
  },
  computed: {
    ...mapState('brochure', ['brochure'])
  },
  async asyncData({ redirect, params, store }) {
    await Promise.all([store.dispatch('brochure/fetchBrochureByShareId', { shareId: params.id })])
      .then(results => {
        results.forEach(response => {
          if (response && response.status !== 200) redirect('/')
        })
      })
      .catch(resluts => redirect('/'))
  }
}
</script>
