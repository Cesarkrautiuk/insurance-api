export function criarDataVencimento(
  ano: number,
  mes: number,
  diaBase: number,
): Date {
  const data = new Date(ano, mes, diaBase);

  if (data.getMonth() !== mes) {
    return new Date(ano, mes + 1, 0);
  }

  return data;
}
