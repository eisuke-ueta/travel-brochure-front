<template lang="pug">
v-container(fluid fill-height)
  v-layout(justify-center)
    v-flex(xs12 sm8 md6)
      BrochureForm(mode='edit' :brochure='brochure')
</template>

<script>
import { mapState } from 'vuex'
import BrochureForm from '~/components/brochure/BrochureForm'

export default {
  head() {
    return {
      title: '編集'
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  middleware: 'authenticated',
  components: {
    BrochureForm
  },
  computed: {
    ...mapState('brochure', ['brochure'])
  },
  async asyncData({ redirect, params, store }) {
    await Promise.all([store.dispatch('brochure/fetchBrochure', { id: params.id })])
      .then(results => {
        results.forEach(response => {
          if (response && response.status !== 200) redirect('/')
        })
      })
      .catch(resluts => redirect('/'))
  }
}
</script>
