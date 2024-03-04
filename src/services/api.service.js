import BaseService from '@/services/base.service'

class ApiService extends BaseService {
  constructor() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    super(baseUrl)
  }

  register(payload) {
    return this._axiosInstance.post('auth/register', payload)
  }
  redeemCode(payload) {
    return this._axiosInstance.post('/user/get-reference-trials/', payload)
  }

  fetchSchoolInfoByRefCode(refCode) {
    return this._axiosInstance.get(`/user/school/by-reference-code/?reference_code=${refCode}`)
  }

  fetchClassesByRefCode(refCode) {
    return this._axiosInstance.get(`/user/class/?reference_code=${refCode}`)
  }

  fetchCountries(){
    return this._axiosInstance.get(`/user/country/`)
  }

  fetchCities(cityId){
    return this._axiosInstance.get(`/user/city/?country_id=${cityId}`)
  }

  fetchDistricts(cityId){
    return this._axiosInstance.get(`/user/district/?city_id=${cityId}`)
  }
}

export default new ApiService()
