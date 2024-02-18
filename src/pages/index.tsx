import { type GetServerSideProps, type NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Card from '@/components/base/Card';
import CustomerSidebar from '@/components/customer/CustomerSidebar';
import CustomerTable from '@/components/customer/table/CustomerTable';
import { useNotification } from '@/context/NotificationContext';
import axios from '@/lib/axios';
import { type CustomerForm } from '@/types/forms/CustomerForm';
import { type Customer } from '@/types/models/Customer';

type Props = {
  initialCustomers: Customer[];
};

const Index: NextPage<Props> = ({ initialCustomers }: Props) => {
  const router = useRouter();
  const { t } = useTranslation('customer');
  const {
    showRefreshed,
    showSubjectCreated,
    showErrorToast,
    showSubjectDeleted,
  } = useNotification();

  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const handleCustomerCreate = async (customer: CustomerForm) => {
    try {
      const { data } = await axios.post<{ id: string }>('/customer', customer);

      showSubjectCreated(
        t('Subject'),
        `${customer.firstname} ${customer.lastname}`,
      );
      setCustomers((x) => [...x, { ...customer, id: data.id }]);
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  const handleCustomerUpdate = async (customer: Customer) => {
    await router.push(`/customer/update/${customer.id}`);
  };

  const handleCustomerDelete = async (customer: Customer) => {
    try {
      await axios.delete(`/customer/${customer.id}`);

      showSubjectDeleted(
        t('Subject'),
        `${customer.firstname} ${customer.lastname}`,
      );

      setCustomers((x) => x.filter((c) => c.id !== customer.id));
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  const handleCustomerView = async (customer: Customer) => {
    await router.push(`/customer/view/${customer.id}`);
  };

  const handleCustomerRefresh = async () => {
    try {
      const { data } = await axios.get<Customer[]>('customer');
      showRefreshed(t('Subject'));
      setCustomers(data);
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  const handleCustomerCopy = async (customer: Customer) => {
    const copyText = `${customer.firstname} ${customer.lastname} <${customer.email}>`;

    await navigator.clipboard.writeText(copyText);
  };

  return (
    <Card>
      <div className="mb-4">
        <CustomerSidebar handleCustomerCreate={handleCustomerCreate} />
      </div>
      <CustomerTable
        customers={customers}
        handleCustomerView={handleCustomerView}
        handleCustomerUpdate={handleCustomerUpdate}
        handleCustomerDelete={handleCustomerDelete}
        handleCustomerRefresh={handleCustomerRefresh}
        handleCustomerCopy={handleCustomerCopy}
      />
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  try {
    const [customers, translations] = await Promise.all([
      axios.get<Customer[]>('customer'),
      serverSideTranslations(locale || 'de', ['common', 'customer']),
    ]);

    return {
      props: {
        initialCustomers: customers.data,
        ...translations,
      },
    };
  } catch {
    return {
      props: {
        initialCustomers: [],
        ...(await serverSideTranslations(locale || 'de', [
          'common',
          'customer',
        ])),
      },
    };
  }
};

export default Index;
