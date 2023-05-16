class Product<T> {
  product: T;
  amount: number = 0;

  constructor(product: T, amount: number) {
    this.product = product;
    this.amount = amount;
  }

  add(): void {
    this.amount += 1;
  }

  subtract(): void {
    if (this.amount > 0) {
      this.amount -= 1;
    }
  }

  getAmount(): number {
    return this.amount;
  }

  getProduct(): T {
    return this.product;
  }
}

export default Product;
