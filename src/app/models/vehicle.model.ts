export interface Vehicle {
    discriminator: string,
            platesNumber: string,
            sideNumber: string,
            color: string,
            type: string,
            picture: {
                id: string,
                name: string,
            },
            rangeKm: number,
            batteryLevelPct: number,
            reservationEnd: Date | null,
            reservation: Date | null,
            status: string,
            locationDescription: string,
            address: string | null,
            mapColor: {
                rgb: string,
                alpha: number
            },
            promotion: boolean | null,
            id: string,
            name: string,
            description: string | null,
            location: {
                latitude: number,
                longitude: number
            },
}