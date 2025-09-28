import axios, {AxiosError} from 'axios';
import type { LoginCredentials, AuthSuccessResponse } from '@/types/auth';
import type { ApiError, ValidationErrorResponse, GenericErrorResponse } from '@/types/auth';

const API_BASE_URL = ' https://api.homologation.cliqdrive.com.br/auth/';

const authApi = axios.create({
    baseURL: API_BASE_URL,
});

export async function login(credentials: LoginCredentials): Promise<AuthSuccessResponse> {
    const endpoint = 'login/';

    const headers: any = {
        Accept: 'application/json;version=v1_web',
        'Content-Type': 'application/json',
    };

    try {
        const response = await authApi.post<AuthSuccessResponse>(endpoint, credentials, {headers});
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiError>;

        if (axiosError.response?.status === 400 && axiosError.response.data){
            const ValidationError = axiosError.response.data as ValidationErrorResponse;

            return Promise.reject(ValidationError);
        }

        if (axiosError.response?.data) {
            const genericError = axiosError.response.data as GenericErrorResponse;
            return Promise.reject(genericError)
        }

        return Promise.reject({detail: 'Erro de conexão ou desconhecido', statusCode: 0});
    }
}