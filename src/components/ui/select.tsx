import * as RSelect from '@radix-ui/react-select'
import { 
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon
} from '@radix-ui/react-icons'

type SelectProps = {
  placeholder?: string
  list: { id: string, description: string }[]
  selectFn: (id: string) => void
}

export function Select({ placeholder = 'Selecione um item', list, selectFn }: SelectProps) {

  return (
    <RSelect.Root>
      <RSelect.Trigger className='inline-flex flex-row items-center justify-between bg-zinc-600 rounded border-none shadow-inside px-3 py-2 text-sm font-normal box-border flex-1 data-[placeholder]:text-zinc-300'>
      <RSelect.Value placeholder={placeholder} />
        <RSelect.Icon>
          <ChevronDownIcon />
        </RSelect.Icon>
      </RSelect.Trigger>
      <RSelect.Portal>
        <RSelect.Content className='overflow-hidden rounded-lg bg-zinc-800 p-3'>
          <RSelect.ScrollUpButton className='flex h-6 cursor-default items-center justify-center bg-zinc-800'>
            <ChevronUpIcon />
          </RSelect.ScrollUpButton>
          <RSelect.Viewport>
            { list && list.map(item => (
              <RSelect.Item 
                key={item.id} 
                value={item.description}
                className='relative flex flex-row items-center pl-[25px] pr-[35px] py-2 gap-1 rounded-md select-none data-[disabled]:pointer-events-none data-[highlighted]:bg-blueish data-[highlighted]:outline-none leading-none'
                onClick={() => selectFn(item.id)}
              >
                <RSelect.ItemIndicator className='absolute left-0 inline-flex w-[25px] items-center justify-center'>
                  <CheckIcon />
                </RSelect.ItemIndicator>
                <RSelect.ItemText>{item.description}</RSelect.ItemText>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  )
}