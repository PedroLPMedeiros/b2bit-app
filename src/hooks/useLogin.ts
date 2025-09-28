
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';
import { useAuth } from '../context/AuthContext';
import type { LoginCredentials, AuthSuccessResponse, ApiError } from '../types/auth';


export function useLogin(): UseMutationResult<AuthSuccessResponse, ApiError, LoginCredentials> {
  const navigate = useNavigate();
  const { signIn } = useAuth(); 

  return useMutation({
    mutationFn: login, 
    
    onSuccess: (data: AuthSuccessResponse) => {
      
      signIn(data);
      
      
      navigate('/dashboard', { replace: true });
    },
    
    onError: (error: ApiError) => {
      
      console.error('Erro de Login:', error);
    },
    
    
    mutationKey: ['login-user'],
  });
}