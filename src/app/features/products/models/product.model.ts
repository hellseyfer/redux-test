export interface Product {
    id?: string;
    name: string;
    description: string;
    price: { cost: number, currency: string},
    category: string;
    createdAt: string;
}