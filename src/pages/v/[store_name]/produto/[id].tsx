import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function SingleProductPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <Heading>
      {id}
    </Heading>
  )
}