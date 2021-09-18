import { OrderItem } from "./orderItem";

export class Order {
  constructor(
    public id: number = 0,
    public name: string = "",
    public email: string = "",
    public total: number = 0,
    public order_items: OrderItem[]
  ) {}
}
