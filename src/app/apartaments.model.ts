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
    details?: {
        flat: {
            kitchenType: string,
            bathroomWithToilet: 'Yes' | 'No',
            balcony: 'Yes' | 'No',
            terrace: 'Yes' | 'No',
            market: string  //rynek wtorny albo inny nwm?
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
    // make bigger model!( more details )
}