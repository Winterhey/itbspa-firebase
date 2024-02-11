import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { Col, Row } from 'react-grid-system';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ErrorDisplay from '@/components/utils/ErrorDisplay';
import { useNotification } from '@/context/NotificationContext';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { CustomerForm } from '@/types/forms/CustomerForm';
import { Customer } from '@/types/models/Customer';
import { useRouter } from 'next/router';

type Props = {
  customer: Customer;
  disabled?: boolean;
};

const UpdateForm: FC<Props> = ({ customer, disabled = false }) => {
  const { t } = useTranslation(['customer', 'common']);
  const { showMissingFields, showSubjectUpdated, showErrorToast } =
    useNotification();
  const router = useRouter();

  const { control, reset, handleSubmit, formState } = useForm<CustomerForm>({
    defaultValues: customer,
  });

  const onSubmit: SubmitHandler<CustomerForm> = async (formData) => {
    try {
      await axios.put<{ id: string }>(`/customer/${customer.id}`, formData);

      showSubjectUpdated(
        t('Subject'),
        `${formData.firstname} ${formData.lastname}`,
      );

      reset(formData);
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  const handleBack = async () => {
    return router.push('/');
  };

  return (
    <form
      className="mt-2 flex flex-col gap-4 pb-4"
      onSubmit={handleSubmit(onSubmit, showMissingFields)}
    >
      <Row>
        <Col sm={12} md={4}>
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
                  disabled={disabled}
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
        </Col>
        <Col sm={12} md={4}>
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
                  disabled={disabled}
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
        </Col>
        <Col sm={12} md={4}>
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
                  disabled={disabled}
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
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
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
                  disabled={disabled}
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
        </Col>
        <Col sm={12} md={6}>
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
                  disabled={disabled}
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
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={3}>
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
                  disabled={disabled}
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
        </Col>
        <Col sm={12} md={3}>
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
                  disabled={disabled}
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
        </Col>
        <Col sm={12} md={3}>
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
                  disabled={disabled}
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
        </Col>

        <Col sm={12} md={3}>
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
                  disabled={disabled}
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
        </Col>
      </Row>

      <div className="mt-2 flex gap-4">
        <Button type="button" variant="secondary" onClick={handleBack}>
          {t('common:Actions.Back')}
        </Button>
        {!disabled && (
          <Button type="submit" disabled={!formState.isDirty}>
            {t('common:Actions.Save')}
          </Button>
        )}
      </div>
    </form>
  );
};

export default UpdateForm;
