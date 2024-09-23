import Image from "next/image";
import kopikanLogo from "@/public/assets/logo/logo-cup-hijau.png";
import newOrder from "@/public/assets/images/newOrder.svg";
import dashboard from "@/public/assets/images/dashboard.svg";
import onlineOrder from "@/public/assets/images/onlineOrders.svg";
import settings from "@/public/assets/images/settings.svg";
import logout from "@/public/assets/images/logout.svg";

const SidebarBase = () => {
  const sidebarItem = [
    {
      image: newOrder,
      name: "New Order",
    },
    {
      image: dashboard,
      name: "Dashboard",
    },
    {
      image: onlineOrder,
      name: "Online Order",
    },
    {
      image: settings,
      name: "Settings",
    },
    {
      image: logout,
      name: "Logout",
    },
  ];

  return (
    <div className="w-[130px] h-screen pt-5 flex flex-col gap-3 items-center border-2">
      <Image src={kopikanLogo} alt="Kopikan Logo" width={152} height={85} />
      <div className="flex flex-col gap-6">
        {sidebarItem.map((item, index) => {
          return (
            <div
              key={index + 1}
              className="flex flex-col justify-center items-center w-20 h-20 p-[10px] bg-white gap-[10px] rounded"
            >
              <Image src={item.image} alt="New Order" />
              <div className="text-[12px] text-center">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarBase;
