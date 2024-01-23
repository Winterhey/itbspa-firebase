import { useTranslation } from 'next-i18next';
import NextHead from 'next/head';
import { type FC } from 'react';

type Props = {
  title?: string | undefined;
};

const Head: FC<Props> = ({ title }) => {
  const { t } = useTranslation('common');

  return (
    <NextHead>
      <title>
        {title
          ? `${title} | ${t('Global.Meta.Title')}`
          : t('Global.Meta.Title')}
      </title>
      <meta name="description" content={t('Global.Meta.Description')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={t('Global.Meta.Keywords')} />
      <meta name="author" content={t('Global.Meta.Author')} />
    </NextHead>
  );
};

export default Head;
