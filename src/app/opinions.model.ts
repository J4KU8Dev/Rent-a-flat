export interface opinionsModel {
    CustomerId: string,
    gender: 'male' | 'female',
    firstName: string,
    lastName: string,
    opinionDate: string,
    opinionContent: string,
    apartamentId: string,
    rating: 1 | 2 | 3 | 4 | 5,
}