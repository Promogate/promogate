import { internalApiClient } from '@/config';
import { RegisterFormProps } from '@/domain/models';
import { setCookie } from 'nookies';

export async function registerUser (values: RegisterFormProps) {
    const { data } = await internalApiClient.post<{ token: string }>('/users/create', values)
    setCookie(null, 'promogate.token', data.token);
}