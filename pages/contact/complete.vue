<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title お問い合わせ完了
        v-card-text
          p お問い合わせありがとうございます。メッセージの送信を完了しました。担当者からの連絡をお待ちください。
          nuxt-link(to='/') ホーム
</template>

<script>
export default {
  head() {
    return {
      title: 'お問い合わせ完了'
    }
  }
}
</script>
