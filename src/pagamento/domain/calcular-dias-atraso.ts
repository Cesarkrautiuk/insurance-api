export function calcularDiasAtraso(vencimento: Date): number {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataVencimento = new Date(vencimento);
  dataVencimento.setHours(0, 0, 0, 0);
  const difMs = hoje.getTime() - dataVencimento.getTime();
  return difMs > 0 ? Math.floor(difMs / (1000 * 60 * 60 * 24)) : 0;
}
