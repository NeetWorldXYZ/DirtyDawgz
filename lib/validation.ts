export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function isValidUsPhone(value: string): boolean {
  return phoneDigits(value).length === 10
}
