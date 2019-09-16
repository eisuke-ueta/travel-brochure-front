<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title お問い合わせ
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
            v-text-field(
              name="タイトル"
              label="タイトル"
              type="text"
              v-model='form.title'
              v-validate="'required|max:100'"
              :error-messages="errorMessage('タイトル')"
            )
            v-textarea(
              name='内容'
              label='内容'
              clearable
              multi-line
              rows=8
              v-model='form.detail'
              v-validate="'required|max:1000'"
              :error-messages="errorMessage('内容')"
            )
            v-btn(block color="primary" @click='handleSubmit') 送信
  v-snackbar(v-model='snackbar' bottom left)
    | {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
export default {
  head() {
    return {
      title: 'お問い合わせ'
    }
  },
  data() {
    return {
      form: {
        email: '',
        title: '',
        detail: ''
      },
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
        const response = await this.$axios.post('contact/', { form: this.form })
        if (response && response.status === 200) {
          this.$router.push('/contact/complete')
        } else {
          this.snackbar = true
          this.snackbarText = '送信できませんでした'
        }
      } catch (e) {
        this.snackbar = true
        this.snackbarText = '送信できませんでした'
      }
    }
  }
}
</script>
