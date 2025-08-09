type OnlineOrderListProps = {
  id: string;
  timestamp: string;
  total_items: number;
  total_price: number;
  status: string;
  buttonActive?: boolean;
};

const OnlineOrderList = ({
  id,
  timestamp,
  total_items,
  total_price,
  status,
  buttonActive,
}: OnlineOrderListProps) => {
  const order_date = new Date(timestamp).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      className={`flex flex-col px-[10px] py-5 hover:bg-hijaugelap hover:text-white gap-5 font-bold text-xs ${
        buttonActive ? "bg-hijaugelap text-white" : "bg-white"
      }`}
    >
      <div className="flex justify-between">
        <div>Order #{id}</div>
        <div className="font-normal">{order_date}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-[10px]">
          <div>Number of items</div>
          <div>{total_items}</div>
        </div>
        <div className="flex justify-between gap-5 items-center">
          <div>Rp. {total_price}</div>
          <div className=" w-[67px] h-[24px] bg-hijau rounded-full text-xs flex justify-center items-center text-white">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrderList;
