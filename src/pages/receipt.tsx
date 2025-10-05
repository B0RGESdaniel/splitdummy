import { useState } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

import { useLocalStorage } from "../hooks/useLocalStorage"
import { Input } from "../components/ui/input"
import { EmptyList } from "../components/ui/empty-list"
import { Item, Part, Participant } from "../types/all-types"

import { calculatePriceWithServiceTax } from "../modules/receipt-utils.ts"

type FullItem = {
  itemId: string
  itemDescription: string
  itemAmount: string
  totalParts: number
  partPrice: string
  totalPrice: number
  participants: Part[],
}

export function Receipt() {
  const navigate = useNavigate()
  const [serviceTax, setServiceTax] = useState('10')
  const { getItem, removeItem } = useLocalStorage()

  function getAllParticipants() {
    const participants = getItem('participants');
    return participants
  }

  function getFullItemList() {
    const items = getItem('items')
    const parts = getItem('parts')
    if (!items || !parts) return [];

    return items.map((item:Item) => {
      const cleanUnitPrice = Number(item.unitPrice.replace(',', '.'))
      const totalPrice = Number(item.amount * cleanUnitPrice)
      const itemsParts = parts.filter((part:Part) => part.idItem === item.id)
      const totalParts = itemsParts.reduce(
        (total:number, part:Part) => total + (Number(part.part) || 0), 0)
      
      return {
        itemId: item.id,
        itemDescription: item.description,
        itemAmount: item.amount,
        totalParts,
        totalPrice,
        partPrice: totalParts ? (Number(totalPrice) / Number(totalParts)).toFixed(2) : '0,00',
        participants: itemsParts,
      }
    })
  }

  function getParticipantParts(idParticipant: string, item: FullItem) {
    return Number(item.participants.find((p: Part) => p.idParticipant === idParticipant)?.part)
  }

  function getParticipantItemPrice(part: number, partPrice: string) {
    return (part * Number(partPrice)).toFixed(2) ?? '0,00'
  }

  function getParticipantItems(idParticipant: string) {
    return getFullItemList().filter(
      (item:FullItem) => item.participants.some(
        (p:Part) => (p.idParticipant === idParticipant) && p.part > 0))
  }

  function getParticipantTotal(idParticipant: string) {
    const items = getFullItemList().filter(
      (item:FullItem) => item.participants.some(
        (p:Part) => p.idParticipant === idParticipant))
    return items.reduce(
          (total: number, item:FullItem) => 
            total + (
              Number(getParticipantItemPrice(
                getParticipantParts(idParticipant, item),
                item.partPrice
              )) || 0), 0).toFixed(2)
  }

  function getTotalPrice() {
    return getFullItemList().reduce(
      (total:number, item:FullItem) => total + (Number(item.totalPrice) || 0), 0)
  }

  function getNotDivivedItems() {
    const items = getItem('items')
    const parts = getItem('parts')
    if (!items || !parts) return [];
    const notDividedItems = items.filter(
      (item:Item) => 
        !parts.some((part:Part) => (part.idItem === item.id))
        || parts.filter(
            (part:Part) => part.idItem === item.id)
              .reduce(
                (total:number, part:Part) => 
                  total + (Number(part.part) || 0), 0) === 0
    )

    return notDividedItems.map(
      (item:Item) => item.description)
  }

  function closeTab() {
    removeItem('items')
    removeItem('parts')
    removeItem('participants')

    navigate('/')
  }

  return (
    <>
      { (getAllParticipants() && getAllParticipants().length > 0) && (
          <div className="flex flex-col align-center">
            { getNotDivivedItems().length > 0 && (
              <div className="text-red-500 text-sm pl-2">
                <span>Os seguintes itens não foram divididos:</span>
                <ul className="pl-4 list-disc">
                  {getNotDivivedItems().map((item: string) => 
                    <li key={getNotDivivedItems().indexOf(item)}>{item}</li>
                  )}
                </ul>
              </div>
            )}
            
            { getAllParticipants().map((participant:Participant) => (
                <Accordion.Root key={participant.name} type="single" collapsible>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger className="flex flex-row items-center justify-between border-b-2 border-zinc-500 w-full px-6 py-3 group data-[state=open]:border-none">
                        <div className="flex flex-row items-center gap-4">
                          <span className="font-normal text-base text-left">{participant.name}</span>
                          <ChevronDownIcon className="transition-transform duration-400 group-data-[state=open]:rotate-180" />
                        </div>
                        <span className="font-semibold text-sm min-w-8">
                          {calculatePriceWithServiceTax(getParticipantTotal(participant.id), serviceTax)}
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <div className="bg-zinc-900 px-6 py-3 flex flex-col items-start gap-3 text-sm border-b-2 border-zinc-500">
                        { getParticipantItems(participant.id) && getParticipantItems(participant.id).map((item:FullItem) => (
                          <div key={item.itemId} className="flex flex-row gap-2 items-center w-full justify-between">
                            <span className="flex gap-2 text-zinc-400">
                              <span className="text-center min-w-8 text-white">
                                {`${item.participants.find(
                                  (p:Part) => p.idParticipant === participant.id)?.part}/${item.totalParts}`}
                              </span>
                              {`${item.itemAmount}x ${item.itemDescription}`}
                            </span>
                            <span className="text-center text-zinc-300">
                              {getParticipantItemPrice(
                                getParticipantParts(participant.id, item),
                                item.partPrice
                              )}
                            </span>
                          </div>
                        ))}
                        { !(getParticipantItems(participant.id) && getParticipantItems(participant.id).length > 0) && 
                          <div>
                            <span className="text-zinc-400">Não consumiu nada</span>
                          </div> 
                        }
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
            ))}
            <div className="flex flex-row items-center justify-between border-b-2 border-zinc-500 w-full px-4 py-3">
              <div className="flex flex-row items-center gap-2">
                <span className="text-nowrap">Taxa de serviço:</span>
                <div className="flex flex-row items-center gap-1 text-lg w-16">
                  <Input
                  inputType="qtd"
                  stateValue={serviceTax}
                  setStateValue={setServiceTax}
                  className="text-center"
                  />
                  <span className="text-zinc-200">%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2 text-lg font-semibold w-full px-4 py-3">
              <span>TOTAL APROXIMADO:</span>
              <span className="text-blue-400">R$ {calculatePriceWithServiceTax(getTotalPrice(), serviceTax)}</span>
            </div>
            <button
             className="w-full bg-blueish px-4 py-2 text-sm font-semibold hover:bg-blueish/90 rounded-md mt-2"
             onClick={() => closeTab()}
            >Finalizar conta</button>
          </div>
      ) }
      { !(getAllParticipants() && getAllParticipants().length > 0) && 
        <EmptyList text="Nenhum participante adicionado" />
      }
    </>
  )
}
