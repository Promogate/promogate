import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    id: '',
		name: '',
		email: '',
		created_at: '',
		user_profile: {
			id: '',
			store_image: '',
			store_name: '',
			role: '',
      social_media: {
        facebook: '',
        whatsapp: '',
        instagram: '',
        telegram: '',
        twitter: '',
      } 
		}
  }
});

export { userState };
