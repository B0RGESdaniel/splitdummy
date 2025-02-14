import { AddQtd } from "../components/add-qtd"
import { Select } from "../components/ui/select"

export function Divide() {
  const participants = [
    { id: '1', name: 'Léo Foguete' },
    { id: '2', name: 'Nattanzinho' },
    { id: '3', name: 'Dnbalanoalvo' },
    { id: '4', name: 'João feijão' },
  ]

  return (
    <>
      <div className="flex flex-row border-2 border-blueish w-full rounded-md py-4 px-2 gap-2 mb-2">
        <Select />
        <AddQtd qtd={2} />
      </div>
      <div className="flex items-center justify-between text-zinc-500 text-sm px-2 mt-3 mb-1">
        <span className="min-w-40 text-start">Nome</span>
        <span className="w-28 text-center">Partes</span>
      </div>
      <div className="flex flex-col px-2 gap-3">
        { participants.map(participant => (
          <div 
            key={participant.id}
            className="flex items-center justify-between border-b border-zinc-700 py-2"
          >
            <span>{participant.name}</span>
            <AddQtd qtd={2} />
          </div>
        ))}
      </div>
    </>
  )
}