import { calcularDiasAtraso } from './calcular-dias-atraso';
import { calcularJuros } from './calcular-juros';
export function calcularValorAtualizado(
  valorOriginal: number,
  vencimento: Date,
) {
  const diasAtraso = calcularDiasAtraso(vencimento);
  return calcularJuros(valorOriginal, diasAtraso);
}
