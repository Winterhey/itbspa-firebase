import { type GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import axios from '@/libs/axios';
import { type NextPage } from '@/types/layout';
import { type Customer } from '@/types/models/Customer';

const ViewCustomer: NextPage = () => {
  return <div>UpdateCustomer</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [customers, translations] = await Promise.all([
    axios.get<Customer[]>('/customer'),
    serverSideTranslations(locale || 'de', ['common', 'customer']),
  ]);

  return {
    props: {
      customers: customers.data,
      ...translations,
    },
  };
};

export default ViewCustomer;
