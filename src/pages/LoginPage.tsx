import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLogin } from '../hooks/useLogin';
import type { LoginCredentials, ValidationErrorResponse } from '../types/auth';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';


const formSchema = z.object({
  email: z.string().min(1, 'Este campo é obrigatório.').email('Formato de email inválido.'),
  password: z.string().min(6, 'Este campo é obrigatório.'),
});


type LoginFormValues = z.infer<typeof formSchema>;


export default function LoginPage() {
  const { mutate, isPending, error } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  
  function onSubmit(values: LoginFormValues) {
    
    mutate(values as LoginCredentials); 
  }

  
  const renderGenericError = () => {
    
    if (error && 'detail' in error && error.detail) {
      return (
        <p className="text-sm text-red-500 mt-4 text-center">
          {error.detail}
        </p>
      );
    }
    return null;
  };
    
  const fieldValidationErrors = error && !('detail' in error) ? (error as ValidationErrorResponse) : null;

  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px] h-[550px] p-4 shadow-2xl rounded-3xl border-0 bg-white">
        <CardHeader className='flex justify-center items-center mb-6 pt-4'>
            <img 
            src="./b2bit-logo.png"
            alt="Logo B2Bit" 
            className='h10 object-contain'
            />
         
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 text-xl'>E-mail</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="@gmail.com" 
                        {...field} 
                        type="email"
                        aria-invalid={!!form.formState.errors.email || !!fieldValidationErrors?.email}
                        className='h-12 bg-gray-100 border-none rounded-md placeholder:text-gray-400 text-base'
                      />
                    </FormControl>
                    <FormMessage/>

                    {fieldValidationErrors?.email && (
                        <p className="text-sm font-medium text-red-500">
                            {fieldValidationErrors.email[0]}
                        </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel className='text-gray-700 text-xl'>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        {...field} 
                        type="password"
                        aria-invalid={!!form.formState.errors.password || !!fieldValidationErrors?.password}
                        className="h-12 bg-gray-100 border-none rounded-md text-base"
                      />
                    </FormControl>
                    <FormMessage/>
                    
                    {fieldValidationErrors?.password && (
                        <p className="text-sm font-medium text-red-500">
                            {fieldValidationErrors.password[0]}
                        </p>
                    )}
                  </FormItem>
                )}
              />

              {renderGenericError()}

              <Button type="submit" className="w-full h-12 bg-[#002147] text-white" disabled={isPending}>
                {isPending ? 'Entrando...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}