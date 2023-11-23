export type OrdersArray = {
  productName: string;
  price: number;
  quantity: number;
};

export type Username = {
  firstName: string;
  lastName: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};

export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: Username;
  age: number;
  email: string;
  isActive: 'active' | 'inactive';
  hobbies: Array<string>;
  address: Address;
  orders: Array<OrdersArray>;
};
