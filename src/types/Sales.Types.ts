export interface Room{
    id: number;
    price: number
}

export interface Client{
    id: number;
    name: string;
    room_id: number;
    room?: Room
}