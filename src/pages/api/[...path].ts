import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export function buildQuery(values: string[]): string {
  let result: string = '';
  values.map((value) => {
    result = result + '/' + value
  })
  return result
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query as { path: string[] };
  const query = buildQuery(path);
  const api = axios.create({
    baseURL: 'https://api.promogate.app/',
    headers: {
      Authorization: req.headers.authorization
    }
  })
  const { data, status } = await api(query);
  return res.status(status).json(data);
}