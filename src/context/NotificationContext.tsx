import { useTranslation } from 'next-i18next';
import { createContext, useContext, type PropsWithChildren } from 'react';
import { type ExternalToast, toast } from 'sonner';

type ShowToast = (
  summary: string,
  detail: string,
  options?: ExternalToast,
) => void;

type NotificationContext = {
  showToast: ShowToast;
  showErrorToast: (message?: string | number | undefined) => void;
  showRetreat: () => void;
  showSubjectCreated: (
    subject: string,
    credentials?: string | number | undefined,
  ) => void;
  showSubjectUpdated: (
    subject: string,
    credentials?: string | number | undefined,
  ) => void;
  showSubjectDeleted: (
    subject: string,
    credentials?: string | number | undefined,
  ) => void;
  showMissingFields: () => void;
  showRefreshed: (subject: string) => void;
};

const defaultProvider: NotificationContext = {
  showErrorToast: () => console.warn('NotificationProvider not initialized!'),
  showRetreat: () => console.warn('NotificationProvider not initialized!'),
  showSubjectCreated: () =>
    console.warn('NotificationProvider not initialized!'),
  showSubjectUpdated: () =>
    console.warn('NotificationProvider not initialized!'),
  showSubjectDeleted: () =>
    console.warn('NotificationProvider not initialized!'),
  showMissingFields: () =>
    console.warn('NotificationProvider not initialized!'),
  showRefreshed: () => console.warn('NotificationProvider not initialized!'),
  showToast: () => console.warn('NotificationProvider not initialized!'),
};

const NotificationContext = createContext(defaultProvider);

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  const showToast: ShowToast = (
    summary: string,
    detail: string,
    options?: ExternalToast,
  ) => {
    toast(summary, {
      description: detail,
      action: {
        label: t('Components.Toast.Close'),
        onClick: () => toast.dismiss(),
      },
      ...options,
    });
  };

  const showErrorToast = (message?: string | number | undefined) => {
    if (message === undefined) {
      return showToast(
        t('Components.Toast.Error.Summary'),
        t('Components.Toast.Error.Detail'),
      );
    }

    showToast(message.toString(), t('Components.Toast.Error.Detail'));
  };

  const showRetreat = () =>
    showToast(
      t('Components.Toast.Retreat.Summary'),
      t('Components.Toast.Retreat.Detail'),
    );

  const showSubjectCreated = (
    subject: string,
    credentials?: string | number | undefined,
  ) => {
    const key =
      credentials !== undefined
        ? 'Components.Toast.Create.DetailWithCredentials'
        : 'Components.Toast.Create.Detail';

    showToast(
      t('Components.Toast.Create.Summary'),
      t(key, {
        subject,
        credentials,
      }),
    );
  };

  const showSubjectUpdated = (
    subject: string,
    credentials?: string | number | undefined,
  ) => {
    const key =
      credentials !== undefined
        ? 'Components.Toast.Update.DetailWithCredentials'
        : 'Components.Toast.Update.Detail';

    showToast(
      t('Components.Toast.Update.Summary'),
      t(key, {
        subject,
        credentials,
      }),
    );
  };

  const showSubjectDeleted = (
    subject: string,
    credentials?: string | number | undefined,
  ) => {
    const key =
      credentials !== undefined
        ? 'Components.Toast.Delete.DetailWithCredentials'
        : 'Components.Toast.Delete.Detail';

    showToast(
      t('Components.Toast.Delete.Summary'),
      t(key, {
        subject,
        credentials,
      }),
    );
  };

  const showMissingFields = () => {
    showToast(
      t('Components.Toast.MissingFields.Summary'),
      t('Components.Toast.MissingFields.Detail'),
      {
        position: 'bottom-left',
        action: undefined,
      },
    );
  };

  const showRefreshed = (subject: string) => {
    showToast(
      t('Components.Toast.Refresh.Summary'),
      t('Components.Toast.Refresh.Detail', {
        subject,
      }),
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        showToast,
        showErrorToast,
        showRetreat,
        showSubjectCreated,
        showSubjectUpdated,
        showSubjectDeleted,
        showMissingFields,
        showRefreshed,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
