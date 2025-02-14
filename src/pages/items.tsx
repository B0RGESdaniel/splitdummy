import { Input } from '../components/ui/input'
import { DropdownItem } from '../components/dropdown-item'

export function Items() {
  const MOCKUP_ITEMS = [
    { id: '1', description: 'Batata turbinada', unitValue: '50,99', qtd: 2 },
    { id: '2', description: 'Boi empanado', unitValue: '85,90', qtd: 1 },
    { id: '3', description: 'Spaten 600ml', unitValue: '12,00', qtd: 8 },
    { id: '4', description: 'Coca lata', unitValue: '8,00', qtd: 3 },
  ]
  return (
    <>
      <div className="border-2 border-blueish rounded-md p-4 gap-2 grid grid-cols-7">
        <div className="flex items-start justify-center flex-col gap-1 col-span-4">
          <span className="text-zinc-500 font-normal text-sm">Descrição<span className='text-xs'>(máx.: 20)</span></span>
          <Input />
        </div>
        <div className="flex items-start justify-center flex-col gap-1 col-span-2">
          <span className="text-zinc-500 font-normal text-sm">
            Valor unit.
          </span>
          <Input inputType="value" />
        </div>
        <div className="flex items-start justify-center flex-col gap-1">
          <span className="text-zinc-500 font-normal text-sm">Qtd</span>
          <Input inputType="qtd" />
        </div>
      </div>
      <button
        type="button"
        className="w-full bg-blueish px-4 py-2 text-sm font-semibold hover:bg-blueish/90 rounded-md mt-2"
      >
        Adicionar
      </button>
      <div>
        <div className="flex flex-row text-zinc-500 text-sm items-center justify-between px-6 py-3 mt-3">
          <span className="font-normal text-xs min-w-40">Descrição</span>
          <span className="font-normal text-xs min-w-12 text-start">
            Valor
          </span>
          <span className="font-normal text-xs min-w-8 text-start">Qtd</span>
          <span className="font-normal text-xs text-start">#</span>
        </div>
        <div className="flex flex-col gap-2">
          {MOCKUP_ITEMS.map(item => (
            <DropdownItem 
              key={item.id}
              description={item.description}
              value={item.unitValue}
              qtd={item.qtd}
            />
          ))}
        </div>
      </div>
    </>
  )
}
