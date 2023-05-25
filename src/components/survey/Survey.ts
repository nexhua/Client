class Survey<T> {
  private result: T;
  private isDone: boolean;

  constructor(result: T) {
    this.result = result;
    this.isDone = false;
  }

  setIsDone(isDone: boolean): void {
    this.isDone = isDone;
  }

  getIsDone(): boolean {
    return this.isDone;
  }

  update(result: T): void {
    this.result = result;
  }

  collect(): T {
    return this.result;
  }
}
