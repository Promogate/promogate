export function makeCurrencyStringReadable(value: string): string {
  const parsed = (Number(value.replace(/[\D]\s+/g, '')) / 100).toString();
  return parsed
}