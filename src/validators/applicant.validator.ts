import z from 'zod'

export type Register = z.infer<typeof register>
export const register = z.object({
  name: z.string(),
  identity_number: z.string().length(16).regex(/^\d+$/),
  email: z.string().email(),
  dob: z.string().date()
})
