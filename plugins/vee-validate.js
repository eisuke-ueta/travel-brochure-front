import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'

Validator.extend('passwordPattern', password => {
  const regex = /^[0-9a-zA-Z!"#$%&+@?]+$/
  return regex.test(password)
})

Vue.use(VeeValidate)
Validator.localize('ja', ja)
