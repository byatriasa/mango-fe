// next
import Head from 'next/head'
// @chakra
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  VStack
} from '@chakra-ui/react'
import { handleSubmitError, type InferFormValueType } from '~/utils/form'
import { register } from '~/validators/applicant.validator'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFForm, RHFInput } from '~/components/hook-form'
import applicantService from '~/services/applicant'

type FormValue = InferFormValueType<typeof register>

export default function Home(): JSX.Element {
  // RHF stuffs
  const methods = useForm<FormValue>({
    defaultValues: {
      name: '',
      identity_number: '',
      email: '',
      dob: ''
    } as unknown as FormValue,

    resolver: zodResolver(register),
    mode: 'onBlur'
  })

  const {
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
    handleSubmit
  } = methods

  const handleRegister: SubmitHandler<FormValue> = async (values) => {
    try {
      await applicantService.postRegister(values)
    } catch (err) {
      let appliedErrorMessages = handleSubmitError(err)

      if (!appliedErrorMessages)
        appliedErrorMessages =
          'Terjadi kesalahan saat mengirim data, silahkan coba lagi nanti.'

      setError('afterSubmit', {
        message: appliedErrorMessages
      })
    }
  }

  return (
    <>
      <Head>
        <title>Mango - Technical Test</title>
      </Head>

      <main>
        <Container
          maxW='2xl'
          centerContent
          padding={6}
        >
          <Box width='100%'>
            <RHFForm<FormValue>
              methods={methods}
              onSubmit={handleSubmit(handleRegister)}
            >
              <VStack
                spacing={4}
                justifyContent='stretch'
                width='100%'
              >
                <RHFInput
                  name='name'
                  label='Name'
                />
                <RHFInput
                  name='identity_number'
                  label='Identity Number'
                />
                <RHFInput
                  name='email'
                  label='Email'
                />
                <RHFInput
                  name='dob'
                  label='Date of Birth'
                  inputProps={{
                    type: 'date'
                  }}
                />
                <Button
                  type='submit'
                  colorScheme='primary'
                  size='lg'
                  // isDisabled={isSubmitSuccessful}
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>

                {errors?.afterSubmit && (
                  <Alert
                    status='error'
                    width='100%'
                  >
                    <AlertIcon />
                    {errors.afterSubmit.message}
                  </Alert>
                )}

                {isSubmitSuccessful && (
                  <Alert
                    status='success'
                    width='100%'
                  >
                    <AlertIcon />
                    Application has been registered successfully.
                  </Alert>
                )}
              </VStack>
            </RHFForm>
          </Box>
        </Container>
      </main>
    </>
  )
}
