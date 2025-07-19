export interface Address {
  _id: string;  
  type: 'shipping' | 'billing';
  street: string;  
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;  
  updatedAt: string; 
}

export interface AddressFormData {
  type: 'shipping' | 'billing';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}