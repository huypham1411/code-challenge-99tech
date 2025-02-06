import React, { useEffect, useState } from 'react'
import { Token } from '../TokenSelect'

interface PriceDisplayProps {
  fromCurrency: string
  toCurrency: string
  data: Token[]
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  fromCurrency,
  toCurrency,
  data,
}) => {
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    const fromTokenCurrencyPrice = data.find(
      (token) => token.currency === fromCurrency
    )?.price
    const toTokenCurrencyPrice = data.find(
      (token) => token.currency === toCurrency
    )?.price
    if (fromTokenCurrencyPrice && toTokenCurrencyPrice) {
      setPrice(fromTokenCurrencyPrice / toTokenCurrencyPrice)
    }
  }, [data, fromCurrency, toCurrency])

  return (
    <div className="mt-4">
      {price ? (
        <p className="text-lg text-gray-700">
          1 {fromCurrency} = {price.toFixed(2)} {toCurrency}
        </p>
      ) : (
        <p>Loading price data...</p>
      )}
    </div>
  )
}
