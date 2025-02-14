type AddQtdProps = {
  qtd: number
}

export function AddQtd({ qtd }: AddQtdProps) {
  return (
    <div className="flex items-center justify-center min-w-12 gap-2">
      <button className="flex items-center justify-center bg-blueish p-[10px] h-7 rounded-lg text-lg font-semibold">-</button>
      <span className="font-bold text-2xl min-w-8 text-center">{qtd}</span>
      <button className="flex items-center justify-center bg-blueish p-[10px] h-7 rounded-lg text-lg font-semibold">+</button>
    </div>
  )
}