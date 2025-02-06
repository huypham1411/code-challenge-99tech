import { z } from 'zod'

export const currencySchema = z.object({
  fromCurrency: z.string().nonempty('Please select a currency.'),
  toCurrency: z.string().nonempty('Please select a currency.'),
  fromAmount: z
    .number()
    .positive('Amount should be positive.')
    .min(0.01, 'Amount should be at least 0.01.'),
})
