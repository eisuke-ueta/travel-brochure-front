<template lang="pug">
v-form.white.pa-3
  v-container
    v-layout.mb-3(column)
      h5.headline.mb-3 パスワード
      v-text-field(
        id="password"
        name="新しいパスワード"
        label="新しいパスワード"
        type="password"
        v-model='form.password'
        v-validate="'required|passwordPattern|min:8'"
        :error-messages="errorMessage('新しいパスワード')"
      )
      v-text-field(
        id="confirmPassword"
        name="新しいパスワード（確認）"
        label="新しいパスワード（確認）"
        type="password"
        v-model='form.confirmPassword'
        v-validate="'required|passwordPattern|min:8'"
        :error-messages="errorMessage('新しいパスワード（確認）')"
      )

    p.red--text {{ feedback }}
    v-layout.my-3
      v-btn.primary(block flat @click='handleSubmit') 更新

  v-snackbar(v-model='snackbar' bottom left)
    | {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    user: { type: Object, default: () => {}, required: true }
  },
  data() {
    return {
      form: {},
      snackbar: false,
      snackbarText: '',
      feedback: ''
    }
  },
  methods: {
    errorMessage(name) {
      return this.errors.first(name) ? [this.errors.first(name)] : []
    },
    async handleSubmit() {
      const valid = await this.$validator.validateAll()
      if (!valid) return

      if (this.form.password !== this.form.confirmPassword) {
        this.feedback = 'パスワードが一致しません'
        return
      }
      this.feedback = ''

      try {
        const response = await this.changePassword({ form: this.form })
        if (response && response.status === 200) {
          this.form = {}
          this.showSnackBar('更新しました')
        } else {
          this.showSnackBar('更新できませんでした')
        }
      } catch (e) {
        this.showSnackBar('更新できませんでした')
      }
    },
    showSnackBar(text) {
      this.snackbar = true
      this.snackbarText = text
    },
    ...mapActions('user', ['changePassword'])
  }
}
</script>
