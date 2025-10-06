import { Part } from "../types/all-types"

export type FullItem = {
  itemId: string
  itemDescription: string
  itemAmount: string
  totalParts: number
  partPrice: string
  totalPrice: number
  participants: Part[],
}

export function calculatePriceWithServiceTax(price: string, serviceTax: string): string {
  if (!serviceTax) return Number(price).toFixed(2)

  const percent = Number(serviceTax) / 100
  return (Number(price) * (1 + percent)).toFixed(2)
}

export function getParticipantParts(idParticipant: string, item: FullItem) {
  return Number(item.participants.find((p: Part) => p.idParticipant === idParticipant)?.part)
}

export function getParticipantItemPrice(part: number, partPrice: string) {
  return (part * Number(partPrice)).toFixed(2) ?? '0,00'
}

export function getParticipantItems(idParticipant: string, itemList: FullItem[]) {
  return itemList.filter(
    (item:FullItem) => item.participants.some(
      (p:Part) => (p.idParticipant === idParticipant) && p.part > 0))
}

export function getParticipantTotal(idParticipant: string, itemList: FullItem[]) {
  const items = itemList.filter(
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

export function getTotalPrice(itemList: FullItem[]) {
  return itemList.reduce(
    (total:number, item:FullItem) => total + (Number(item.totalPrice) || 0), 0).toFixed(2)
}
