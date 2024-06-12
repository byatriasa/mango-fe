import z from 'zod'

export type Register = z.infer<typeof register>
export const register = z.object({
  name: z.string().min(1, 'Name must not be empty'),
  identity_number: z
    .string()
    .length(16, 'Identity number must be a number and 16 characters long')
    .regex(/^\d+$/, 'Identity number must be a number and 16 characters long'),
  email: z.string().email('Invalid email address'),
  dob: z.string().date('Invalid date of birth')
})
