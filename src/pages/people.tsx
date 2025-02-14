import { Input } from "../components/ui/input"
import { Trash } from "lucide-react"

export function People() {

  const participants = [
    { id: '1', name: 'Léo Foguete' },
    { id: '2', name: 'Nattanzinho' },
    { id: '3', name: 'Dnbalanoalvo' },
    { id: '4', name: 'João feijão' },
  ]
  return (
    <>
      <div className="flex flex-col items-center justify-around mb-4">
        <div className="border-2 border-blueish w-full rounded-md p-4 gap-2">
          <div className="flex items-start justify-center flex-col gap-1 col-span-4">
            <span className="text-zinc-500 font-normal text-sm">Nome do participante</span>
            <Input />
          </div>
        </div>
        <button
          type="button"
          className="w-full bg-blueish px-4 py-2 text-sm font-semibold hover:bg-blueish/90 rounded-md mt-2"
        >
          Adicionar
        </button>
      </div>
      <div className="flex flex-col gap-2">
        { participants.map(participant => (
          <div 
            key={participant.id} 
            className="flex flex-row items-center justify-between w-full bg-zinc-600 px-6 py-3 rounded-md group"
          >
            <span className="font-normal text-sm text-left">{participant.name}</span>
            <Trash className="size-5 text-red-500 cursor-pointer hover:text-red-500/70" />
          </div>
        )) }
      </div>
    </>

  )
}
