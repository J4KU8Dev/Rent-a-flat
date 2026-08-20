export interface opinionsModel {
    customerId: string,
    gender: 'male' | 'female',
    firstName: string,
    lastName: string,
    opinionDate: string,
    opinionContent: string,
    apartmentId: string,
    rating: 1 | 2 | 3 | 4 | 5,
}