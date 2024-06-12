// next
import Head from 'next/head'
// @chakra
import { Button, HStack, Heading, useColorMode } from '@chakra-ui/react'

export default function Home(): JSX.Element {
  const { toggleColorMode } = useColorMode()

  return (
    <>
      <Head>
        <title>Front-end Boilerplate</title>
      </Head>

      <main>
        <Heading variant='h1'>Hello World!</Heading>

        <HStack spacing={2}>
          <Button colorScheme='primary'>Primary Button</Button>
          <Button
            colorScheme='secondary'
            color='black'
          >
            Secondary Button
          </Button>
          <Button
            onClick={toggleColorMode}
            colorScheme='tertiary'
          >
            Toggle Color Mode
          </Button>
        </HStack>
      </main>
    </>
  )
}
