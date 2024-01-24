import { type Customer } from '@/types/models/Customer';

export type CustomerForm = Omit<Customer, 'id'>;
