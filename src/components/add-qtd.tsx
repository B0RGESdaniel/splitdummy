type AddQtdProps = {
  qtd: number
  increaseFn: () => void
  decreaseFn: () => void
  disabled?: boolean
}

export function AddQtd({ qtd, increaseFn, decreaseFn, disabled = false }: AddQtdProps) {
  return (
    <div className="flex items-center justify-center min-w-12 gap-2">
      <button 
       className="flex items-center justify-center bg-blueish p-[10px] h-7 rounded-lg text-lg font-semibold"
       onClick={() => decreaseFn()}
       disabled={disabled}
      >-</button>
      <span className="font-bold text-2xl min-w-8 text-center">{qtd}</span>
      <button 
       className="flex items-center justify-center bg-blueish p-[10px] h-7 rounded-lg text-lg font-semibold"
       onClick={() => increaseFn()}
       disabled={disabled}
      >+</button>
    </div>
  )
}