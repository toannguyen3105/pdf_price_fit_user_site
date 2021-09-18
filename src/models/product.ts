export class Product {
  constructor(
    public goods_id: number = 0,
    public id: number = 0,
    public store_id: number = 0,
    public name: string = "",
    public max_price: number = 0,
    public min_price: number = 0,
    public price: number = 0
  ) {}
}
