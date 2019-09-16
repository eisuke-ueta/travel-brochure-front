<template lang="pug">
v-text-field(
    solo
    label='キーワードを入力してください'
    prepend-inner-icon='search'
    v-model='keyword'
    @keyup.enter='updateKeyword'
  )
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    async updateKeyword() {
      // Init brochures
      await this.initBrochures()
      await this.updateBrochureCondition({ keyword: this.keyword })
      await this.fetchBrochures()

      // Enable load more
      await this.updateBrochureCondition({ loadMore: true })
    },
    ...mapActions('brochure', ['initBrochures', 'updateBrochureCondition', 'fetchBrochures'])
  }
}
</script>
