<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title ログイン
        v-card-text
          v-form(@keyup.native.enter="handleLogin")
            v-text-field(
              autofocus
              name="メールアドレス"
              label="メールアドレス"
              type="text"
              v-model='user.email'
              v-validate="'required|email|max:100'"
              :error-messages="errorMessage('メールアドレス')"
            )
            v-text-field(
              id="password"
              name="パスワード"
              label="パスワード"
              type="password"
              v-model='user.password'
              v-validate="'required|passwordPattern|min:8'"
              :error-messages="errorMessage('パスワード')"
            )
            v-btn(block color="primary" @click='handleLogin') ログイン
        v-divider
        v-card-actions
          v-spacer
          v-layout.pa-2(column align-end)
            nuxt-link.mb-1(to='/password') パスワードをお忘れの方
            nuxt-link(to='/signup') ユーザー登録へ
  v-snackbar(v-model='snackbar' bottom left) {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import { mapActions } from 'vuex'

export default {
  head() {
    return {
      title: 'ログイン'
    }
  },
  middleware: 'notAuthenticated',
  data() {
    return {
      user: {},
      snackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    errorMessage(name) {
      return this.errors.first(name) ? [this.errors.first(name)] : []
    },
    async handleLogin() {
      const valid = await this.$validator.validateAll()
      if (!valid) return

      try {
        await this.login({ user: this.user })
        const response = await this.fetchCurrentUser()
        if (response && response.status === 200) {
          this.$router.push('/home')
        } else {
          this.deleteAuth()
          this.showSnackBar('ログインできませんでした')
        }
      } catch (e) {
        this.deleteAuth()
        this.showSnackBar('ログインできませんでした')
      }
    },
    showSnackBar(text) {
      this.snackbar = true
      this.snackbarText = text
    },
    ...mapActions('auth', ['login', 'fetchCurrentUser', 'deleteAuth'])
  }
}
</script>
