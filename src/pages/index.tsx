import { type GetServerSideProps, type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Card from '@/components/base/Card';
import CustomerTable from '@/components/customer/CustomerTable';
import axios from '@/libs/axios';
import { type Customer } from '@/types/models/Customer';

type Props = {
  customer: Customer[];
};

const Index: NextPage<Props> = ({ customer }: Props) => {
  return (
    <Card>
      <CustomerTable customers={customer} />
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [customer, translations] = await Promise.all([
    axios.get<Customer[]>('/customer'),
    serverSideTranslations(locale || 'de', ['common', 'customer']),
  ]);

  return {
    props: {
      customer: customer.data,
      ...translations,
    },
  };
};

export default Index;
