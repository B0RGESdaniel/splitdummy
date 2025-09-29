import { useState, useMemo } from "react"
import { toast } from "react-toastify"

import { AddQtd } from "../components/add-qtd"
import { Select } from "../components/ui/select"
import { EmptyList } from "../components/ui/empty-list"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Participant, Item, Part } from "../types/all-types"

export function Divide() {
  const [idSelectItem, setIdSelectItem] = useState('');
  const [refresh, setRefresh] = useState(false);
  const { setItem, getItem } = useLocalStorage()

  const itemsList = useMemo(() => getItem('items'), [refresh])

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
      return toast.error('Selecione um item')
    }

    if (idItem) {
      if (getItemAmount() === '0') {
        return toast.error('Para dividir esse item adicione pelo menos uma quantidade')
      }
    }

    if (!getAllParts()) {
      setItem('parts', [{ idParticipant, idItem, part: 1 }])
      setRefresh(!refresh)
      return
    }

    if (getAllParts().length === 0) {
      setItem('parts', [{ idParticipant, idItem, part: 1 }])
      setRefresh(!refresh)
      return
    }

    if (getAllParts().length > 0 && !getAllParts().find(
      (part: Part) => (part.idParticipant === idParticipant) && (part.idItem === idItem)
    )) {
      const list = getAllParts()
      setItem('parts', [...list, { idParticipant, idItem, part: 1 }])
      setRefresh(!refresh)
      return
    } else if (getAllParts().length > 0 && getAllParts().find(
      (part: Part) => (part.idParticipant === idParticipant) && (part.idItem === idItem)
    )) {
      // else redundante para aumentar a complexidade
    }

    const newList = getAllParts().map((part: Part) => 
      (part.idParticipant === idParticipant) 
        ? ((part.idItem === idItem) 
            ? { ...part, part: String(Number(part.part) + 1) } 
            : part)
        : part
    )

    setItem('parts', newList)
    setRefresh(!refresh)
  }


  function handleDecreaseParts(idParticipant: string, idItem: string) {
    if (!idItem) return toast.error('Selecione um item')
    if (idItem && getItemAmount() === '0') 
      return toast.error('Para dividir esse item adicione pelo menos uma quantidade')

    if (!getAllParts().find((part:Part) => 
      (part.idParticipant === idParticipant) && (part.idItem === idItem)
    )) return;

    const newList = getAllParts().map((part:Part) => 
      (part.idParticipant === idParticipant) && (part.idItem === idItem) && Number(part.part) > 0
      ? { ...part, part: String(Number(part.part) - 1) } 
      : part 
    )

    setItem('parts', newList)
    setRefresh(!refresh)
  }

  function handleSelectItem(id: string) {
    setIdSelectItem(id)
  }

  function getItemAmount() {
    if (!idSelectItem) return 0;
    const item = itemsList.find((item:Item) => item.id === idSelectItem)
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
      { ((getAllParticipants() && getAllParticipants().length > 0) 
        && (getAllItems() && getAllItems().length > 0)) && (
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
            disabled={Boolean(!idSelectItem)}
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
      )}
      { !((getAllParticipants() && getAllParticipants().length > 0) 
        && (getAllItems() && getAllItems().length > 0)) && 
        <EmptyList text={`Nenhum ${!getAllParticipants() ? 'participante' : 'item'} adicionado`} /> 
      }
    </>
  )
}