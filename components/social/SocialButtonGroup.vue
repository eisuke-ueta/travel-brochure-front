<template lang="pug">
v-layout(align-center justify-end)
  div(class='link' @click='handleFavorite').mr-3
    v-tooltip(top v-if='isFavorited')
      template(v-slot:activator="{on}")
        v-icon.mr-1(color='pink' v-on="on") favorite
      span 「スキ」を取り消す
    v-tooltip(top v-if='!isFavorited')
      template(v-slot:activator="{on}")
        v-icon.mr-1(color='grey' v-on="on") favorite_border
      span スキ
    span.subheading.grey--text.text--darken-2 {{ favorites }}
  div(class='link' @click='handleStar')
    v-tooltip(top v-if='isStared')
      template(v-slot:activator="{on}")
        v-icon.mr-1(color='amber' v-on="on") star
      span 「お気に入り」を取り消す
    v-tooltip(top v-if='!isStared')
      template(v-slot:activator="{on}")
        v-icon.mr-1(color='grey' v-on="on") star_border
      span お気に入り
    span.subheading.grey--text.text--darken-2 {{ stars }}
</template>

<script>
import { mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    brochure: { type: Object, default: () => {}, required: true }
  },
  data() {
    return {
      favorites: this.brochure.favorites,
      isFavorited: this.brochure.isFavorited,
      stars: this.brochure.stars,
      isStared: this.brochure.isStared
    }
  },
  methods: {
    handleFavorite() {
      const brochure = cloneDeep(this.brochure)
      this.isFavorited = !this.isFavorited
      this.favorites = this.isFavorited ? this.favorites + 1 : this.favorites - 1
      this.updateBrochureFavorite({ brochure: brochure, isFavorited: this.isFavorited })
    },
    handleStar() {
      const brochure = cloneDeep(this.brochure)
      this.isStared = !this.isStared
      this.stars = this.isStared ? this.stars + 1 : this.stars - 1
      this.updateBrochureStar({ brochure: brochure, isStared: this.isStared })
    },
    ...mapActions('brochure', ['updateBrochureShare', 'updateBrochureFavorite', 'updateBrochureStar'])
  }
}
</script>
<style scoped>
.link {
  display: flex;
  align-items: center;
}
.link:hover {
  cursor: pointer;
}
</style>
