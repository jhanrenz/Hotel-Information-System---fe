export interface Category{
    id: number,
    name: string
}

export interface Room{
    id: number,
    name: string,
    price: number,
    description: string,
    category_id: number,
    category? : Category
}