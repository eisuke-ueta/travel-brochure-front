<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title サインアップ
        v-card-text
          v-form(@keyup.native.enter="handleSignUp")
            v-text-field(
              autofocus
              name="ニックネーム"
              label="ニックネーム"
              type="text"
              v-model='form.name'
              v-validate="'required|max:20'"
              :error-messages="errorMessage('ニックネーム')"
            )
            v-text-field(
              name="メールアドレス"
              label="メールアドレス"
              type="text"
              v-model='form.email'
              v-validate="'required|email|max:100'"
              :error-messages="errorMessage('メールアドレス')"
            )
            v-text-field(
              id="password"
              name="パスワード"
              label="パスワード"
              type="password"
              v-model='form.password'
              v-validate="'required|passwordPattern|min:8'"
              :error-messages="errorMessage('パスワード')"
            )
            v-btn(block color="primary" @click='handleSignUp') 登録
  v-snackbar(v-model='snackbar' bottom left)
    | {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import { mapActions } from 'vuex'

export default {
  head() {
    return {
      title: 'サインアップ'
    }
  },
  middleware: 'notAuthenticated',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      snackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    errorMessage(name) {
      return this.errors.first(name) ? [this.errors.first(name)] : []
    },
    async handleSignUp() {
      const valid = await this.$validator.validateAll()
      if (!valid) return

      try {
        const response = await this.signup({ form: this.form })
        if (response && response.status === 200) {
          this.$router.push('/signup/confirm')
        } else {
          this.showSnacber('登録できませんでした')
        }
      } catch (e) {
        if (e.response && e.response.status === 409) {
          this.showSnacber('既に登録されているメールアドレスです')
        } else {
          this.showSnacber('登録できませんでした')
        }
      }
    },
    showSnacber(text) {
      this.snackbar = true
      this.snackbarText = text
    },
    ...mapActions('auth', ['signup'])
  }
}
</script>
