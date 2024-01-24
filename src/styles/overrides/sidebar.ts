import { type SidebarPassThroughOptions } from 'primereact/sidebar';

export const sidebarPassThrough = {
  root: { style: { width: 500 } },
  header: {
    style: {
      backgroundColor: 'var(--primary-color)',
      paddingRight: '1.5rem',
    },
  },
  icons: {
    style: {
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  closeIcon: {
    style: {
      color: 'white',
    },
  },
  content: {
    style: {
      paddingTop: '2rem',
      paddingLeft: '3rem',
      paddingRight: '3rem',
      paddingBottom: '1rem',
      height: '100%',
    },
  },
} satisfies SidebarPassThroughOptions;

export const sidebarClassName = 'sidebarPassThrough layout-profile-sidebar';
