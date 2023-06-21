import { ConnectSocialsoulService } from '@/modules/social-soul/services';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { "x-source-id": sourceId } = req.headers as { 'x-source-id': string };

  if (req.method === 'GET') {
    const service = new ConnectSocialsoulService({ sourceId })
    const result = await service.getStores();
    return res.status(200).json(result);
  }

  return res.status(403).json({ message: 'Método não implementado' });
}