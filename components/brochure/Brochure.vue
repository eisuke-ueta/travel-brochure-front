<template lang="pug">
v-card(v-if='brochure')
  v-card(flat)
    v-card-actions
      v-list-tile.grow
        v-layout(align-center class='link' @click="$router.push('/user/' + brochure.user.id)")
          v-list-tile-avatar
            v-img.white.elevation-1(:src='getImageUrl')
          v-list-tile-content
            v-list-tile-title
              span {{ brochure.user.name }}
        v-layout(align-center justify-end)
          v-tooltip(top v-if='!isDraft')
            template(v-slot:activator="{on}")
              v-icon(class='link' @click='handleLinkCopy' v-on="on") link
            span リンクをコピー
          v-menu(v-if='isMyBrochure' offset-y left)
            template(v-slot:activator='{ on }')
              v-icon.ml-3(class='link' v-on='on') more_vert
            v-list
              v-list-tile(@click='handleEdit')
                v-list-tile-title 編集
              v-list-tile(@click='')
                v-dialog(v-model='deleteDialog' max-width='600')
                  template(v-slot:activator='{ on }')
                    v-list-tile-title(v-on='on') 削除
                  v-card
                    v-toolbar.white--text(flat color="primary")
                      v-toolbar-title 削除
                    v-card-text 本当に旅のしおりを削除しますか？一度削除すると復元できません。
                    v-divider
                    v-card-actions
                      v-spacer
                      v-btn(flat @click='closeModal') キャンセル
                      v-btn.primary--text(flat @click='handleDelete') 削除
    v-card-text
      v-container(fill-height)
        v-layout(justify-center column)
          h2.word-wrap.mb-3 {{ brochure.title }}
          span.word-wrap {{ brochure.overview }}
    v-card-actions
      v-list-tile.grow
        v-layout(align-center justify-end)
          SocialButtonGroup(v-if='!isDraft' :brochure='brochure')
          v-dialog(v-if='isMyBrochure && !isDraft' v-model='shareDialog' max-width='600')
            template(v-slot:activator='{ on }')
              v-icon.ml-3(class='link' v-on='on') share
            v-card
              v-toolbar.white--text(flat color='primary')
                v-toolbar-title 共有
              v-card-text あなたの旅のしおりを他のユーザーに共有できます。（共有リンクを知っているユーザーのみ閲覧できます。）
                v-form
                  v-switch(color='primary' v-model='isShared' :label="isShared ? '共有する' : '共有しない'" @change='changeShareState')
                  v-tooltip(top)
                    template(v-slot:activator="{on}")
                      v-btn.primary.primary--text(v-if='isShared' outline block flat @click='handleShareCopy' v-on='on')
                        | 共有リンクをコピー
                    span 共有リンクをコピー
              v-divider
              v-card-actions
                v-spacer
                v-btn(flat @click='shareDialog = false') 閉じる
          v-chip(v-if='isDraft' small) 下書き
  v-card-text
    v-timeline(align-top dense)
      v-layout(column v-for='(day, dayIndex) in brochure.days' :key='dayIndex')
        v-timeline-item(:color="getEventTypeColor('')" small)
          v-layout.pt-3
            v-flex(xs4)
              p {{ $moment(day.date).format('YYYY年M月D日') }}
            v-flex(xs8)
              p.body-2 {{ dayIndex + 1 }}日目
        v-layout(column v-for='event in day.events' :key='event.id')
          v-timeline-item(
            :color='getEventTypeColor(event.type)'
            :icon='event.type'
            :fill-dot='event.type ? true : false' 
            :small='!event.type ? true : false'
          )
            v-layout.wrap.pt-3
              v-flex(xs4)
                p.word-wrap {{ event.time }}
              v-flex(xs8)
                p.body-2.word-wrap(v-html='convertToHTML(event.title)')
                p.word-wrap(v-html='convertToHTML(event.overview)')
  v-card-text(v-if='brochure.memo')
    v-container(fill-height)
        v-layout(column)
          div.title.mb-3 旅のメモ
          span.word-wrap(v-html='convertToHTML(brochure.memo)')
  v-snackbar(v-model='snackbar' bottom left)
    | {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import { mapActions, mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import { getColor } from '../../store/constants'
import SocialButtonGroup from '~/components/social/SocialButtonGroup'

export default {
  components: {
    SocialButtonGroup
  },
  props: {
    brochure: { type: Object, default: () => {}, required: true }
  },
  data() {
    return {
      isShared: this.brochure.isShared,
      shareDialog: false,
      deleteDialog: false,
      snackbar: false,
      snackbarText: ''
    }
  },
  computed: {
    getImageUrl() {
      return this.brochure.user.avatar ? this.brochure.user.avatar : '/avatar/default.png'
    },
    isMyBrochure() {
      return this.currentUser.id === this.brochure.user.id
    },
    isDraft() {
      return this.brochure.status === 'draft'
    },
    ...mapState('auth', {
      currentUser: state => state.currentUser
    })
  },
  methods: {
    convertToHTML(text) {
      const expLink = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi
      const expLine = /\n/gi
      return text.replace(expLink, "<a target='_blank' href='$1'>$1</a>").replace(expLine, '</br>')
    },
    getEventTypeColor(type) {
      return getColor(this.brochure.theme, type)
    },
    changeShareState() {
      const brochure = cloneDeep(this.brochure)
      brochure.isShared = this.isShared
      this.updateBrochure({ form: brochure })
    },
    handleShareCopy(e) {
      // See this https://github.com/vuetifyjs/vuetify/issues/6892
      const el = document.createElement('textarea')
      el.addEventListener('focusin', e => e.stopPropagation())
      el.value = window.location.origin + '/share/' + this.brochure.shareId
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
    handleLinkCopy() {
      this.$copyText(window.location.origin + '/brochure/' + this.brochure.id)
    },
    handleEdit() {
      this.$router.push('/brochure/' + this.brochure.id + '/edit')
    },
    closeModal() {
      this.deleteDialog = false
      this.shareDialog = false
    },
    async handleDelete() {
      const response = await this.deleteBrochure()
      if (response.status === 200) {
        this.deleteDialog = false
        this.$router.push('/home')
      } else {
        this.showSnacber('削除できませんでした')
      }
    },
    showSnacber(text) {
      this.snackbar = true
      this.snackbarText = text
    },
    ...mapActions('brochure', ['deleteBrochure', 'updateBrochure', 'updateBrochureStar'])
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
.word-wrap {
  word-wrap: break-word;
}
</style>
