
import axios, { AxiosError } from 'axios';
import type { UserData, AuthHeaders, GenericErrorResponse } from '../types/auth';


const API_BASE_URL = 'https://api.homologation.cliqdrive.com.br/auth/';

const profileApi = axios.create({
  baseURL: API_BASE_URL,
});


 
export async function getProfile(accessToken: string): Promise<UserData> {
 
  const endpoint = 'profile/'; 


  const headers: AuthHeaders = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json;version=v1_web',
    'Content-Type': 'application/json',
  };

  try {
   
    const response = await profileApi.get<UserData>(endpoint, { headers: headers as any });
    
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<GenericErrorResponse>;

  
    if (axiosError.response?.status === 401) {
     
      return Promise.reject({ detail: 'Sessão expirada. Faça login novamente.', statusCode: 401 });
    }
    
 
    if (axiosError.response?.data) {
      return Promise.reject(axiosError.response.data);
    }

    return Promise.reject({ detail: 'Erro de conexão ou desconhecido', statusCode: 0 });
  }
}