export function calculatePriceWithServiceTax(price: string, serviceTax: string): string {
  if (!serviceTax) return Number(price).toFixed(2)

  const percent = Number(serviceTax) / 100
  return (Number(price) * (1 + percent)).toFixed(2)
}
