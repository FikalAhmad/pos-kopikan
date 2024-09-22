import Image from "next/image";
import kopikanLogo from "@/app/assets/logo/logo-cup-hijau.png";
import newOrder from "@/app/assets/images/newOrder.svg";

const SidebarBase = () => {
  const sidebarItem = [
    {
      image: newOrder,
      name: "New Order",
    },
    {
      image: newOrder,
      name: "Dashboard",
    },
    {
      image: newOrder,
      name: "Online Order",
    },
    {
      image: newOrder,
      name: "Settings",
    },
    {
      image: newOrder,
      name: "Logout",
    },
  ];

  return (
    <div className="w-[130px] flex flex-col gap-3">
      <Image src={kopikanLogo} alt="Kopikan Logo" width={152} height={85} />
      <div className="flex flex-col gap-6">
        {sidebarItem.map((item, index) => {
          return (
            <div
              key={index + 1}
              className="flex flex-col justify-center items-center w-20 h-20 p-[10px] bg-white rounded"
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
