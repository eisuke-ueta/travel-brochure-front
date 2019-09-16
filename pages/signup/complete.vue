<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title ユーザー登録完了
        v-card-text
          p {{ message }}
          a(@click='handleLink') {{ link }}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  head() {
    return {
      title: 'ユーザー登録完了'
    }
  },
  async asyncData({ redirect, params, store, query }) {
    let isValid = false
    try {
      const response = await store.dispatch('auth/completeSignup', { token: query.token })
      if (response && response.status === 200) {
        isValid = true
      } else {
        await store.dispatch('auth/deleteAuth')
      }
    } catch (e) {
      await store.dispatch('auth/deleteAuth')
    }
    const message = isValid
      ? 'ユーザー登録が完了しました。以下のリンクをクリックして、早速サービスを利用しましょう！'
      : 'URLの有効期限が切れています。再度ユーザー登録を行なってください。'
    const link = isValid ? 'ホームへ' : 'ユーザー登録へ'
    return {
      message: message,
      link: link,
      isValid: isValid
    }
  },
  methods: {
    async handleLink() {
      if (!this.isValid) this.$router.push('/signup')
      try {
        const response = await this.fetchCurrentUser()
        if (response && response.status === 200) {
          this.$router.push('/home')
        }
      } catch (e) {
        this.deleteAuth()
      }
    },
    ...mapActions('auth', ['fetchCurrentUser', 'deleteAuth'])
  }
}
</script>
