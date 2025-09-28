import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { GenericErrorResponse } from '../types/auth'; 


import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label'; 

const FALLBACK_AVATAR = "./public/avatar-fallback.svg";

export default function DashboardPage() {
  const { data: user, isLoading, isError, error } = useProfile();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="p-8"><p>Carregando Perfil...</p></Card>
      </div>
    );
  }

  if (isError) {
    const potentialApiError = error as unknown as GenericErrorResponse; 
    const getErrorMessage = () => {
        if (potentialApiError && 'detail' in potentialApiError) {
            return potentialApiError.detail;
        }
        return error?.message || 'Não foi possível carregar os dados.';
    };
    
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-lg p-8 border-red-500">
          <h2 className="text-xl text-red-600 font-bold mb-4">Erro ao Carregar Perfil</h2>
          <p className="text-sm text-red-500">
            **Erro:** {getErrorMessage()} 
          </p>
          <Button onClick={handleLogout} variant="destructive" className="mt-4">
            Fazer Logout
          </Button>
        </Card>
      </div>
    );
  }

  var fullName;

  if (user?.last_name == null) {
    fullName = user?.name;
  } else {
    fullName = `${user.name} ${user.last_name}` 
  }
   
    const avatarUrl = user?.avatar?.high || FALLBACK_AVATAR;


  return (
    <div className="min-h-screen">
        <header className="fixed top-0 left-0 w-full p-6 bg-white">
            <div className='flex justify-end'>
                <Button 
                onClick={handleLogout} 
                className="w-auto bg-[#002147] hover:bg-[#002147]/90 text-white font-semibold h-10 px-22 py-6 rounded-md"
            >
                Logout
            </Button>
            </div>
        </header>

        <div className="flex justify-center items-center min-h-screen pt-20">
            

            <Card className="w-[480px] h-[450px] p-6 shadow-xl rounded-2xl border-0 bg-white">
                
                <CardHeader className="flex flex-col items-center justify-center space-y-4 p-0 pb-8">
                    <p className="text-gray-800">Profile picture</p>
                    <div className="w-16 h-16 overflow-hidden border-2 border-white shadow-md">
                        <img 
                            src={avatarUrl} 
                            alt={fullName}
                            className="w-full h-full rounded-sm object-cover"
                        />
                    </div>
                </CardHeader>


                <CardContent className="space-y-8 p-0">
                    
                    
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">
                            Your <span className='font-bold'>Name</span>
                        </Label>
                        <Input 
                            value={fullName || ''} 
                            disabled 
                            className="h-12 bg-gray-100 border-none rounded-md placeholder:text-gray-500 text-base cursor-default"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">
                            Your <span className='font-bold'>E-mail</span>
                        </Label>
                        <Input 
                            value={user?.email || ''} 
                            disabled 
                            className="h-12 bg-gray-100 border-none rounded-md placeholder:text-gray-500 text-base cursor-default"
                        />
                    </div>

                    
                    
                </CardContent>
            </Card>

        </div>
    </div>
  );
}