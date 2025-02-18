import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { User, ListOrdered, Divide } from 'lucide-react'
import logo from '../assets/logo_splitdummy.svg'
import { ReceiptText } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
export function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  function handleLocationPathname() {
    if (location.pathname === '/receipt') return ''
    return location.pathname.replace('/', '')
  }

  return (
    <>
      <div className="w-full flex items-center justify-center mb-8">
        <img className="w-28" src={logo} alt="logo" />
      </div>
      <div className="flex flex-row items-center justify-around gap-2 mb-4">
      <ToggleGroup.Root
        defaultValue="people"
        value={handleLocationPathname()}
        type="single"
        className="flex flex-row flex-wrap border-2 border-zinc-500 rounded-lg p-1 gap-1 items-center justify-between bg-zinc-950 flex-1 w-full"
      >
        <ToggleGroup.Item
          value="people"
          className="flex flex-row gap-1 items-center justify-center text-zinc-500 px-2 py-2 min-w-20 flex-1 font-semibold data-selectedMode:bg-blueish data-selectedMode:text-snow rounded"
          onClick={() => navigate('/people')}
        >
          <User className="size-4" />
          <span className="text-xs">Pessoas</span>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="items"
          className="flex flex-row gap-1 items-center justify-center text-zinc-500 py-2 px-2 min-w-20 flex-1 font-semibold data-selectedMode:bg-blueish data-selectedMode:text-snow rounded"
          onClick={() => navigate('/items')}
        >
          <ListOrdered className="size-4" />
          <span className="text-xs">Itens</span>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="divide"
          className="flex flex-row gap-1 items-center justify-center text-zinc-500 px-2 py-2 min-w-20 flex-1 font-semibold data-selectedMode:bg-blueish data-selectedMode:text-snow rounded"
          onClick={() => navigate('/divide')}
        >
          <Divide className="size-4" />
          <span className="text-xs">Divisão</span>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
        <button
          type="button"
          className="bg-blueish rounded-lg justify-center items-center flex h-full px-3 hover:bg-blueish/90 max-w-[70px]"
          onClick={() => navigate('/receipt')}
        >
          <ReceiptText className="size-7 text-snow" />
        </button>
      </div>
    </>
  )
}