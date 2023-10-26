import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    password: 'password',
    username: 'username',
    continue: 'continue'
  }
}

const i18n = createI18n({
  locale: 'en',
  messages
})

export default i18n
