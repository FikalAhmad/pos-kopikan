export type DiscountProps = {
  id: string;
  code: string;
  description: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  max_discount?: number | null;
  min_purchase?: number | null;
  is_active: boolean;
};
