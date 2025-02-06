import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { currencySchema } from '@/utils/validateSchema'
import InputField from 'components/InputField'
import { PriceDisplay } from 'components/PriceDisplay'
import SubmitButton from 'components/SubmitButton'
import TokenSelect, { Token } from 'components/TokenSelect'

type FormData = {
  fromAmount: number
  toAmount: number
  fromCurrency: string
  toCurrency: string
}

const CurrencySwapForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      fromAmount: 0,
      toAmount: 0,
      fromCurrency: '',
      toCurrency: '',
    },
  })
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://interview.switcheo.com/prices.json'
        )
        const data: Token[] = await response.json()
        setTokens(data)
      } catch (error) {
        console.error('Error fetching tokens:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (watch('fromAmount') || watch('fromCurrency') || watch('toCurrency'))
      setValue('toCurrency', '')
  }, [setValue, watch])
  const onSubmit = async (data: FormData) => {
    const fromTokenCurrencyPrice = tokens.find(
      (token) => token.currency === data.fromCurrency
    )
    const toTokenCurrencyPrice = tokens.find(
      (token) => token.currency === data.toCurrency
    )
    setValue(
      'toAmount',
      (data.fromAmount * fromTokenCurrencyPrice!.price) /
        toTokenCurrencyPrice!.price
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md"
    >
      <div>
        <TokenSelect
          data-testid="fromCurrency"
          name="fromCurrency"
          control={control}
          label="From Currency"
          tokens={tokens}
        />
        {errors.fromCurrency && (
          <p className="text-red-500">{errors.fromCurrency.message}</p>
        )}
        <Controller
          name="fromAmount"
          control={control}
          render={({ field }) => (
            <InputField
              data-testid="fromAmount"
              label="Amount"
              type="number"
              {...field}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(Number(e.target.value))
              }
            />
          )}
        />
        <p className="text-red-500">{errors.fromAmount?.message}</p>
      </div>

      <div>
        <TokenSelect
          data-testid="toCurrency"
          name="toCurrency"
          control={control}
          label="To Currency"
          tokens={tokens}
        />
        {errors.toCurrency && (
          <p className="text-red-500">{errors.toCurrency.message}</p>
        )}
        <Controller
          name="toAmount"
          control={control}
          render={({ field }) => (
            <InputField
              data-testid="toAmount"
              label="Converted Amount"
              {...field}
              readOnly
            />
          )}
        />
      </div>

      <PriceDisplay
        fromCurrency={watch('fromCurrency')}
        toCurrency={watch('toCurrency')}
        data={tokens}
      />

      <SubmitButton isLoading={isSubmitting} />
    </form>
  )
}

export default CurrencySwapForm
