export const requiredRule = [
  value => {
    if (value !== null && value !== '') {
      return true
    }

    return 'Bu alan gereklidir.'
  }
]

export const emailRules = [
  value => {
    if (value) return true

    return 'E-posta gereklidir.'
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true

    return 'Lütfen geçerli bir e-posta adresi giriniz.'
  },
]
