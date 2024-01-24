import { useTranslation } from 'next-i18next';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react';

type ShowToast = (
  severity: 'success' | 'info' | 'warn' | 'error' | undefined,
  summary: string,
  detail: string,
  life?: number | undefined,
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
  showDeleteConfirmation: (
    subject: string,
    onDelete: () => void | Promise<void>,
    credentials?: string | number | undefined,
  ) => void;
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
  showDeleteConfirmation: () =>
    console.warn('NotificationProvider not initialized!'),
};

const NotificationContext = createContext(defaultProvider);

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const toastRef = useRef<Toast>(null);

  const { t } = useTranslation();

  const showToast: ShowToast = (
    severity: 'success' | 'info' | 'warn' | 'error' | undefined,
    summary: string,
    detail: string,
    life = 3000,
  ) => {
    if (toastRef.current === null) {
      console.warn('Toast Element not found. ToastRef points to nothing!');
    }

    toastRef.current?.show({ severity, summary, detail, life });
  };

  const showErrorToast = (message?: string | number | undefined) => {
    if (message === undefined) {
      return showToast(
        'error',
        t('Components.Toast.Error.Summary'),
        t('Components.Toast.Error.Detail'),
      );
    }

    showToast('error', message.toString(), t('Components.Toast.Error.Detail'));
  };

  const showRetreat = () =>
    showToast(
      'info',
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
      'success',
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
      'success',
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
      'success',
      t('Components.Toast.Delete.Summary'),
      t(key, {
        subject,
        credentials,
      }),
    );
  };

  const showMissingFields = () => {
    showToast(
      'warn',
      t('Components.Toast.MissingFields.Summary'),
      t('Components.Toast.MissingFields.Detail'),
    );
  };

  const showRefreshed = (subject: string) => {
    showToast(
      'success',
      t('Components.Toast.Refresh.Summary'),
      t('Components.Toast.Refresh.Detail', {
        subject,
      }),
    );
  };

  const showDeleteConfirmation = (
    subject: string,
    onDelete: () => void | Promise<void>,
    credentials?: string | number | undefined,
  ) => {
    confirmDialog({
      message: credentials
        ? t('Components.Toast.DeleteConfirmation.DetailWithCredentials', {
            subject,
            credentials,
          })
        : t('Components.Toast.DeleteConfirmation.Detail', { subject }),
      header: t('Components.Toast.DeleteConfirmation.Summary'),
      icon: 'pi pi-info-circle',
      acceptLabel: t('Actions.Yes'),
      rejectLabel: t('Actions.No'),
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: onDelete,
      reject: showRetreat,
    });
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
        showDeleteConfirmation,
      }}
    >
      <Toast ref={toastRef} />
      <ConfirmDialog />
      {children}
    </NotificationContext.Provider>
  );
};
