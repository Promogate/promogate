import { api } from '@/config';
import { NextApiRequest, NextApiResponse } from 'next';

type APIResponse = {
	status: string,
	message: string,
	offer: {
		id: string,
		image: string,
		title: string,
		old_price: string | null,
		price: string,
		destination_link: string,
		store_image: string,
		store_name: string,
		description: string,
		expiration_date: string,
		created_at: string,
		is_on_showcase: boolean,
		is_featured: boolean,
		is_free_shipping: boolean,
		resources_id: string,
		resources: {
			id: string,
			created_at: string,
			user_profile_id: string,
			analytics: {
				id: string
			}
		}
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET' && req.query) {
    const { id } = req.query as { id: string };

    const { data } = await api.get<APIResponse>(`/analytics/redirect/offer/${id}`)

    return res.redirect(data.offer.destination_link);
  }

  return res.status(400).json({
    status: 'error',
    message: 'Method not implemented'
  })
}