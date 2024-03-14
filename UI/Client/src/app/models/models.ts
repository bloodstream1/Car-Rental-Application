export interface LoginUser {
    email: string;
    password: string;
}

export interface Car {
    id?: number,
    maker: string,
    model: string,
    availabilityStatus: AvailabilityStatus,
    rentalPrice: number,
}

export enum AvailabilityStatus {
    Available,
    Unavailable,
    UnderInspection,
    Booked,
    RequestedForReturn,
    Returned
}

export interface Agreement {
    id: number,
    bookingDate: Date,
    rentalDuration: number,
    totalCost: number,
    carId: number,
    userId?: string|null,
    status:AgreementStatus
}

export enum AgreementStatus {
    Pending,
    Accepted,
    Completed
}

export interface AgreementWithCarDTO {
    agreementId: number,
    carId: number,
    bookingDate: Date,
    rentalDuration: number,
    totalCost: number,
    userId?: string|null,
    carMaker: string,
    carModel: string,
    carRentalPrice: number,
    carAvailablilityStatus:AvailabilityStatus,
    status:AgreementStatus
}