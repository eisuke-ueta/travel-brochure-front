<template lang="pug">
v-container(fluid fill-height)
  v-layout(justify-center)
    v-flex(xs12 sm8 md6)
      BrochureForm(mode='new')
</template>

<script>
import BrochureForm from '~/components/brochure/BrochureForm'

export default {
  head() {
    return {
      title: '新規'
    }
  },
  middleware: 'authenticated',
  components: {
    BrochureForm
  }
}
</script>
