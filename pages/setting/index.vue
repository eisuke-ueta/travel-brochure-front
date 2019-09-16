<template lang="pug">
v-container(fluid fill-height)
  v-layout(justify-center)
    v-flex(xs12 sm8 md6)
      v-tabs(v-model='tab' slider-color='primary')
        v-tab プロフィール
        v-tab メールアドレス
        v-tab パスワード
        v-tab アカウント
      v-tabs-items(v-model='tab')
        v-tab-item
          UserForm(:user='currentUser')
        v-tab-item
          EmailForm(:user='currentUser')
        v-tab-item
          PasswordForm(:user='currentUser')
        v-tab-item
          AccountForm
</template>

<script>
import { mapState } from 'vuex'
import UserForm from '~/components/user/UserForm'
import EmailForm from '~/components/user/EmailForm'
import PasswordForm from '~/components/user/PasswordForm'
import AccountForm from '~/components/user/AccountForm'

export default {
  head() {
    return {
      title: 'アカウント設定'
    }
  },
  middleware: 'authenticated',
  components: {
    UserForm,
    EmailForm,
    PasswordForm,
    AccountForm
  },
  data() {
    return {
      tab: null
    }
  },
  computed: {
    ...mapState('auth', ['currentUser'])
  },
  async asyncData({ store }) {
    await Promise.all([store.dispatch('auth/fetchCurrentUser')])
  },
  methods: {
    handleTabChange() {}
  }
}
</script>
