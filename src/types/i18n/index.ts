export type PathInto<T extends Record<string, unknown>> = keyof {
  [K in keyof T as T[K] extends string
    ? K
    : T[K] extends Record<string, unknown>
      ? `${K & string}.${PathInto<T[K]> & string}`
      : never]: unknown;
};
