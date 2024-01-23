import 'i18next';

import type common from '@locales/de/common.json';

import { type PathInto } from '.';

type DefaultNamespace = 'common';

type Resources = {
  common: typeof common;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: DefaultNamespace;
    resources: Resources;
  }
}

export type Translation<Namespace extends keyof Resources = DefaultNamespace> =
  PathInto<Resources[Namespace]>;
