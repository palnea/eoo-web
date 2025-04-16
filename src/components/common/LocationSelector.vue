<template>
  <v-row>
    <v-col cols="4">
      <v-select
        v-model="selectedCountry"
        :items="countries"
        label="Ülke"
        @update:modelValue="loadCities"
        disabled
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        v-model="selectedCity"
        :items="cities"
        label="Şehir"
        @update:modelValue="loadDistricts"
        v-if="selectedCountry"
        :rules="requiredRule"
      ></v-select>
    </v-col>
  </v-row>
  <v-row style="margin-top: -25px">
    <v-col>
      <v-select
        v-model="selectedDistrict"
        :items="districts"
        label="İlçe"
        v-if="selectedCity"
        :rules="requiredRule"
        @update:modelValue="handleDistrictSelection"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from "@/services/api.service";
import { consoleError } from "@/utils/logger";
import { requiredRule } from "@/utils/formValidationRules";

const props = defineProps(['updateDistrictSelection']);

const selectedCountry = ref(null);
const selectedCity = ref(null);
const selectedDistrict = ref(null);

const countries = ref([]);
const cities = ref([]);
const districts = ref([]);

// Load initial data on component mount
onMounted(() => {
  loadCountries();
});

const loadCountries = async () => {
  try {
    const response = await apiService.fetchCountries()
    countries.value = response.data.response_body.map(country => ({
      title: country.code,
      value: country.id,
    }));

    if (countries.value.length > 0) {
      selectedCountry.value = countries.value[0].value
      await loadCities()
    }
  } catch (err) {
    consoleError('Fetch countries error: ', err)
  }
};

const loadCities = async () => {
  try {
    const response = await apiService.fetchCities(selectedCountry.value)

    // Define the preferred cities
    let citiesData = response.data.response_body
    const preferredCities = ["İSTANBUL", "ANKARA", "İZMİR"];

    // Sort cities alphabetically
    citiesData.sort((a, b) => a.name.localeCompare(b.name));

    // Move preferred cities to the top
    citiesData.sort((a, b) => {
      const aIndex = preferredCities.indexOf(a.name.toLocaleUpperCase('tr-TR'));
      const bIndex = preferredCities.indexOf(b.name.toLocaleUpperCase('tr-TR'));

      // If both cities are preferred or not preferred, use alphabetical order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex || a.name.localeCompare(b.name);
      }

      // If only one of them is preferred, prioritize it
      return aIndex !== -1 ? -1 : bIndex !== -1 ? 1 : a.name.localeCompare(b.name);
    });

    cities.value = citiesData.map(city => ({
      title: city.name,
      value: city.id,
    }));
  } catch (err) {
    consoleError('Fetch cities error: ', err)
  }
};

const loadDistricts = async () => {
  try {
    selectedDistrict.value = null
    const response = await apiService.fetchDistricts(selectedCity.value)

    let districtsData = response.data.response_body
    districtsData.sort((a, b) => a.name.localeCompare(b.name));

    districts.value = districtsData.map(city => ({
      title: city.name,
      value: city.id,
    }));
  } catch (err) {
    consoleError('Fetch districts error: ', err)
  }
};

const handleDistrictSelection = () => {
  props.updateDistrictSelection(selectedDistrict.value);
};
</script>
