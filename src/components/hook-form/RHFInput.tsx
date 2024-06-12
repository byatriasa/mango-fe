// react
import { type ComponentProps, type ReactNode } from 'react'
// chakra
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup
} from '@chakra-ui/react'
// form
import { useController } from 'react-hook-form'

// ----------------------------------------------------------------------

type RHFInputProps = Pick<
  ComponentProps<typeof FormControl>,
  'isDisabled' | 'isReadOnly' | 'isRequired'
> & {
  name: string
  label?: ReactNode
  placeholder?: string
  helperText?: ReactNode
  //
  inputLeftAddon?: ReactNode
  inputLeftElement?: ReactNode
  inputRightAddon?: ReactNode
  inputRightElement?: ReactNode
  //
  inputProps?: Omit<ComponentProps<typeof Input>, 'placeholder'>
  inputGroupProps?: ComponentProps<typeof InputGroup>
}

export default function RHFInput({
  name,
  label,
  placeholder,
  helperText,
  // input elements
  inputLeftAddon,
  inputLeftElement,
  inputRightAddon,
  inputRightElement,
  // props override
  inputProps,
  inputGroupProps,
  // rest
  ...rest
}: RHFInputProps): JSX.Element {
  if (Boolean(inputLeftAddon) && Boolean(inputLeftElement)) {
    throw new Error(
      'Cannot use both inputLeftAddon and inputLeftElement at the same time'
    )
  }

  if (Boolean(inputRightAddon) && Boolean(inputRightElement)) {
    throw new Error(
      'Cannot use both inputRightAddon and inputRightElement at the same time'
    )
  }

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

      <InputGroup {...inputGroupProps}>
        {inputLeftAddon}
        {inputLeftElement}

        <Input
          placeholder={placeholder}
          {...inputProps}
          {...field}
        />

        {inputRightAddon}
        {inputRightElement}
      </InputGroup>

      {error ? (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      ) : (
        helperText != null && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
