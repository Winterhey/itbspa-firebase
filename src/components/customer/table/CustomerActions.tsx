import { MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { type FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  handleCustomerCopy: () => void;
  handleCustomerDelete: () => void;
  handleCustomerUpdate: () => void;
  handleCustomerView: () => void;
};

const CustomerActions: FC<Props> = ({
  handleCustomerCopy,
  handleCustomerDelete,
  handleCustomerUpdate,
  handleCustomerView,
}) => {
  const { t } = useTranslation(['customer', 'common']);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">
            {t('common:Components.Table.OpenMenu')}
          </span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {t('common:Components.Table.Actions')}
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCustomerCopy}>
          {t('Actions.CopyCustomerData')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCustomerView}>
          {t('Actions.ViewCustomer')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCustomerUpdate}>
          {t('Actions.UpdateCustomer')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCustomerDelete}>
          {t('Actions.DeleteCustomer')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomerActions;
