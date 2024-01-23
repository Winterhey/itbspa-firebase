import 'i18next';

import type common from '@locales/de/common.json';
import type customer from '@locales/de/customer.json';

import { type PathInto } from '.';

type DefaultNamespace = 'common';

type Resources = {
  common: typeof common;
  customer: typeof customer;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: DefaultNamespace;
    resources: Resources;
  }
}

export type Translation<Namespace extends keyof Resources = DefaultNamespace> =
  PathInto<Resources[Namespace]>;
