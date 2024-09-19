import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { User, ListOrdered, Divide } from 'lucide-react'

export function ToggleMode() {
  return (
    <ToggleGroup.Root
      defaultValue="people"
      type="single"
      className="flex flex-row flex-wrap border-2 border-zinc-500 rounded-lg p-1 gap-1 items-center justify-center max-w-[308px] bg-zinc-950"
    >
      <ToggleGroup.Item
        value="people"
        className="flex flex-row gap-1 items-center justify-center text-zinc-500 px-2 py-2 w-24 font-semibold data-selectedMode:bg-blueish data-selectedMode:text-snow rounded"
      >
        <User className="size-4" />
        <span className="text-sm">Pessoas</span>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="items"
        className="flex flex-row gap-1 items-center justify-center text-zinc-500 py-2 w-24 font-semibold data-selectedMode:bg-blueish data-selectedMode:text-snow rounded"
      >
        <ListOrdered className="size-4" />
        <span className="text-sm">Itens</span>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="division"
        className="flex flex-row gap-1 items-center justify-center text-zinc-500 px-2 py-2 w-24 font-semibold data-selectedMode:bg-blueish data-selectedMode:text-snow rounded"
      >
        <Divide className="size-4" />
        <span className="text-sm">Divisão</span>
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
