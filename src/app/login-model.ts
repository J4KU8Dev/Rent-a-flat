export interface LoginModel {
    id: string,
    gender: 'male' | 'female' | 'unknown',
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    role: 'User' | 'Admin' | 'Head Admin',
}