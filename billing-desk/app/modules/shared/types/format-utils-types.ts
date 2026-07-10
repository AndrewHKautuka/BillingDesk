export type FormattedCurrency = readonly [symbol: string, amount: string]

export type FormatCurrencyOptions = Omit<
  Intl.NumberFormatOptions,
  "style" | "currency"
>
