<template lang="pug">
v-form.white.pa-3
  v-container
    v-layout.mb-3(column)
      h5.headline.mb-3 メールアドレス
      v-text-field(
        name="現在のメールアドレス"
        label="現在のメールアドレス"
        type="text"
        v-model='form.email'
        readonly
        v-validate="'required|email|max:100'"
        :error-messages="errorMessage('現在のメールアドレス')"
      )
      v-text-field(
        name="新しいメールアドレス"
        label="新しいメールアドレス"
        type="text"
        v-model='form.newEmail'
        v-validate="'required|email|max:100'"
        :error-messages="errorMessage('新しいメールアドレス')"
      )

    p 新しいメールアドレスに送信された確認URLをクリックするまで、メールアドレスは変更されません。

    v-layout.my-3
      v-btn.primary(block flat @click='handleSubmit') 送信

  v-snackbar(v-model='snackbar' bottom left)
    | {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import { mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    user: { type: Object, default: () => {}, required: true }
  },
  data() {
    return {
      form: cloneDeep(this.user),
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

      const form = {
        newEmail: this.form.newEmail
      }
      try {
        const response = await this.changeEmail({ form: form })
        if (response && response.status === 200) {
          this.form.newEmail = null
          this.showSnackBar('送信しました')
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
    ...mapActions('user', ['changeEmail'])
  }
}
</script>
