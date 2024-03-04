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
}

export default new ApiService()
