// service utils
import { servicePost, type ServiceFnResponse } from './_factory'

// validator types

import { type Register } from '~/validators/applicant.validator'

// ----------------------------------------------

const postRegister = (
  payload: Register
): ServiceFnResponse<Record<string, string | number | null>> =>
  servicePost('/v1/applicant', payload)

const applicantService = {
  postRegister
}

export default applicantService
