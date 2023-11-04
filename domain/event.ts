export interface Event {
    name: string;
    description: string;
    category: string;
    price: number;
    dateFrom: string;
    dateTo: string;
    image: string;
    isPremium: boolean;
}

export interface EventWithId extends Event {
    id: string;
}