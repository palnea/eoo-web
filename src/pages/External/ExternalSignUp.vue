<script setup>
import { ref, watchEffect } from 'vue';
import AppLogo from "@/components/app/AppLogo.vue";
import apiService from "@/services/api.service";
import { consoleError } from "@/utils/logger";
import { gradeOptions } from "@/constants/grades";
import { emailRules, requiredRule } from "@/utils/formValidationRules";
import { filterNullValues, mapClassOptions, } from "@/utils/common";
import router from "@/router";
import { phoneCountryCodes } from "@/constants/countryCodes";
import BackgroundArt from "@/components/common/BackgroundArt.vue";

const message = ref("")
const snackbar = ref(false)
const countryCode = ref(phoneCountryCodes[0].value)
const classOptions = ref([]);
const refCodeForm = ref({ reference_code: '' })
const form = ref({
  fullname: null,
  parent_fullname: null,
  email: null,
  phone: null,
  password: null,
  verify_password: null,
  school_id: null,
  class_id: classOptions.value[0]?.value || null,
  grade: null,
  school_name: null,
  reference_code: null
})
const isFormValid = ref(false)
const isRefCodeValid = ref(false)
const isRefCodeLinkedToSchool = ref(false) // flag to set school's class dropdown or grade predefined options
const classIdRules = ref([])
const schoolNameRules = ref([])
const gradeRules = ref([])
const loading = ref(false)
const showPsw = ref(false)

const register = async () => {
  try {
    loading.value = true
    form.value.phone = countryCode.value + form.value.phone
    form.value.verify_password = form.value.password
    const response = await apiService.register(filterNullValues(form.value))
    console.log("register response: ", response.data.response_body)
    await router.push('success')
  } catch (err) {
    consoleError('Failed to register user: ', err)
    const responseCode = err.response.data.response_code
    if (responseCode === 'ERR_DUPLICATE_KEY_ERROR') {
      message.value = 'Bu e-posta ya da telefon ile daha önceden oluşturulmuş bir hesap mevcut.'
    } else {
      message.value = err.response.data.response_code
    }
    snackbar.value = true
  } finally {
    // revert phone to original value
    form.value.phone = form.value.phone.substring(countryCode.value.length);
    loading.value = false
  }
}

const listClasses = async () => {
  try {
    loading.value = true
    const refCode = refCodeForm.value.reference_code
    const response = await apiService.fetchClassesByRefCode(refCode)
    classOptions.value = mapClassOptions(response.data.response_body)
    isRefCodeValid.value = true
    console.log("classOptions.value: ", classOptions.value)
    if (classOptions.value.length > 0) isRefCodeLinkedToSchool.value = true;
    form.value.reference_code = refCode
  } catch (err) {
    consoleError('Fetch class by ref code error: ', err)
    message.value = "Lütfen geçerli bir kod girin."
    snackbar.value = true
  } finally {
    loading.value = false
  }
}

const togglePasswordVisibility = () => {
  showPsw.value = !showPsw.value;
}

const
  uppercase = () => {
    refCodeForm.value.reference_code = refCodeForm.value.reference_code.toUpperCase()
  }

watchEffect(() => {
  classIdRules.value = isRefCodeLinkedToSchool.value ? requiredRule : []
  schoolNameRules.value = !isRefCodeLinkedToSchool.value ? requiredRule : []
  gradeRules.value = !isRefCodeLinkedToSchool.value ? requiredRule : []
})

</script>

<template>
  <v-snackbar v-model="snackbar" color="#F5C461" timeout="5000" style="color: blue">{{ message }}</v-snackbar>
  <BackgroundArt/>
  <v-container style="width: 500px;">
    <v-row style="min-width: fit-content; display: flex; flex-direction: column; align-items: center; padding: 16px">
      <AppLogo :width="100"></AppLogo>
      <p class="text-h5 font-weight-medium" style="text-align: center; margin: 5px 0 20px 0; font-family: Montserrat;">
        Yeni Kullanıcı Kayıt Ekranı</p>
    </v-row>

    <v-form @submit.prevent="listClasses" v-model="isFormValid">
      <v-text-field v-model="refCodeForm.reference_code" label="Referans Kodu" :rules="requiredRule"
                    :disabled="isRefCodeValid" @keyup="uppercase"/>
      <v-col style="display: flex; justify-content: center" v-if="!isRefCodeValid">
        <v-btn type="submit" color="primary" :disabled="!isFormValid" :loading="loading">Kodu Doğrula</v-btn>
      </v-col>
    </v-form>
    <v-form @submit.prevent="register" v-model="isFormValid" v-if="isRefCodeValid">
      <v-text-field v-model="form.fullname" label="Öğrenci Adı" :rules="requiredRule"></v-text-field>
      <v-text-field v-model="form.parent_fullname" label="Aile Adı Soyadı" :rules="requiredRule"></v-text-field>
      <v-text-field v-model="form.email" label="E-posta" :rules="emailRules"></v-text-field>
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="countryCode"
            :items="phoneCountryCodes"
            label="Kod"
            outlined
            solo
          ></v-select>
        </v-col>
        <v-col cols="9">
          <v-text-field v-model="form.phone" label="Telefon" :rules="requiredRule"></v-text-field>
        </v-col>
      </v-row>
      <v-text-field v-model="form.password" label="Şifre" :type="showPsw ? 'text' : 'password'" :rules="requiredRule"
                    :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="togglePasswordVisibility"></v-text-field>
      <v-select
        v-if="isRefCodeLinkedToSchool"
        v-model="form.class_id"
        :items="classOptions"
        label="Şube"
        item-title="title"
        item-value="value"
        :rules="classIdRules"
      ></v-select>

      <v-text-field v-if="!isRefCodeLinkedToSchool" v-model="form.school_name" label="Okul Adı"
                    :rules="schoolNameRules"></v-text-field>
      <v-select
        v-if="!isRefCodeLinkedToSchool"
        v-model="form.grade"
        :items="gradeOptions"
        label="Sınıf"
        item-title="title"
        item-value="value"
        :rules="gradeRules"
      ></v-select>

      <v-col style="display: flex; justify-content: center">
        <v-btn type="submit" color="primary" :disabled="!isFormValid" :loading="loading">Kaydol</v-btn>
      </v-col>
    </v-form>
  </v-container>
</template>

<style scoped>
</style>
