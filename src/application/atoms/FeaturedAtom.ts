import { OfferWithClicks } from '@/domain/models';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const featuredOffersState = atom<OfferWithClicks[]>({
  key: 'featuredOffersState',
  default: [],
  effects_UNSTABLE: [persistAtom]
})