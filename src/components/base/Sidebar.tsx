import { Sidebar as PRSidebar } from 'primereact/sidebar';
import { type FC, type PropsWithChildren } from 'react';

import {
  sidebarClassName,
  sidebarPassThrough,
} from '@/styles/overrides/sidebar';

type Props = {
  header: string;
  isVisible: boolean;
  onHide: () => void;
};

const Sidebar: FC<PropsWithChildren<Props>> = ({
  isVisible,
  onHide,
  children,
  header,
}) => {
  return (
    <PRSidebar
      visible={isVisible}
      onHide={onHide}
      position="right"
      className={sidebarClassName}
      pt={sidebarPassThrough}
      icons={
        <h5 className="mb-0 ml-5 mt-0 flex-1 text-xl text-white">{header}</h5>
      }
      modal
    >
      {children}
    </PRSidebar>
  );
};

export default Sidebar;
