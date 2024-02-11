import { type GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Card from '@/components/base/Card';
import UpdateForm from '@/components/customer/UpdateForm';
import axios from '@/lib/axios';
import { type NextPage } from '@/types/layout';
import { type Customer } from '@/types/models/Customer';

type Props = {
  customer: Customer;
};

const UpdateCustomer: NextPage<Props> = ({ customer }) => {
  return (
    <Card>
      <UpdateForm customer={customer} />
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
  query,
}) => {
  if (!query?.id) {
    return {
      notFound: true,
    };
  }

  try {
    const [customer, translations] = await Promise.all([
      axios.get<Customer>(`customer/${query.id}`),
      serverSideTranslations(locale || 'de', ['common', 'customer']),
    ]);

    return {
      props: {
        customer: customer.data,
        ...translations,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export default UpdateCustomer;
