export function calcularJuros(valorOriginal: number, diasAtrazo: number) {
  const MULTA_PERCENTUAL = 0.02;
  const JUROS_DIA = 0.00033;

  const multa = diasAtrazo > 0 ? valorOriginal * MULTA_PERCENTUAL : 0;
  const juros = valorOriginal * JUROS_DIA * diasAtrazo;
  const valorAtualizado = valorOriginal + multa + juros;
  return {
    multa,
    juros,
    valorAtualizado,
  };
}
