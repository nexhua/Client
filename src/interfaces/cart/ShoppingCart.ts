export interface ShoppingCart<T> {
  items: Array<Item<T>>;
}

export interface Item<T> {
  item: T;
  amount: number;
}
