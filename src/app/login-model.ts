export interface LoginModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: number,
    role: 'User' | 'Admin' | 'Head Admin',
}