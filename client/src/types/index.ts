export interface IAuthValues {
    email: string;
    username?: string;
    password: string;
    remember?: boolean;
}

export interface IRouteError {
    data: string;
    error: { message: string; stack: string };
    internal: boolean;
    status: number;
    statusText: string;
}

export interface IProduct {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: string;
    manufacturer: string;
    manufacturerPrice: number;
    creationDate: string;
}

export interface IStorageProduct extends IProduct {
    code: string;
    buyingPrice: number;
    buyingPriceHistory: number[];
    sellingPrice: number;
    sellingPriceHistory: number[];
    totalAmount: number;
}

export interface IStorageSaleProduct extends IStorageProduct {
    amount: number;
}

export interface IStorageOperation extends IProduct {
    operationName: string;
    operationDate: string;
    amount?: number;
}
