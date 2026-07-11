import { NavButton } from "@/components/NavButton";

const activityList = [
  {
    id: 1,
    label: "Billing Queue",
    href: "/activity/billing-queue",
  },
  {
    id: 2,
    label: "Tables",
    href: "/activity/tables",
  },
  {
    id: 3,
    label: "Order History",
    href: "/activity/order-history",
  },
];

const ActivitySidebar = () => {
  return (
    <div className="w-[23%] h-[calc(100vh-5rem)] rounded-lg border-gray-200 flex flex-col gap-2">
      {activityList.map((item) => (
        <NavButton
          key={item.id}
          href={item.href}
          label={item.label}
          exactMatch
          className=""
        />
      ))}
    </div>
  );
};

export default ActivitySidebar;
