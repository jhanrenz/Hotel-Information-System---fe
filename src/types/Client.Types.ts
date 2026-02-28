export interface Room{
    id: number;
    name: string;
    price: number
}


export interface Client{
    id: number;
    name: string;
    email: string;
    address: string;
    room_id: number;
    room?: Room
}