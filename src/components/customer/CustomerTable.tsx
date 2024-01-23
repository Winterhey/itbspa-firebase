import { useTranslation } from 'next-i18next';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { type FC } from 'react';

import { type Customer } from '@/types/models/Customer';

type Props = {
  customers: Customer[];
};

const CustomerTable: FC<Props> = ({ customers }) => {
  const { t } = useTranslation(['customer', 'common']);

  return (
    <DataTable value={customers} tableStyle={{ minWidth: '60rem' }}>
      <Column field="customerNumber" header={t('Customer.CustomerId')} />
      <Column field="lastname" header={t('Customer.Lastname')} />
      <Column field="firstname" header={t('Customer.Firstname')} />
      <Column field="email" header={t('Customer.Email')} />
      <Column field="phoneNumber" header={t('Customer.PhoneNumber')} />
      <Column field="street" header={t('Customer.Street')} />
      <Column field="houseNumber" header={t('Customer.HouseNumber')} />
      <Column field="postalCode" header={t('Customer.PostalCode')} />
      <Column field="city" header={t('Customer.City')} />
    </DataTable>
  );
};

export default CustomerTable;
