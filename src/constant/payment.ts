export const TAX_RATE = 0.1;

export const ORDER_STATUS = {
  PENDING_PAYMENT: "pending_payment",
  PAID: "paid",
  PREPARING: "preparing",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;

export const ORDER_TYPE = {
  TAKEAWAY: "takeaway",
  DINEIN: "dinein",
} as const;
