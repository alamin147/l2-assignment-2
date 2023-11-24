export type OrdersArray = {
  productName: string;
  price: number;
  quantity: number;
};

export type Fullname = {
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
  fullName: Fullname;
  age: number;
  email: string;
  isActive: 'active' | 'inactive';
  hobbies: Array<string>;
  address: Address;
  orders: Array<OrdersArray>;
};


export type IUpdateUserRequest= {
  userId: number;
  username?: string;
  fullName?: {
    firstName?: string;
    lastName?: string;
  };
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
}
