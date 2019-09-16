<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title パスワード変更完了
        v-card-text
          p パスワードを更新しました。新しいパスワードでログインしてください。
          nuxt-link(to='/login') ログイン
</template>

<script>
export default {
  head() {
    return {
      title: 'パスワード変更完了'
    }
  }
}
</script>
