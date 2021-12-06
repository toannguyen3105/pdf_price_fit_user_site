export class Store {
  constructor(
    public id: number = 0,
    public status: number = 0,
    public store_name: string = "",
    public description: string = "",
    public cookies: string = "",
    public csrf_token: string = ""
  ) {}
}
