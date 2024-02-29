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
    if (value == null || value === '') return true
    if (/.+@.+\..+/.test(value)) return true

    return 'Lütfen geçerli bir e-posta adresi giriniz.'
  },
]

export const eitherFieldRule = (field1, field2, fieldName1 = "e-posta", fieldName2 = "telefon") => {
  const isField1Filled = !!field1;
  const isField2Filled = !!field2;

  if (!(isField1Filled || isField2Filled)) {
    return `Lütfen ${fieldName1} ve ${fieldName2} girin.`;
  }

  return true;
};
