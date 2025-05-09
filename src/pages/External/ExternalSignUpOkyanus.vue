<script setup>
import { ref, watchEffect } from 'vue';
import AppLogo from "@/components/app/AppLogo.vue";
import apiService from "@/services/api.service";
import { consoleError } from "@/utils/logger";
import { gradeOptions } from "@/constants/grades";
import { emailRules, phoneRules, requiredRule } from "@/utils/formValidationRules";
import { filterNullValues, mapClassOptions, } from "@/utils/common";
import router from "@/router";
import { phoneCountryCodes } from "@/constants/countryCodes";
import BackgroundArt from "@/components/common/BackgroundArt.vue";
import LocationSelector from "@/components/common/LocationSelector.vue";
import Help from "@/components/common/Help.vue";
import OkyanusLogo from "@/components/app/OkyanusLogo.vue";

const queryRefCode = ref(router.currentRoute.value.query.code || '')
const queryRefCodeShorter = ref(router.currentRoute.value.query.c || '')
const message = ref("")
const snackbar = ref(false)
const countryCode = ref(phoneCountryCodes[0].value)
const phoneNumber = ref(null)
const classOptions = ref([]);
const refCodeForm = ref({ reference_code: queryRefCode.value || queryRefCodeShorter.value })
const form = ref({
  fullname: null,
  parent_fullname: null,
  email: null,
  get phone() {
    if (!phoneNumber.value) return null
    return countryCode.value + phoneNumber.value;
  },
  password: null,
  verify_password: null,
  school_id: null,
  class_id: classOptions.value[0]?.value || null,
  grade: null,
  school_name: null,
  reference_code: null,
  kvkkAccepted: false
})
const isFormValid = ref(false)
const isRefCodeValid = ref(false)
const isRefCodeLinkedToSchool = ref(false) // flag to verify ref code and show school name
const schoolHasClasses = ref(false) // flag to set school's class dropdown or grade predefined options
const loading = ref(false)
const showPsw = ref(false)

const kvkkRules = [
  value => !!value || 'Gizlilik politikasını kabul etmeniz gerekmektedir.'
]

const verifyRefCode = async () => {
  try {
    loading.value = true
    const refCode = refCodeForm.value.reference_code
    const response = await apiService.verifyRefCode(refCode)
    isRefCodeValid.value = response.data.response_body.valid
    if (!isRefCodeValid.value) throw new Error()
    form.value.reference_code = refCode
    await getSchoolInfo()
    await getClasses()
  } catch (err) {
    consoleError('Failed to verify ref code: ', err)
    message.value = "Geçersiz kod. Lütfen geçerli bir kod girin."
    snackbar.value = true
  } finally {
    loading.value = false
  }
}

const register = async () => {
  try {
    loading.value = true
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
    loading.value = false
  }
}

const getSchoolInfo = async () => {
  try {
    loading.value = true
    const refCode = refCodeForm.value.reference_code
    const response = await apiService.fetchSchoolInfoByRefCode(refCode)
    form.value.school_name = response.data.response_body.name
    isRefCodeLinkedToSchool.value = true
  } catch (err) {
    consoleError('Fetch school by ref code error: ', err)
  } finally {
    loading.value = false
  }
}


const getClasses = async () => {
  try {
    loading.value = true
    const refCode = refCodeForm.value.reference_code
    const response = await apiService.fetchClassesByRefCode(refCode)
    classOptions.value = mapClassOptions(response.data.response_body)
    if (classOptions.value.length > 0) schoolHasClasses.value = true;
  } catch (err) {
    consoleError('Fetch class by ref code error: ', err)
  } finally {
    loading.value = false
  }
}

const togglePasswordVisibility = () => {
  showPsw.value = !showPsw.value;
}

const uppercase = () => {
  refCodeForm.value.reference_code = refCodeForm.value.reference_code.toLocaleUpperCase('tr-TR')
}

const updateDistrictSelection = (value) => {
  form.value.district_id = value
};


// programmatically enable or disable rules based on School Ref Codes, and School Classes
const classIdRules = ref([])
const schoolNameRules = ref([])
const gradeRules = ref([])
const districtRules = ref([])

watchEffect(() => {
  classIdRules.value = schoolHasClasses.value ? requiredRule : []
  schoolNameRules.value = !schoolHasClasses.value ? requiredRule : []
  gradeRules.value = !schoolHasClasses.value ? requiredRule : []
  districtRules.value = !isRefCodeLinkedToSchool.value ? requiredRule : []
})

watchEffect(() => {
  refCodeForm.value.reference_code = queryRefCode.value?.toLocaleUpperCase('tr-TR')
  if (queryRefCode.value) {
    verifyRefCode()
  }
})

