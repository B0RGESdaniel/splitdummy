import { Trash } from 'lucide-react'
export function Items() {
  const MOCKUP_ITEMS = [
    { id: '1', description: 'Batata turbinada', unitValue: '50,99', qtd: '2' },
    { id: '2', description: 'Boi empanado', unitValue: '85,90', qtd: '1' },
    { id: '3', description: 'Spaten 600ml', unitValue: '12,00', qtd: '8' },
    { id: '4', description: 'Coca lata', unitValue: '8,00', qtd: '3' },
  ]
  return (
    <>
      <div className="border-2 border-blueish rounded-md p-4 gap-4 flex flex-row">
        <span className="text-zinc-500 font-semibold text-sm">Descrição</span>
        <span className="text-zinc-500 font-semibold text-sm">Valor unit.</span>
        <span className="text-zinc-500 font-semibold text-sm">Qtd</span>
      </div>
      <button
        type="button"
        className="w-full bg-blueish px-4 py-2 text-sm font-medium hover:bg-blueish/90 rounded-md mt-2"
      >
        Adicionar
      </button>
      <div>
        <div className="flex flex-row text-zinc-500 text-sm items-center justify-between px-8 py-3">
          <span className="font-semibold min-w-40">Descrição</span>
          <span className="font-semibold min-w-16 text-center">
            Valor unit.
          </span>
          <span className="font-semibold min-w-10 text-start">Qtd</span>
          <span className="font-semibold min-w-4 text-center">#</span>
        </div>
        <div className="flex flex-col gap-2">
          {MOCKUP_ITEMS.map(item => (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between bg-zinc-600 px-8 py-3 rounded-md"
            >
              <span className="font-semibold min-w-40">{item.description}</span>
              <span className="font-semibold min-w-16 text-center">
                {item.unitValue}
              </span>
              <span className="font-semibold min-w-8 text-center">
                {item.qtd}
              </span>
              <Trash className="size-5 text-red-500 cursor-pointer hover:text-red-500/70" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
