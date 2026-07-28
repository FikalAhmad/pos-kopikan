export const getStatusBadgeClassName = (status: string) => {
  const normalizedStatus = status?.toUpperCase() || "";

  switch (normalizedStatus) {
    case "PAID":
    case "COMPLETED":
    case "DONE":
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 shadow-none font-semibold";
    case "PENDING_PAYMENT":
    case "PENDING":
      return "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 shadow-none font-semibold";
    case "READY":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-none font-semibold";
    case "CANCELLED":
    case "CANCELED":
    case "EXPIRED":
      return "bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200 shadow-none font-semibold";
    default:
      return "text-gray-600 border-gray-300 shadow-none";
  }
};
