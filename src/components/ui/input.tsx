import { useState } from 'react'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'bg-zinc-600 rounded border-none shadow-inside px-3 font-semibold box-border w-full placeholder:italic placeholder:text-zinc-800 placeholder:font-bold',
  variants: {
    inputType: {
      text: 'text-sm',
      qtd: '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
      value: '',
    },
    size: {
      default: 'h-8',
      lg: '',
    },
  },
  defaultVariants: {
    inputType: 'text',
    size: 'default',
  },
})

type InputProps = VariantProps<typeof input> & ComponentProps<'input'>

export function Input({ inputType, size, ...props }: InputProps) {
  const [inputValue, setInputValue] = useState('')

  function handleInputChange(value: string, inputType = 'text') {
    if (inputType === 'text') return value

    if (inputType === 'value') {
      const clearValue = value.replace(/\D/g, '')

      const parsedNum = Number.parseFloat(clearValue)

      if (!Number.isNaN(parsedNum)) {
        const result = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
          .format(parsedNum / 100)
          .slice(2)

        return result
      }

      return ''
    }

    if (inputType === 'qtd') {
      const clearValue = value.replace(/\D/g, '')
      const parsedNum = Number.parseInt(clearValue)
      if (!Number.isNaN(parsedNum)) {
        return String(parsedNum)
      }

      return ''
    }

    return ''
  }

  function handlePlaceholder(inputType = 'text') {
    if (inputType === 'text') return 'Batatinha'
    if (inputType === 'value') return '0,00'
    if (inputType === 'qtd') return '0'
  }

  return (
    <input
      {...props}
      className={input({ inputType, size })}
      onChange={e =>
        setInputValue(handleInputChange(e.target.value, inputType))
      }
      min={0}
      placeholder={handlePlaceholder(inputType)}
      value={inputValue}
    />
  )
}
