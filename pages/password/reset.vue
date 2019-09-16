<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title パスワード変更
        v-card-text
          v-form
            v-text-field(
              id="password"
              name="新しいパスワード"
              label="新しいパスワード"
              type="password"
              v-model='password'
              v-validate="'required|passwordPattern|min:8'"
              :error-messages="errorMessage('新しいパスワード')"
            )
            v-text-field(
              id="confirmPassword"
              name="新しいパスワード（確認）"
              label="新しいパスワード（確認）"
              type="password"
              v-model='confirmPassword'
              v-validate="'required|passwordPattern|min:8'"
              :error-messages="errorMessage('新しいパスワード（確認）')"
            )
            p.red--text(v-if='feedback') {{ feedback }}
            v-btn(block color="primary" @click='handleSubmit') 更新
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
      password: '',
      confirmPassword: '',
      feedback: '',
      snackbar: false,
      snackbarText: ''
    }
  },
  asyncData({ redirect, query }) {
    if (!query.token) redirect('/')
    return {
      token: query.token
    }
  },
  methods: {
    errorMessage(name) {
      return this.errors.first(name) ? [this.errors.first(name)] : []
    },
    async handleSubmit() {
      const valid = await this.$validator.validateAll()
      if (!valid) return

      if (this.password !== this.confirmPassword) {
        this.feedback = 'パスワードが一致しません'
        return
      }
      this.feedback = ''

      try {
        const form = {
          password: this.password,
          token: this.token
        }
        const response = await this.changePassword({ form: form })
        if (response && response.status === 200) {
          this.$router.push('/password/complete')
        } else if (response && response.status === 404) {
          this.showSnackBar('URLの有効期限がきれています')
        } else {
          this.showSnackBar('更新できませんでした')
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          this.showSnackBar('URLの有効期限がきれています')
        } else {
          this.showSnackBar('更新できませんでした')
        }
      }
    },
    showSnackBar(text) {
      this.snackbar = true
      this.snackbarText = text
    },
    ...mapActions('auth', ['changePassword'])
  }
}
</script>
