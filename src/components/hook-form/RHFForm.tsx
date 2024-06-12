// react
import { type ComponentProps, type HTMLAttributes, type ReactNode } from 'react'
// form
import { type FieldValues, FormProvider } from 'react-hook-form'

// --------------------------------------------------------------------------------------------

export type RHFFormProps<T extends FieldValues> = {
  methods: Omit<ComponentProps<typeof FormProvider<T>>, 'children'>
  onSubmit: HTMLAttributes<HTMLFormElement>['onSubmit']
  children: ReactNode
}

export default function RHFForm<T extends FieldValues>({
  onSubmit,
  children,
  methods
}: RHFFormProps<T>): JSX.Element {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  )
}
