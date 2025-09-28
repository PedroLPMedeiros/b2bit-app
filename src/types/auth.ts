export interface LoginHeaders {
    Accept: 'application/json;version=v1_web';
    'Content-Type': 'application/json';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AvatarImages {
    id: number;
    high: string;
    medium: string;
    low: string;
}

export interface UserRole {
    value: number;
    label: string;
}

export interface UserData {
    id: string;
    avatar: AvatarImages;
    name: string;
    last_name: string;
    email: string;
    role: UserRole; 
    staff_role: UserRole; 
    last_login: string;
}

export interface AuthTokens {
    refresh: string;
    access: string;
}

export interface AuthSuccessResponse {
  user: UserData;
  tokens: AuthTokens;
}


export interface AuthHeaders {
    Authorization: string;
    Accept: 'application/json;version=v1_web';
    'Content-Type': 'application/json';
}

export interface AuthErrorResponse {
    statusCode: number;
    detail: string;
}

export interface ValidationErrorResponse {
    email?: string [];
    password?: string[];
}

export interface GenericErrorResponse {
  detail: string;
  statusCode: number;
}

export type ApiError = ValidationErrorResponse | GenericErrorResponse;

