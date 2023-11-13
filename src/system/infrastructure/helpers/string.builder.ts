export class StringBuilder {
  private readonly data: Array<string> = new Array<string>();

  append(str: string): StringBuilder {
    if (str !== null) this.data.push(str);
    return this;
  }

  clear(): StringBuilder {
    this.data.length = 0;
    return this;
  }

  get(index: number): string {
    if (this.data.length > index && index >= 0) {
      return this.data[index];
    }
    return null;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  remove(index: number): StringBuilder {
    if (this.data.length > index && index >= 0) {
      this.data.splice(index, 1);
    }
    return this;
  }

  toArrayString(delimeter: string): string {
    return this.data.join(delimeter);
  }

  toString(): string {
    return this.data.join('');
  }
}
