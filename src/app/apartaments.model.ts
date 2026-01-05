export interface ApartamentsModel {
    id: string,
    imagePath: string,
    name: string,
    city: string,
    street: string,
    rentalFee: number,
    apartmentSize: number,
    rooms: number,
    description: string,
    floor: string,
    elevator: 'Yes' | 'No',
    parkingSpace: 'Yes' | 'No',
    available: 'Yes' | 'No',
    fullDescription: string,
    details: {
        flat: {
            kitchenType: string,
            bathroomWithToilet: 'Yes' | 'No',
            balcony: 'Yes' | 'No',
            terrace: 'Yes' | 'No',
            market: 'Secondary' | 'Primary',
        }
        buidling: {
            buildingType: string,
            buildingMaterial: string,
            dateBuilding: string,
        }
        advertisement: {
            addedDate: string,
            lastUpdate: string,
            idAdvertisement: string,
            views: number,
        }
    }
}