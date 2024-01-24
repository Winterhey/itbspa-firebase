import { useTranslation } from 'next-i18next';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState, type FC } from 'react';

import { type Customer } from '@/types/models/Customer';

type Props = {
  customers: Customer[];

  handleCustomerUpdate: (customer: Customer) => void;
  handleCustomerDelete: (customer: Customer) => void;
  handleCustomerView: (customer: Customer) => void;
};

const CustomerTable: FC<Props> = ({ customers }) => {
  const { t } = useTranslation(['customer', 'common']);

  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  } satisfies DataTableFilterMeta);

  return (
    <DataTable
      value={customers}
      tableStyle={{ minWidth: '60rem' }}
      dataKey="id"
      paginator
      rows={5}
      filters={filters}
      rowsPerPageOptions={[5, 10, 25, 50]}
      emptyMessage={t('NoCustomersFound')}
      header={
        <div className="justify-content-end flex">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={filters.global.value}
              onChange={(e) =>
                setFilters((x) => ({
                  ...x,
                  global: { ...x.global, value: e.target.value },
                }))
              }
              placeholder="Keyword Search"
            />
          </span>
        </div>
      }
    >
      <Column
        field="customerNumber"
        sortable
        header={t('Customer.CustomerId')}
      />
      <Column field="lastname" sortable header={t('Customer.Lastname')} />
      <Column field="firstname" sortable header={t('Customer.Firstname')} />
      <Column field="email" sortable header={t('Customer.Email')} />
      <Column field="phoneNumber" sortable header={t('Customer.PhoneNumber')} />
      <Column field="street" sortable header={t('Customer.Street')} />
      <Column field="houseNumber" sortable header={t('Customer.HouseNumber')} />
      <Column field="postalCode" sortable header={t('Customer.PostalCode')} />
      <Column field="city" sortable header={t('Customer.City')} />
    </DataTable>
  );
};

export default CustomerTable;
