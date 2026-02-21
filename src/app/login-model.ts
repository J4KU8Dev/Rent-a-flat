export interface LoginModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: 'User' | 'Admin' | 'Head Admin',
}