export const compareString = (a: string, b: string): -1 | 0 | 1 => {
  if (a === b) return 0

  return (a < b) ? -1 : 1
}
