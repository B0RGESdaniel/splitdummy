import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Trash } from "lucide-react"
import { AddQtd } from "./add-qtd"

type DropdownItemProps = {
  description: string
  value: string
  qtd: number
}
export function DropdownItem({ description, value, qtd }: DropdownItemProps) {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger className="flex flex-row items-center justify-between w-full bg-zinc-600 px-6 py-3 rounded-md group">
            <span className="font-normal text-sm text-left min-w-40">{description}</span>
            <span className="font-normal text-sm min-w-12">{value}</span>
            <span className="font-semibold text-sm min-w-8">{qtd}</span>
            <ChevronDownIcon className="transition-transform duration-400 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <div className="bg-zinc-800 rounded-md px-6 py-3 flex flex-row items-center">
            <div className="flex-1 flex justify-center">
              <AddQtd qtd={qtd} />
            </div>
            <Trash className="size-5 text-red-500 cursor-pointer hover:text-red-500/70" />
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}