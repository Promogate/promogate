import { api } from '@/config';
import { MeResponse } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import Head from 'next/head';
import { parseCookies } from 'nookies';

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);

  const { data } = await api.get<MeResponse>('/users/me', {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })

  console.log(data)

  return {
    props: {
      status: data.status,
      user: data.user
    }
  }
})

export default function SocialSoulIntegrationPage({ status, user }: MeResponse) {

  if (!user.user_profile.lomadee_source_id || user.user_profile.lomadee_source_id === '') {
    return (
      <>
        <Head>
          <title>Promogate - Integração SocialSoul</title>
        </Head>
        <DashboardLayout>

        </DashboardLayout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Promogate - Integração SocialSoul</title>
      </Head>
      <DashboardLayout>

      </DashboardLayout>
    </>
  )
}