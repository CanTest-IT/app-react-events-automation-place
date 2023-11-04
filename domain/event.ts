import { Category } from "./category";

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

export interface EventWithCategory {
    name: string;
    description: string;
    category: Category;
    price: number;
    dateFrom: string;
    dateTo: string;
    image: string;
    isPremium: boolean;
    id: string;
}
