import { type GetServerSideProps, type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import Card from '@/components/base/Card';
import CreateCustomerSidebar from '@/components/customer/CreateCustomerSidebar';
import CustomerTable from '@/components/customer/CustomerTable';
import axios from '@/libs/axios';
import { type CustomerForm } from '@/types/forms/CustomerForm';
import { type Customer } from '@/types/models/Customer';
import { useState } from 'react';

type Props = {
  initialCustomers: Customer[];
};

const Index: NextPage<Props> = ({ initialCustomers }: Props) => {
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const handleCustomerCreate = async (customer: CustomerForm) => {
    try {
      const { data } = await axios.post<{ id: string }>('/customer', customer);

      setCustomers((x) => [...x, { ...customer, id: data.id }]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleCustomerUpdate = async (customer: Customer) => {
    await router.push(`/customer/update/${customer.id}`);
  };

  const handleCustomerDelete = async (customer: Customer) => {
    console.log('handleCustomerDelete', customer);
  };

  const handleCustomerView = async (customer: Customer) => {
    await router.push(`/customer/view/${customer.id}`);
  };

  return (
    <Card>
      <CreateCustomerSidebar handleCustomerCreate={handleCustomerCreate} />
      <CustomerTable
        customers={customers}
        handleCustomerView={handleCustomerView}
        handleCustomerUpdate={handleCustomerUpdate}
        handleCustomerDelete={handleCustomerDelete}
      />
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [customers, translations] = await Promise.all([
    axios.get<Customer[]>('/customer'),
    serverSideTranslations(locale || 'de', ['common', 'customer']),
  ]);

  return {
    props: {
      initialCustomers: customers.data,
      ...translations,
    },
  };
};

export default Index;
