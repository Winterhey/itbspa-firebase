import { type Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props<T> = {
  table: Table<T>;
};

const TablePagination = <T,>({ table }: Props<T>) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft color="#444" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft color="#444" />
      </Button>

      <span className="flex items-center gap-1">
        {t('Components.Table.PageOf', {
          currentPage: table.getState().pagination.pageIndex + 1,
          pageCount: table.getPageCount(),
        })}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight color="#444" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight color="#444" />
      </Button>

      <div>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="min-w-[65px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TablePagination;
