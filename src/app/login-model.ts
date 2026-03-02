export interface LoginModel {
    id: string,
    gender: 'male' | 'female',
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    role: 'User' | 'Admin' | 'Head Admin',
}