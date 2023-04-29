import { signInUser } from '@/application/remote';
import { SignInFormProps } from '@/domain/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const params = req.body as SignInFormProps
    try {
      const { token } = await signInUser(params)
      return res.status(201).json({ token })
    } catch (error: any) {
      return res.status(500).json({ message: error.message})
    }
  }

  return res.status(400).json({ message: 'Method not implemented!' })
}