export interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export enum Mode {
  EDIT = 'edit',
  ADD = 'add',
}
