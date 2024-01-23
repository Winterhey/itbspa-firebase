import { useTranslation } from 'next-i18next';
import { Zen_Dots as ZenDots } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

const zenDots = ZenDots({ subsets: ['latin'], weight: '400' });

const DefaultHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 z-30 w-full bg-white bg-opacity-50 shadow-xl backdrop-blur-sm backdrop-filter">
      <div className="flex h-16 items-center justify-between pr-2">
        <Link
          className="relative mx-4 flex h-full items-center justify-center gap-4"
          href="/"
        >
          <Image
            src="/images/firebase.png"
            alt={t('Global.Name')}
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="text-3xl font-semibold" style={zenDots.style}>
            {t('Global.Name')}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default DefaultHeader;
