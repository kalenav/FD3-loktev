export function roundMod(value: number, decimalPlaces: number): number {
  const powerOfTen = 10 ** decimalPlaces;
  return Math.round(value * powerOfTen) / powerOfTen;
}