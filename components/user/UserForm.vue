<template lang="pug">
v-form.white.pa-3
  v-container
    v-layout.mb-3(column)
      h5.headline プロフィール
      v-layout.my-3(align-center)
        croppa(
          v-model='croppa'
          disable-click-to-choose
          :accept="'image/png,image/jpeg,image/jpg'"
          :show-loading="true"
          :file-size-limit="2097152"
          :width="80"
          :height="80"
          :prevent-white-space="true"
          :show-remove-button="false"
          @new-image-drawn="handleCroppaNewImageDrawn"
          @file-size-exceed="handleCroppaFileSizeExceed"
          @file-type-mismatch="handleCroppaFileTypeMismatch"
        )
          img.white(
            crossorigin='anonymous'
            :src='getImageUrl'
            class="avatar"
            slot="initial"
            width="100%"
          )
        v-btn.ml-3(small @click="croppa.chooseFile()") アップロード
      p.caption.red--text(v-if='avatarMessage') {{ avatarMessage }}
      v-text-field(
        v-model='form.name'
        label='ニックネーム'
        name='ニックネーム'
        type='text'
        autofocus
        v-validate="'required|max:20'"
        :error-messages="errorMessage('ニックネーム')"
      )
      v-textarea(
        v-model.trim='form.biography'
        clearable
        multi-line
        placeholder='あなたの自己紹介を書きましょう（140文字以内）'
        label='自己紹介'
        name='自己紹介'
        rows=4
        auto-grow
        v-validate="'max:140'"
        :error-messages="errorMessage('自己紹介')"
      )

    p.red--text {{ feedback }}
    v-layout.my-3
      v-btn.primary(block flat @click='handleSubmit') 保存

  v-snackbar(v-model='snackbar' bottom left)
    | {{ snackbarText }}
    v-icon.white--text(small @click='snackbar = false') close
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import Croppa from 'vue-croppa'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(Croppa)

export default {
  components: {
    cropper: Croppa
  },
  props: {
    user: { type: Object, default: () => {}, required: true }
  },
  data() {
    return {
      form: cloneDeep(this.user),
      croppa: {},
      croppaImage: {},
      avatarMessage: '',
      snackbar: false,
      snackbarText: '',
      feedback: ''
    }
  },
  computed: {
    getImageUrl() {
      return this.form.avatar ? this.form.avatar : '/avatar/default.png'
    }
  },
  methods: {
    errorMessage(name) {
      return this.errors.first(name) ? [this.errors.first(name)] : []
    },
    async handleCroppaNewImageDrawn() {
      await this.setCroppedImage()
      this.avatarMessage = ''
    },
    handleCroppaFileSizeExceed() {
      this.avatarMessage = 'ファイルサイズが超えています。2MB以内でアップロードしてください。'
    },
    handleCroppaFileTypeMismatch() {
      this.avatarMessage = 'ファイルタイプがサポートされていません。JPEG、JPG、PNGでアップロードしてください。'
    },
    async setCroppedImage() {
      await this.croppa.generateBlob(
        blob => {
          this.form.avatarImage = blob
        },
        'image/png',
        0.8
      )
    },
    async handleSubmit() {
      const valid = await this.$validator.validateAll()
      if (!valid) {
        this.feedback = '入力項目にエラーがあります。'
        return
      }
      this.feedback = ''

      const form = {
        id: this.form.id,
        name: this.form.name,
        avatar: this.form.avatar,
        avatarImage: this.form.avatarImage,
        biography: this.form.biography
      }
      try {
        const response = await this.updateProfile({ form })
        if (response && response.status === 200) {
          await this.fetchCurrentUser()
          this.snackbar = true
          this.snackbarText = '保存しました'
        } else {
          this.snackbar = true
          this.snackbarText = '保存できませんでした'
        }
      } catch (e) {
        this.snackbar = true
        this.snackbarText = '保存できませんでした'
      }
    },
    ...mapActions('user', ['updateProfile']),
    ...mapActions('auth', ['fetchCurrentUser'])
  }
}
</script>
<style>
canvas {
  border-radius: 50%;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
}
canvas:hover {
  cursor: pointer;
}
</style>
