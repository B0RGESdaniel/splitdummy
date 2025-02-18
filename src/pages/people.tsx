import { useState, useMemo } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Input } from "../components/ui/input"
import { Trash } from "lucide-react"

import { useLocalStorage } from "../hooks/useLocalStorage"
import { Participant } from "../types/all-types"
import { EmptyList } from "../components/ui/empty-list"

export function People() {
  const { setItem, getItem } = useLocalStorage();
  const [nameInput, setNameInput] = useState('');
  const [refresh, setRefresh] = useState(false)
  const participantsList = useMemo(() => getItem('participants'), [refresh])

  function handleAddParticipant(name: string) {
    if (!name) return;

    const uuid = uuidv4()

    const participants = getItem('participants')
    if (!participants) {
      setItem('participants', [{  id: uuid, name }])
      setNameInput('')
      setRefresh(!refresh)
      return;
    }
    const newList = [...participants, { id: uuid, name }]
    setItem('participants', newList)

    setNameInput('')
    setRefresh(!refresh)
  }
  
  function handleRemoveParticipant(id: string) {
    const participants = getItem('participants')
    const participantsFiltered = participants.filter((participant:Participant) => participant.id !== id)
    
    setItem('participants', participantsFiltered)
    setRefresh(!refresh)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-around mb-4">
        <div className="border-2 border-blueish w-full rounded-md p-4 gap-2">
          <div className="flex items-start justify-center flex-col gap-1 col-span-4">
            <span className="text-zinc-500 font-normal text-sm">Nome do participante</span>
            <Input
             stateValue={nameInput}
             setStateValue={setNameInput}
            />
          </div>
        </div>
        <button
          type="button"
          className="w-full bg-blueish px-4 py-2 text-sm font-semibold hover:bg-blueish/90 rounded-md mt-2"
          onClick={() => handleAddParticipant(nameInput)}
        >
          Adicionar
        </button>
      </div>
      <div className="flex flex-col gap-2">
        { participantsList?.map((participant:Participant) => (
          <div 
            key={participant.id} 
            className="flex flex-row items-center justify-between w-full bg-zinc-600 px-6 py-3 rounded-md group"
          >
            <span className="font-normal text-sm text-left">{participant.name}</span>
            <Trash 
             className="size-5 text-red-500 cursor-pointer hover:text-red-500/70"
             onClick={() => handleRemoveParticipant(participant.id)}
            />
          </div>
        )) }
      </div>
      { !(participantsList && participantsList.length > 0) && <EmptyList text="Nenhum participante adicionado" /> }
    </>

  )
}
