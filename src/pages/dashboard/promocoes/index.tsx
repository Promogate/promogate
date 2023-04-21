import { DashboardLayout } from '@/presentation/components'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import { RxPlus } from 'react-icons/rx'

export default function OffersPage() {
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <Flex
          width={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading
            as={'h2'}
            fontSize={{ lg: '2xl' }}
            color={'gray.600'}
          >
            Promoções
          </Heading>
          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
            placement='right'
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton
                aria-label='create'
                variant={'outline'}
                onClick={onOpen}
              >
                <RxPlus />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Box
                  as={Link}
                  href='/dashboard/promocoes/adicionar'
                >
                  <Text
                    padding={{ lg: '0.5rem' }}
                    borderRadius={{ lg: 'md' }}
                    _hover={{
                      backgroundColor: 'gray.100',
                      transition: '300ms ease-out'
                    }}
                  >
                    Adicionar promoção
                  </Text>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </DashboardLayout>
    </Fragment>
  )
}