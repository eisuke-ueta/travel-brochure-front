<template lang="pug">
v-form.white.pa-3
  v-container
    v-layout.mb-3(column)
      h5.headline アカウント
    v-layout.my-3
      v-dialog(v-model='shareDialog' max-width='600')
        template(v-slot:activator='{ on }')
          v-btn(block flat outline v-on='on') アカウント削除
        v-card
          v-toolbar.white--text(flat color='primary')
            v-toolbar-title アカウント削除
          v-card-text 本当にアカウントを削除しますか？一度アカウントを削除するとデータは復元できません。
          v-divider
          v-card-actions
            v-spacer
            v-btn(flat small @click='shareDialog = false') キャンセル
            v-btn.primary--text(flat small @click='handleDelete') 削除
  v-snackbar(v-model='snackbar' bottom left)
    | {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      shareDialog: false,
      snackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    async handleDelete() {
      try {
        const response = await this.deleteUser()
        if (response && response.status === 200) {
          await this.logout()
          this.$router.push('/')
        } else {
          this.shareDialog = false
          this.showSnackBar('削除できませんでした')
        }
      } catch (e) {
        this.shareDialog = false
        this.showSnackBar('削除できませんでした')
      }
    },
    showSnackBar(text) {
      this.snackbar = true
      this.snackbarText = text
    },
    ...mapActions('user', ['deleteUser']),
    ...mapActions('auth', ['logout'])
  }
}
</script>
