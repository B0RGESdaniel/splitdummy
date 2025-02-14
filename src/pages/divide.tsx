import { useState } from "react"
import { toast } from "react-toastify"

import { AddQtd } from "../components/add-qtd"
import { Select } from "../components/ui/select"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Participant, Item, Part } from "../types/all-types"

export function Divide() {
  const [idSelectItem, setIdSelectItem] = useState('');
  const [refresh, setRefresh] = useState(false);
  const { setItem, getItem } = useLocalStorage()


  function getAllItems() {
    const items = getItem('items');
    return items
  }

  function getAllParticipants() {
    const participants = getItem('participants');
    return participants
  }

  function getAllParts() {
    const parts = getItem('parts');
    return parts ? parts : []
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

  function handleIncreaseParts(idParticipant: string, idItem: string) {
    if (!idItem) {
      toast.error('Selecione um item')
      return
    }

    if (!getAllParts().find((part:Part) => 
      (part.idParticipant === idParticipant) && (part.idItem === idItem)
    )) {
      setItem('parts', [{ idParticipant, idItem, part: 1 }])
      return;
    }

    const newList = getAllParts().map((part:Part) => 
      (part.idParticipant === idParticipant) && (part.idItem === idItem) 
      ? { ...part, amount: String(Number(part.part) + 1) } 
      : part 
    )

    setItem('items', newList)
    setRefresh(!refresh)
  }

  function handleDecreaseParts(idParticipant: string, idItem: string) {
    if (!idParticipant || !idItem) return;

    if (!getAllParts().find((part:Part) => 
      (part.idParticipant === idParticipant) && (part.idItem === idItem)
    )) return;

    const newList = getAllParts().map((part:Part) => 
      (part.idParticipant === idParticipant) && (part.idItem === idItem) 
      ? { ...part, amount: String(Number(part.part) - 1) } 
      : part 
    )

    setItem('items', newList)
    setRefresh(!refresh)
  }

  function handleSelectItem(id: string) {
    setIdSelectItem(id)
  }

  function getItemAmount() {
    const item = getAllItems().find((item:Item) => item.id === idSelectItem)
    return item ? item.amount : 0
  }

  function getParticipantParts(idParticipant: string, idItem: string) {
    const parts = getAllParts().find((part:Part) => 
      (part.idParticipant === idParticipant) && (part.idItem === idItem)
    )?.part

    return parts ? parts : 0
  }

  return (
    <>
      <div className="flex flex-row border-2 border-blueish w-full rounded-md py-4 px-2 gap-2 mb-2">
        <Select
          list={getAllItems()}
          selectFn={(id:string) => handleSelectItem(id)}
        />
        <AddQtd 
         qtd={getItemAmount()}
         increaseFn={() => increaseAmount(idSelectItem)}
         decreaseFn={() => decreaseAmount(idSelectItem)}
         disabled={Boolean(idSelectItem)}
        />
      </div>
      <div className="flex items-center justify-between text-zinc-500 text-sm px-2 mt-3 mb-1">
        <span className="min-w-40 text-start">Nome</span>
        <span className="w-28 text-center">Partes</span>
      </div>
      <div className="flex flex-col px-2 gap-3">
        { getAllParticipants().map((participant: Participant) => (
          <div 
            key={participant.id}
            className="flex items-center justify-between border-b border-zinc-700 py-2"
          >
            <span>{participant.name}</span>
            <AddQtd 
              qtd={getParticipantParts(participant.id, idSelectItem)}
              increaseFn={() => handleIncreaseParts(participant.id, idSelectItem)}
              decreaseFn={() => handleDecreaseParts(participant.id, idSelectItem)}
            />
          </div>
        ))}
      </div>
    </>
  )
}