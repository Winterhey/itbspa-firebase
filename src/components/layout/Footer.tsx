import { useTranslation } from 'next-i18next';
import { memo, type FC } from 'react';

import packageJson from '@/../package.json';

const year = new Date().getFullYear();

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="mx-2 mb-1 flex items-center justify-between text-sm">
      <div>
        <span> {t('Global.Footer.Copyright', { year })}</span>
        <span>&nbsp;-&nbsp;</span>
        <span>
          {t('Global.Footer.ByAuthor', { author: t('Global.Meta.Author') })}
        </span>
      </div>

      <span>
        {t('Global.Footer.Version', {
          version: packageJson.version,
        })}
      </span>
    </footer>
  );
};

export default memo(Footer);
