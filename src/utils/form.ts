import { AxiosError } from 'axios'
import { type ZodSchema, type z } from 'zod'

/**
 * 1. Derive the values type from the zod schema
 * 2. Add `afterSubmit` property to the type for form global error message
 */
export type InferFormValueType<T extends ZodSchema> = z.infer<T> & {
  afterSubmit?: string
}

export function handleSubmitError(err: any): string | null {
  if (err instanceof AxiosError) {
    return err.response?.data?.message
  }

  return null
}
