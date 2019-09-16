<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title メール確認
        v-card-text
          p 確認メールを登録されたメールアドレスに送信しました。メールに記載されているURLをクリックして、ユーザー登録を完了してください。
          nuxt-link(to='/contact') お問い合わせ
</template>

<script>
export default {
  head() {
    return {
      title: 'メール確認'
    }
  },
  middleware: 'notAuthenticated',
  data() {
    return {}
  }
}
</script>
