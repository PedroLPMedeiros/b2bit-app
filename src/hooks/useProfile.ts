import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { getProfile } from '../api/profileService';
import { useAuth } from '../context/AuthContext';
import type { UserData, GenericErrorResponse } from '../types/auth';
import { useNavigate } from 'react-router-dom';

export function useProfile() { 
  const { accessToken, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const queryResult = useQuery({
    queryKey: ['user-profile', accessToken], 
    
   
    queryFn: () => getProfile(accessToken!), 

    enabled: isAuthenticated && !!accessToken, 
    
   
    staleTime: 1000 * 60 * 10,
  });
  
 
  if (queryResult.isError) {
      const error = queryResult.error as unknown as GenericErrorResponse;
      
      if (error.statusCode === 401) {
        console.error("Token expirado. Fazendo logout.");
        signOut();
        navigate('/login', { replace: true });
      }
  }
  
  
  return queryResult;
}


export type UseProfileResult = UseQueryResult<UserData, GenericErrorResponse>;