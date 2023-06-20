import { PromogateContext } from '@/application/contexts';
import { api } from '@/config';
import { StoresResponse } from '@/domain/@types';
import { MeResponse } from '@/domain/models';
import { Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { PageLoader } from '../components';

export function SocialSoulPage({ status, user }: MeResponse) {
  const { authorization } = useContext(PromogateContext);
  const router = useRouter();

  async function getSocialSoulStores() {
    const { data } = await api.get<StoresResponse>('/social-soul/stores', {
      headers: {
        Authorization: authorization,
        'X-SOURCE-ID': user.user_profile.lomadee_source_id
      }
    });
    return data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['socialSoulStores' + user.user_profile.lomadee_source_id],
    queryFn: async () => await getSocialSoulStores(),
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12,
  });

  if (isLoading) {
    return (
      <PageLoader />
    )
  }

  return (
    <Grid
      gridTemplateColumns={['1fr', '1fr', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
      width={['100%']}
      gap={['1rem']}
    >
      {data?.stores.map((store, index) => {
        return (
          <GridItem
            key={index}
            backgroundColor={['white']}
            display={['flex']}
            flexDir={['column']}
            alignItems={['center']}
            borderRadius={['lg']}
            padding={['1rem']}
            as={Link}
            href={`${router.pathname}/${store.id}`}
          >
            <Image
              src={store.thumbnail}
              alt={store.name}
              width={['80px']}
            />
            <Heading
              as='h2'
              fontSize={['1rem']}
              fontWeight={['semibold']}
            >
              {store.name}
            </Heading>
            <Text
              as='span'
              fontSize={['0.8rem']}
              color={['gray.400']}
              fontWeight={['thin']}
            >
              {store.hasOffer} ofertas disponíveis
            </Text>
          </GridItem>
        )
      })}
    </Grid>
  )
}