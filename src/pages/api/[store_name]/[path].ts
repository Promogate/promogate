import { api } from '@/config';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { store_name, path } = req.query as { store_name: string, path: string };
  const { data } = await api.get(`/upload/${store_name}/${path}`)
  res.write(data, 'utf8')
  res.end();
}