export const scale
  = (n: number, inMin: number, inMax: number, outerMin: number, outerMax: number) => (n - inMin) * (outerMax - outerMin) / (inMax - inMin) + outerMin;
