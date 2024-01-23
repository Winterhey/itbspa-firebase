import { classNames } from 'primereact/utils';
import { type FC, type PropsWithChildren } from 'react';

type Props = {
  className?: string | undefined;
  noBody?: boolean | undefined;
};

const Card: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  noBody,
}) => {
  const baseClasses = 'bg-white m-6 shadow-sm rounded-lg relative';

  const cardClass = classNames(baseClasses, className, {
    'p-8': !noBody,
  });

  return <section className={cardClass}>{children}</section>;
};

export default Card;
