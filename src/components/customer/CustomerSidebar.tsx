import { useTranslation } from 'next-i18next';
import { type FC, useState } from 'react';
import {
  Controller,
  type DefaultValues,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ErrorDisplay from '@/components/utils/ErrorDisplay';
import { useNotification } from '@/context/NotificationContext';
import { cn } from '@/lib/utils';
import { type CustomerForm } from '@/types/forms/CustomerForm';

type Props = {
  handleCustomerCreate: (customer: CustomerForm) => Promise<void>;
};

const defaultValuesFactory = (): DefaultValues<CustomerForm> => ({
  city: '',
  customerNumber: '',
  email: '',
  firstname: '',
  houseNumber: '',
  lastname: '',
  phoneNumber: '',
  postalCode: '',
  street: '',
});

const CustomerSidebar: FC<Props> = ({ handleCustomerCreate }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(['customer', 'common']);
  const { showMissingFields } = useNotification();

  const { control, reset, handleSubmit } = useForm<CustomerForm>({
    defaultValues: defaultValuesFactory(),
  });

  const onSubmit: SubmitHandler<CustomerForm> = async (formData) => {
    console.log('formData', formData);
    await handleCustomerCreate(formData);

    handleRetreat();
  };

  const handleRetreat = () => {
    reset(defaultValuesFactory());
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{t('Actions.InsertCustomer')}</Button>
      </SheetTrigger>
      <SheetContent className="w-[540px]">
        <SheetHeader>
          <SheetTitle>{t('Actions.InsertCustomer')}</SheetTitle>
        </SheetHeader>

        <form
          className="mt-2 flex flex-col gap-4 pb-4"
          onSubmit={handleSubmit(onSubmit, showMissingFields)}
        >
          <div className="flex flex-1 flex-col gap-4">
            <Controller
              name="customerNumber"
              control={control}
              rules={{
                required: t('common:Form.Validation.Required', {
                  field: t('Customer.CustomerId'),
                }),
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.CustomerId')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.CustomerId'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />

            <Controller
              name="lastname"
              control={control}
              rules={{
                required: t('common:Form.Validation.Required', {
                  field: t('Customer.Lastname'),
                }),
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.Lastname')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.Lastname'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />

            <Controller
              name="firstname"
              control={control}
              rules={{
                required: t('common:Form.Validation.Required', {
                  field: t('Customer.Firstname'),
                }),
              }}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.Firstname')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.Firstname'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.Email')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.Email'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.PhoneNumber')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.PhoneNumber'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.City')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.City'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />

            <Controller
              name="postalCode"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.PostalCode')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.PostalCode'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />

            <Controller
              name="street"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.Street')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.Street'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />

            <Controller
              name="houseNumber"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label htmlFor={field.name} className="mb-1 block">
                    {t('Customer.HouseNumber')}
                  </label>
                  <Input
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.HouseNumber'),
                    })}
                    className={cn({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />
          </div>

          <Button type="submit">{t('common:Actions.Save')}</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CustomerSidebar;
