import { useTranslation } from 'next-i18next';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useState, type FC } from 'react';
import {
  Controller,
  useForm,
  type DefaultValues,
  type SubmitHandler,
} from 'react-hook-form';

import Sidebar from '@/components/base/Sidebar';
import ErrorDisplay from '@/components/utils/ErrorDisplay';
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

const CreateCustomerSidebar: FC<Props> = ({ handleCustomerCreate }) => {
  const { t } = useTranslation(['customer', 'common']);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { control, reset, handleSubmit } = useForm<CustomerForm>({});

  const onSubmit: SubmitHandler<CustomerForm> = async (formData) => {
    handleCustomerCreate(formData);

    reset(defaultValuesFactory());
  };

  const handleError = (error: unknown) => {
    console.error(error);
    alert(error);
  };

  const handleRetreat = () => {
    reset(defaultValuesFactory());
    setIsVisible(false);
  };

  return (
    <div>
      <Button
        type="button"
        label={t('Actions.AddCustomer')}
        icon="pi pi-users"
        outlined
        onClick={() => setIsVisible(true)}
      />

      <Sidebar
        isVisible={isVisible}
        onHide={() => setIsVisible(false)}
        header={t('Actions.AddCustomer')}
      >
        <form
          onSubmit={handleSubmit(onSubmit, handleError)}
          className="flex h-full flex-col gap-4 pb-4"
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.CustomerId'),
                    })}
                    className={classNames({
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.Lastname'),
                    })}
                    className={classNames({
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.Firstname'),
                    })}
                    className={classNames({
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.Email'),
                    })}
                    className={classNames({
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.PhoneNumber'),
                    })}
                    className={classNames({
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.City'),
                    })}
                    className={classNames({
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.PostalCode'),
                    })}
                    className={classNames({
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.Street'),
                    })}
                    className={classNames({
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
                  <InputText
                    ref={field.ref}
                    id={field.name}
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t('common:Form.Placeholder.Enter', {
                      field: t('Customer.HouseNumber'),
                    })}
                    className={classNames({
                      'p-invalid': fieldState.error,
                      'w-full': true,
                    })}
                  />
                  <ErrorDisplay fieldState={fieldState} />
                </div>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Button label={t('common:Actions.Create')} className="mb-2 mt-1" />
            <Button
              type="button"
              label={t('common:Actions.Retreat')}
              className="mb-2 mt-1"
              outlined
              severity="secondary"
              onClick={handleRetreat}
            />
          </div>
        </form>
      </Sidebar>
    </div>
  );
};

export default CreateCustomerSidebar;
