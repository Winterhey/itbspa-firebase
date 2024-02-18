import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, RefreshCw } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { useState, type FC } from 'react';

import { default as TableColumns } from '@/components/base/table/TableColumns';
import TablePagination from '@/components/base/table/TablePagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type Customer } from '@/types/models/Customer';

import { default as CustomerActions } from './CustomerActions';

type Props = {
  customers: Customer[];

  handleCustomerUpdate: (customer: Customer) => void;
  handleCustomerDelete: (customer: Customer) => void;
  handleCustomerView: (customer: Customer) => void;
  handleCustomerCopy: (customer: Customer) => void;

  handleCustomerRefresh: () => void;
};

const CustomerTable: FC<Props> = ({
  customers,
  handleCustomerCopy,
  handleCustomerDelete,
  handleCustomerRefresh,
  handleCustomerUpdate,
  handleCustomerView,
}) => {
  const { t } = useTranslation(['customer', 'common']);
  const columns: ColumnDef<Customer>[] = [
    {
      id: t('Customer.CustomerId'),
      accessorKey: 'customerNumber',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('Customer.CustomerId')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      enableHiding: false,
    },
    {
      id: t('Customer.Firstname'),
      accessorKey: 'firstname',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('Customer.Firstname')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: t('Customer.Lastname'),
      accessorKey: 'lastname',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('Customer.Lastname')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: t('Customer.Email'),
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('Customer.Email')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: t('Customer.PhoneNumber'),
      accessorKey: 'phoneNumber',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('Customer.PhoneNumber')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: t('Customer.HouseNumber'),
      accessorKey: 'houseNumber',
      header: t('Customer.HouseNumber'),
    },
    {
      id: t('Customer.City'),
      accessorKey: 'city',
      header: t('Customer.City'),
    },
    {
      id: t('Customer.PostalCode'),
      accessorKey: 'postalCode',
      header: t('Customer.PostalCode'),
    },
    {
      id: t('Customer.Street'),
      accessorKey: 'street',
      header: t('Customer.Street'),
    },
    {
      id: t('common:Components.Table.Actions'),
      cell: ({ row }) => (
        <CustomerActions
          handleCustomerCopy={() => handleCustomerCopy(row.original)}
          handleCustomerDelete={() => handleCustomerDelete(row.original)}
          handleCustomerUpdate={() => handleCustomerUpdate(row.original)}
          handleCustomerView={() => handleCustomerView(row.original)}
        />
      ),
      enableHiding: false,
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [globalFilter, setGlobalFilter] = useState<string>('');

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder={t('common:Components.Table.Search')}
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          <RefreshCw
            onClick={handleCustomerRefresh}
            className="cursor-pointer transition-colors hover:text-firebase-amber"
          />
          <TableColumns table={table} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('common:Components.Table.NoData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination table={table} />
    </div>
  );
};

export default CustomerTable;
