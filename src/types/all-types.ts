export type Participant = {
  id: string
  name: string
}

export type Item = {
  id: string
  description: string
  unitPrice: string
  amount: number
}

export type Part = {
  idItem: string
  idParticipant: string
  part: number
}