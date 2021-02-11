import { Game } from '.';

export enum OrderStatus {
  created = 'Created',
  completed = 'Completed',
}

export class Order {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
}

export class OrderItem {
  id: number;
  game: Game;
  price: number;
  qty: number;
}
