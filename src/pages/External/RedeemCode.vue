<script setup>
import { ref, watch } from "vue";
import AppLogo from "@/components/app/AppLogo.vue";
import { phoneCountryCodes } from "@/constants/countryCodes";
import apiService from "@/services/api.service";
import { filterNullValues, mapClassOptions } from "@/utils/common";
import router from "@/router";
import { consoleError } from "@/utils/logger";
import { emailRules, requiredRule } from "@/utils/formValidationRules";
import BackgroundArt from "@/components/common/BackgroundArt.vue";

const loading = ref(false)
const message = ref("")
const snackbar = ref(false)
const tab = ref()
const classIdRules = ref([])
const isFormValid = ref(false)
const isRefCodeValid = ref(false)
const isRefCodeLinkedToSchool = ref(false) // flag to set school's class dropdown or grade predefined options
const countryCode = ref(phoneCountryCodes[0].value)
const classOptions = ref([]);
const refCodeForm = ref({ reference_code: '' })
const form = ref({
  email: null,
  phone: null,
  class_id: classOptions.value[0]?.value || null,
  reference_code: null
})

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

const redeem = async () => {
  try {
    loading.value = true
    const filteredForm = filterNullValues(form.value)
    if (form.value.phone !== null) {
      form.value.phone = countryCode.value + form.value.phone
      form.value.verify_password = form.value.password
    }

    const response = await apiService.redeemCode(filteredForm)
    console.log("register response: ", response.data.response_body)
    await router.push('success')
  } catch (err) {
    consoleError('Failed to register user: ', err)
    message.value = err.response.data.response_code
    snackbar.value = true
  } finally {
    // revert phone to original value -remove country code prefix
    form.value.phone && (form.value.phone = form.value.phone.substring(countryCode.value.length))
    loading.value = false
  }
}

const uppercase = () => {
  refCodeForm.value.reference_code = refCodeForm.value.reference_code.toUpperCase()
}

watch(tab, () => {
  form.value.email = null
  form.value.phone = null
})


</script>

<template>
  <v-snackbar v-model="snackbar" color="#F5C461" timeout="5000" style="color: blue">{{message}}</v-snackbar>
  <BackgroundArt/>
  <v-container style="width: 90%;max-width: 500px">
    <v-row style="min-width: fit-content; display: flex; flex-direction: column; align-items: center; padding: 16px">
      <AppLogo :width="100"></AppLogo>
      <p class="text-h5 font-weight-medium" style="text-align: center; margin: 5px 0 20px 0; font-family: Montserrat">Kayıtlı Kullanıcı için Kod Kullanma</p>
    </v-row>
    <v-form @submit.prevent="listClasses" v-model="isFormValid">
      <v-text-field v-model="refCodeForm.reference_code" label="Referans Kodu" :rules="requiredRule"
                    :disabled="isRefCodeValid" @keyup="uppercase"/>
      <v-col style="display: flex; justify-content: center" v-if="!isRefCodeValid">
        <v-btn type="submit" color="primary" :disabled="!isFormValid" :loading="loading">Kodu Doğrula</v-btn>
      </v-col>
    </v-form>
    <v-form @submit.prevent="redeem" v-model="isFormValid" v-if="isRefCodeValid">
      <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        align-tabs="center"
        style="margin-bottom: 25px"
      >
        <v-tab :value=1>E-posta</v-tab>
        <v-tab :value=2>Telefon</v-tab>
      </v-tabs>
      <v-text-field v-if="tab === 1" v-model="form.email" label="E-posta" :rules="[requiredRule, emailRules].flat()"></v-text-field>
      <v-row v-if="tab === 2">
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
      <v-select
        v-if="isRefCodeLinkedToSchool"
        v-model="form.class_id"
        :items="classOptions"
        label="Şube"
        item-title="title"
        item-value="value"
        :rules="classIdRules"
      ></v-select>

      <v-col style="display: flex; justify-content: center">
        <v-btn type="submit" color="primary" :disabled="!isFormValid" :loading="loading">Kodu Kullan</v-btn>
      </v-col>
    </v-form>
  </v-container>
</template>

<style scoped>
</style>
