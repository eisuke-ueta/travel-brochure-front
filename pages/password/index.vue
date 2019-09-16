<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title パスワード変更
        v-card-text 入力されたメールアドレスに、パスワード変更画面のURLを送信致します。
        v-card-text
          v-form
            v-text-field(
              autofocus
              name="メールアドレス"
              label="メールアドレス"
              type="text"
              v-model='form.email'
              v-validate="'required|email|max:100'"
              :error-messages="errorMessage('メールアドレス')"
            )
            v-btn(block color="primary" @click='handleSubmit') 送信
        v-divider
        v-card-actions
          v-spacer
          v-layout.pa-2(column align-end)
            nuxt-link(to='/contact') お問い合わせ
  v-snackbar(v-model='snackbar' bottom left) {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import { mapActions } from 'vuex'

export default {
  head() {
    return {
      title: 'パスワード変更'
    }
  },
  middleware: 'notAuthenticated',
  data() {
    return {
      form: {},
      snackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    errorMessage(name) {
      return this.errors.first(name) ? [this.errors.first(name)] : []
    },
    async handleSubmit() {
      const valid = await this.$validator.validateAll()
      if (!valid) return

      try {
        const response = await this.resetPassword({ form: this.form })
        if (response && response.status === 200) {
          this.$router.push('/password/confirm')
        } else if (response && response.status === 404) {
          this.showSnackBar('メールアドレスが登録されていません')
        } else {
          this.showSnackBar('送信できませんでした')
        }
      } catch (e) {
        this.showSnackBar('送信できませんでした')
      }
    },
    showSnackBar(text) {
      this.snackbar = true
      this.snackbarText = text
    },
    ...mapActions('auth', ['resetPassword'])
  }
}
</script>
