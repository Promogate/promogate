import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userData',
  default: {
    user: '',
    profile: ''
  }
})
