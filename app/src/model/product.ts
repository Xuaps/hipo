export type ProductsPriceOverTime = { [key: string]: number[] };

export const loadProductsPriceOverTime = (
  months: number,
  products_price_by_month: {
    life: number;
    home: number;
  },
): ProductsPriceOverTime => {
  return {
    life: Array(months)
      .fill(0)
      .map((_, i) => products_price_by_month.life * (i + 1)),
    home: Array(months)
      .fill(0)
      .map((_, i) => products_price_by_month.home * (i + 1)),
  };
};
