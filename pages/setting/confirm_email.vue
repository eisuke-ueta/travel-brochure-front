<template lang="pug">
v-container(fluid fill-height)
  v-layout(align-center justify-center)
    v-flex(xm12 sm8 md4)
      v-card
        v-toolbar.white--text(flat color="primary")
          v-toolbar-title.title メールアドレス変更完了
        v-card-text
          p {{ message }}
</template>

<script>
export default {
  head() {
    return {
      title: 'メールアドレス変更完了'
    }
  },
  async asyncData({ redirect, params, store, query }) {
    let message = 'いつもご利用頂きありがとうございます。メールアドレス変更が完了しました。'
    try {
      const form = { token: query.token }
      const response = await store.dispatch('user/confirmEmail', { form: form })
      if (!response || response.status !== 200) {
        message = 'URLの有効期限が切れています。再度メールアドレスの変更を行なってください。'
      }
    } catch (e) {
      if (e.response.status === 409) {
        message = '既に利用されているメールアドレスです。再度メールアドレスの変更を行なってください。'
      } else {
        message = 'URLの有効期限が切れています。再度メールアドレスの変更を行なってください。'
      }
    }
    return {
      message: message
    }
  }
}
</script>
