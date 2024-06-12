// react
import { type ComponentProps, type ReactNode } from 'react'
// chakra

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select
} from '@chakra-ui/react'
// form
import { useController } from 'react-hook-form'

// ----------------------------------------------------------------------

type RHFSelectProps = Pick<
  ComponentProps<typeof FormControl>,
  'isDisabled' | 'isReadOnly' | 'isRequired'
> & {
  name: string
  label?: ReactNode
  placeholder?: string
  helperText?: ReactNode
  //
  options: Array<{
    label: ReactNode
    value: string
  }>
  //
  selectProps?: Omit<ComponentProps<typeof Select>, 'placeholder'>
}

export default function RHFSelect({
  name,
  label,
  placeholder = '',
  helperText,
  //
  options,
  // props override
  selectProps,
  // rest
  ...rest
}: RHFSelectProps): JSX.Element {
  const {
    field,
    fieldState: { error }
  } = useController({ name })

  return (
    <FormControl
      {...rest}
      isInvalid={Boolean(error)}
    >
      <FormLabel>{label}</FormLabel>

      <Select
        placeholder={placeholder}
        {...selectProps}
        {...field}
      >
        <option
          label={placeholder}
          disabled
        />
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
          >
            {o.label}
          </option>
        ))}
      </Select>

      {error ? (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      ) : (
        helperText != null && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
