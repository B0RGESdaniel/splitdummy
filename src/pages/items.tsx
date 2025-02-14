import { useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Input } from '../components/ui/input'
import { DropdownItem } from '../components/dropdown-item'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Item } from '../types/all-types'

export function Items() {
  const { setItem, getItem } = useLocalStorage()
  const [descriptionInput, setDescriptionInput] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [amountInput, setAmountInput] = useState('')
  const [refresh, setRefresh] = useState(false)
  const itemsList = useMemo(() => getItem('items'), [refresh])

  function handleAddItem(description: string, value: string, amount: string) {
    if (!description || !value || !amount) return;

    const uuid = uuidv4()

    const items = getItem('items')

    if (!items) {
      setItem('items', [{  id: uuid, description, unitPrice: value, amount }])
    }
    const newList = [...items, { id: uuid, description, unitPrice: value, amount }]
    setItem('items', newList)

    setDescriptionInput('')
    setValueInput('')
    setAmountInput('')
    setRefresh(!refresh)
  }

  function handleRemoveItem(id: string) {
    const items = getItem('items')
    const itemsFiltered = items.filter((item:Item) => item.id !== id)
    
    setItem('items', itemsFiltered)
    setRefresh(!refresh)
  }

  function increaseAmount(id: string) {
    const items = getItem('items')
    const newList = items.map((item:Item) => 
      item.id === id ? { ...item, amount: String(Number(item.amount) + 1) } : item )

    setItem('items', newList)
    setRefresh(!refresh)
  }

  function decreaseAmount(id: string) {
    const items = getItem('items')
    const newList = items.map((item:Item) => 
      item.id === id ? 
        { ...item, amount: ((item.amount - 1) >= 0 ? String(Number(item.amount) - 1) : 0) }
        : item )

    setItem('items', newList)
    setRefresh(!refresh)
  }

  return (
    <>
      <div className="border-2 border-blueish rounded-md p-4 gap-2 grid grid-cols-7">
        <div className="flex items-start justify-center flex-col gap-1 col-span-4">
          <span className="text-zinc-500 font-normal text-sm">Descrição<span className='text-xs'>(máx.: 20)</span></span>
          <Input
           stateValue={descriptionInput}
           setStateValue={setDescriptionInput}
          />
        </div>
        <div className="flex items-start justify-center flex-col gap-1 col-span-2">
          <span className="text-zinc-500 font-normal text-sm">
            Valor unit.
          </span>
          <Input
           inputType="value"
           stateValue={valueInput}
           setStateValue={setValueInput}
          />
        </div>
        <div className="flex items-start justify-center flex-col gap-1">
          <span className="text-zinc-500 font-normal text-sm">Qtd</span>
          <Input
           inputType="qtd"
           stateValue={amountInput}
           setStateValue={setAmountInput}
          />
        </div>
      </div>
      <button
        type="button"
        className="w-full bg-blueish px-4 py-2 text-sm font-semibold hover:bg-blueish/90 rounded-md mt-2"
        onClick={() => handleAddItem(descriptionInput, valueInput, amountInput)}
      >
        Adicionar
      </button>
      <div>
        { (itemsList) && (
          <div className="flex flex-row text-zinc-500 text-sm items-center justify-between px-6 py-3 mt-3">
            <span className="font-normal text-xs min-w-40">Descrição</span>
            <span className="font-normal text-xs min-w-12 text-start">
              Valor
            </span>
            <span className="font-normal text-xs min-w-8 text-start">Qtd</span>
            <span className="font-normal text-xs text-start">#</span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {itemsList && itemsList.map((item:Item) => (
            <DropdownItem 
              key={item.id}
              description={item.description}
              value={item.unitPrice}
              qtd={item.amount}
              removeFn={() => handleRemoveItem(item.id)}
              increaseFn={() => increaseAmount(item.id)}
              decreaseFn={() => decreaseAmount(item.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
