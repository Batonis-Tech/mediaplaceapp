export const formatCost = (cost: string) => {
  return Number(cost).toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });
};
