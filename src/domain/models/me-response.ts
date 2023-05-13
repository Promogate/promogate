export type MeResponse = {
	status: string,
	user: {
		id: string,
		name: string,
		email: string,
		created_at: string,
		user_profile: {
			id: string,
			store_image: string,
			store_name: string,
			role: string,
			user_id: string,
      social_media?: {
        facebook?: string;
        whastapp?: string;
        instagram?: string;
        telegram?: string;
        twitter?: string;
      }
		}
	}
}

export type UserMeResponse = {
  id: string,
  name: string,
  email: string,
  created_at: string,
  user_profile: {
    id: string,
    store_image: string,
    store_name: string,
    role: string,
    user_id: string,
    resources: {
      id: string,
      created_at: string,
      user_profile_id: string
    }
  }
}