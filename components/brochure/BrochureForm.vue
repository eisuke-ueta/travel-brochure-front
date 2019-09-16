<template lang="pug">
v-form.white.pa-3
  v-container
    v-layout.mb-3(column)
      h4.display-1 旅のしおり
      v-text-field(
        v-model='form.title'
        label='タイトル'
        name='タイトル'
        type='text'
        autofocus
        v-validate="'required|max:40'"
        :error-messages="errorMessage('タイトル')"
      )
      v-textarea(
        v-model.trim='form.overview'
        label='概要'
        name='概要'
        multi-line
        clearable
        placeholder='あなたの旅の概要を書きましょう（400文字以内）'
        rows=4
        auto-grow
        v-validate="'required|max:400'"
        :error-messages="errorMessage('概要')"
      )
      v-select(
        v-model='form.theme'
        :items='themes'
        label='テーマ'
        name='テーマ'
        item-text='text'
        item-value='value'
        v-validate="'required'"
        :error-messages="errorMessage('テーマ')"
      )
      v-switch(
        color='primary'
        v-model='form.isPublic' 
        :label="form.isPublic ? '公開する' : '公開しない'"
      )

    v-layout.mb-3(v-for='(day, dayIndex) in form.days' :key='dayIndex' column)
      v-layout(row)
        h5.headline {{ dayIndex + 1 }}日目
        v-layout(v-if='dayIndex !== 0' justify-end)
          v-btn.mr-0.mt-0(outline small @click='removeDay(dayIndex)') 削除
      v-menu(
        v-model='day.dateModal' 
        :close-on-content-click='false' 
        offset-y min-width='0'
      )
        template(v-slot:activator='{ on }')
          v-text-field(
            v-model='day.date' 
            label='日付'
            name='day_date'
            type='date'
            readonly
            append-icon='date_range'
            v-on='on'
          )
        v-date-picker(
          v-validate="'required'"
          name='day_date_picker'
          v-model='day.date' 
          no-title 
          @input='day.dateModal = false'
        )

      v-layout(v-for='(event, eventIndex) in day.events' :key='eventIndex' column)
        v-card.pa-4.mb-3
          v-layout(row)
            h6.title イベント
            v-layout(v-if='eventIndex !== 0' justify-end)
              v-btn.mr-0.mt-0(outline small @click='removeEvent(dayIndex, eventIndex)') 削除
          v-select(
            :items='eventTypes'
            item-text='text'
            item-value='value'
            label='タイプ'
            v-model='event.type'
          )

          v-menu(
            v-model='event.timeModal' 
            :close-on-content-click='false' 
            offset-y 
            min-width='0'
          )
            template(v-slot:activator='{ on }')
              v-text-field(
                v-model='event.time'
                label='時間'
                :name="eventIndex + '_時間'"
                readonly append-icon="access_time"
                v-on='on'
                v-validate="'required'"
                :error-messages="errorMessage(eventIndex + '_時間')"
              )
            v-time-picker(v-if='event.timeModal' v-model='event.time' @click:minute='event.timeModal = false')
          
          v-text-field(
              v-model='event.title'
              label='タイトル'
              :name="eventIndex + '_イベントタイトル'"
              type='text'
              v-validate="'required|max:20'"
              :error-messages="errorMessage(eventIndex + '_イベントタイトル')"
            )

          v-textarea(
            v-model='event.overview'
            label='詳細'
            :name="eventIndex + '_イベント詳細'"
            placeholder='イベントの詳細を書きましょう（200文字以内）'
            clearable
            multi-line
            rows=4
            v-validate="'max:200'"
            :error-messages="errorMessage(eventIndex + '_イベント詳細')"
          )
      v-layout(justify-end)
        v-btn.primary.primary--text.mr-0(outline flat @click='addEvent(dayIndex)') イベントを追加

      v-divider.my-3

    v-layout.mb-3
      v-btn.primary.primary--text(block outline flat @click='addDay') 日程を追加

    v-layout.mb-3
      v-textarea(
          v-model='form.memo'
          label='メモ'
          name='メモ'
          placeholder='旅のメモを書きましょう（1000文字以内）'
          clearable
          multi-line
          rows=8
          auto-grow
          v-validate="'max:1000'"
          :error-messages="errorMessage('メモ')"
        )

    p.red--text {{ feedback }}
    v-layout.my-3
      v-btn(block flat outline @click="handleSubmit('draft')") 下書き保存
    v-layout.my-3
      v-btn.primary(block flat @click="handleSubmit('published')") {{ mode === 'new' ? '作成' : '更新' }}
</template>

<script>
import { mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import { BASE_EVENT, BASE_DAY, BASE_BROCHURE, EVENT_TYPES, THEMES } from '../../store/constants'

export default {
  props: {
    brochure: { type: Object, default: () => {}, required: false },
    mode: { type: String, required: true } // new || edit
  },
  data() {
    const form = this.mode === 'new' ? cloneDeep(BASE_BROCHURE) : cloneDeep(this.brochure)
    return {
      form: form,
      eventTypes: EVENT_TYPES,
      themes: THEMES,
      feedback: ''
    }
  },
  methods: {
    errorMessage(name) {
      const exp = /^[0-9]*_/
      return this.errors.first(name) ? [this.errors.first(name).replace(exp, '')] : []
    },
    addEvent(dayIndex) {
      this.form.days.forEach((day, index) => {
        if (index === dayIndex) {
          day.events.push(cloneDeep(BASE_EVENT))
        }
      })
    },
    removeEvent(dayIndex, eventIndex) {
      this.form.days.forEach((day, index) => {
        if (index === dayIndex) {
          day.events.splice(eventIndex, 1)
        }
      })
    },
    addDay() {
      this.form.days.push(cloneDeep(BASE_DAY))
    },
    removeDay(dayIndex) {
      this.form.days.splice(dayIndex, 1)
    },
    async handleSubmit(type) {
      const valid = await this.$validator.validateAll()
      if (!valid) {
        this.feedback = '入力項目にエラーがあります。'
        return
      }
      this.feedback = ''
      this.form.status = type
      this.form.isPublic = type !== 'draft'

      try {
        const response = await this.updateBrochure({ form: this.form })
        if (response && response.status === 200) {
          this.$router.push('/brochure/' + response.data.id)
        } else {
          this.feedback = '保存できませんでした。'
        }
      } catch (e) {
        this.feedback = '保存できませんでした。'
      }
    },
    ...mapActions('brochure', ['updateBrochure'])
  }
}
</script>
