import type {
  FormatCurrencyOptions,
  FormattedCurrency,
} from "~/shared/types/format-utils-types"

export function formatCurrency(
  amount: number | null | undefined,
  currency: string,
  options: FormatCurrencyOptions = {}
): FormattedCurrency | null | undefined {
  if (amount === null || amount === undefined) {
    return undefined
  }

  try {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      ...options,
    })

    const parts = formatter.formatToParts(amount)

    const symbol = parts.find((part) => part.type === "currency")!.value
    const amountOnly = parts
      .filter((part) => part.type !== "currency" && part.type !== "literal")
      .map((part) => part.value)
      .join("")
      .trim()

    return [symbol, amountOnly]
  } catch (error) {
    console.error("Error formatting amount:", error)
    return null
  }
}
