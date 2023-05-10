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
			user_id: string
		}
	}
}

export type UserWithCategories = {
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
			resources: {
				categories: [
					{
						id: string,
						name: string,
						resources_id: string,
					}
				]
			}
		}
	}
}