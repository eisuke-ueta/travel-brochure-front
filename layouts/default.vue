<template lang="pug">
v-app
  v-toolbar(color="primary" dark app)
    v-toolbar-title
      nuxt-link.white--text(to='/') タビシヨ
    v-toolbar-items.ml-3
      v-btn(v-if='currentUser' flat to='/home/explore') 探す
    v-spacer
    v-toolbar-items
      v-btn(v-if='!currentUser' flat to='/signup') サインアップ
      v-btn(v-if='!currentUser' flat to='/login') ログイン
      v-menu(offset-y v-if='currentUser')
        template(v-slot:activator='{ on }')
          v-btn(flat v-on='on')
            v-avatar(size='40')
              img.white(:src='getImageUrl' width='40')
        v-list
          v-list-tile(:to="'/user/' + currentUser.id")
            v-list-tile-title マイページ
          v-list-tile(to='/setting')
            v-list-tile-title アカウント設定
          v-list-tile(@click='handleLogout')
            v-list-tile-title ログアウト
  v-content
    nuxt
  v-divider
  v-footer.pa-4(height='auto' color="#fafafa")
    v-layout(align-center)
      v-flex.xs4
        | &copy;2019 - JINBAY
      v-flex(xs8 text-xs-right)
        v-btn(small flat round to='/terms') 利用規約
        v-btn(small flat round to='/privacy') プライバシーポリシー
        v-btn(small flat round to='/contact') お問い合わせ
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      title: 'タビシヨ'
    }
  },
  computed: {
    getImageUrl() {
      return this.currentUser.avatar ? this.currentUser.avatar : '/avatar/default.png'
    },
    ...mapState('auth', {
      currentUser: state => state.currentUser
    })
  },
  methods: {
    async handleLogout() {
      await this.logout()
      this.$router.push('/')
    },
    ...mapActions('auth', ['logout'])
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
