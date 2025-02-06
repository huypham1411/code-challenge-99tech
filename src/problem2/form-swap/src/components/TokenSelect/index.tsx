import React, { useEffect, useRef, useState } from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

export type Token = {
  currency: string
  price: number
  date: string
}

type TokenSelectProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  tokens: Token[]
}

const TokenSelect = <T extends FieldValues>({
  control,
  name,
  label,
  tokens,
}: TokenSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label htmlFor={name as string} className="font-semibold">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedToken = tokens.find((t) => t.currency === field.value)

          return (
            <div
              className="border border-gray-300 rounded-lg p-2 cursor-pointer flex items-center justify-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedToken ? (
                <div className="flex items-center gap-2">
                  <img
                    src={`/assets/tokens/${selectedToken.currency}.svg`}
                    alt={selectedToken.currency}
                    className="w-6 h-6"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <span>{selectedToken.currency}</span>
                </div>
              ) : (
                <span className="text-gray-400">Select Token </span>
              )}

              <span>{isOpen ? '▲' : '▼'}</span>

              {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-md z-10 max-h-60 overflow-y-auto">
                  {tokens.map((token, index) => (
                    <div
                      key={`${token.currency}-${index}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        field.onChange(token.currency)
                        setIsOpen(false)
                      }}
                    >
                      <img
                        src={`/assets/tokens/${token.currency}.svg`}
                        alt={token.currency}
                        className="w-6 h-6"
                        onError={(e) =>
                          (e.currentTarget.style.display = 'none')
                        }
                      />
                      <span>{token.currency}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}

export default TokenSelect