watchEffect(() => {
  refCodeForm.value.reference_code = queryRefCodeShorter.value?.toLocaleUpperCase('tr-TR')
  if (queryRefCodeShorter.value) {
    verifyRefCode()
  }
})

</script>

<template>
  <v-snackbar v-model="snackbar" color="#F5C461" timeout="5000" style="color: blue">{{ message }}</v-snackbar>
  <BackgroundArt/>
  <v-icon @click="router.push('/')" class="ml-8 mt-10 position-absolute" color="#454545" size="35">mdi-arrow-left
  </v-icon>
  <v-container style="width: 95%; max-width: 450px">
    <v-row style="min-width: fit-content; display: flex; flex-direction: column; align-items: center; padding: 16px">
      <div class="flex-row-center-custom">
        <AppLogo :width="150"></AppLogo>
        <span class="ml-3" style="color: gray; font-size: 20px"></span>
        <OkyanusLogo :width="165"></OkyanusLogo>
      </div>

      <p class="text-h5 font-weight-medium" style="text-align: center; margin: 5px 0 20px 0; font-family: Montserrat;">
        Yeni Kullanıcı Kayıt Ekranı</p>
    </v-row>

    <v-form @submit.prevent="verifyRefCode" v-model="isFormValid">
      <v-text-field v-model="refCodeForm.reference_code" label="Referans Kodu" :rules="requiredRule"
                    :disabled="isRefCodeValid" @keyup="uppercase"/>
      <v-col style="display: flex; justify-content: center" v-if="!isRefCodeValid">
        <v-btn type="submit" color="#147BAE" :disabled="!isFormValid" :loading="loading">Kodu Doğrula</v-btn>
      </v-col>
    </v-form>
    <v-form @submit.prevent="register" v-model="isFormValid" v-if="isRefCodeValid">
      <v-text-field v-model="form.fullname" label="Öğrenci Adı" :rules="requiredRule"></v-text-field>
      <v-text-field v-model="form.parent_fullname" label="Veli Adı Soyadı" :rules="requiredRule"></v-text-field>
      <v-text-field v-model="form.email" label="E-posta"
                    :rules="[requiredRule, emailRules].flat()"></v-text-field>
      <v-row>
        <v-col>
          <v-select
            v-model="countryCode"
            :items="phoneCountryCodes"
            label="Kod"

          ></v-select>
        </v-col>
        <v-col cols="8">
          <v-text-field v-model="phoneNumber" label="Telefon"
                        :rules="phoneRules(countryCode)" type="number" hide-spin-buttons></v-text-field>
        </v-col>
      </v-row>
      <v-text-field v-model="form.password" label="Şifre" :type="showPsw ? 'text' : 'password'" :rules="requiredRule"
                    :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="togglePasswordVisibility"></v-text-field>
      <v-select
        v-if="schoolHasClasses"
        v-model="form.class_id"
        :items="classOptions"
        label="Şube"
        item-title="title"
        item-value="value"
        :rules="classIdRules"
      ></v-select>

      <v-text-field v-model="form.school_name" label="Okul Adı"
                    :rules="schoolNameRules" :disabled="isRefCodeLinkedToSchool"></v-text-field>
      <v-select
        v-if="!schoolHasClasses"
        v-model="form.grade"
        :items="gradeOptions"
        label="Sınıf"
        item-title="title"
        item-value="value"
        :rules="gradeRules"
      ></v-select>
      <LocationSelector v-if="!isRefCodeLinkedToSchool" :updateDistrictSelection="updateDistrictSelection"
                        :rules="districtRules"></LocationSelector>

      <v-checkbox
        v-model="form.kvkkAccepted"
        :rules="kvkkRules"
        color="#147BAE"
        required
      >
        <template v-slot:label>
          <div>
            <span>Kişisel verilerin korunması hakkındaki </span>
            <a href="https://funlygames.com/gizlilik-politikamiz" target="_blank" class="text-decoration-underline">gizlilik politikasını</a>
            <span> okudum ve kabul ediyorum.</span>
          </div>
        </template>
      </v-checkbox>

      <v-col style="display: flex; justify-content: center">
        <v-btn type="submit" color="#147BAE" :disabled="!isFormValid" :loading="loading">Kaydol</v-btn>
      </v-col>
    </v-form>
    <Help/>
  </v-container>
</template>

<style scoped>
.v-field__input {
  padding-inline: 2px !important;
}
.flex-row-center-custom {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .flex-row-center-custom {
    flex-direction: column; /* Stack items vertically on small screens */
    text-align: center;     /* Center text horizontally */
  }

  .flex-row-center-custom span {
    margin-left: 0; /* Remove left margin for smaller screens */
  }
}

</style>
