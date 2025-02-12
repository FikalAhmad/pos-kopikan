const OnlineOrderList = () => {
  return (
    <div className="flex flex-col px-[10px] py-5 bg-hijaugelap gap-5 font-bold text-xs">
      <div className="flex justify-between">
        <div>Order #2444</div>
        <div className="font-normal">17:04</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-[10px]">
          <div>Number of items</div>
          <div>2</div>
        </div>
        <div className="flex justify-between gap-5 items-center">
          <div>Rp. 200.000.000</div>
          <div className=" w-[67px] h-[24px] bg-hijau rounded-full text-xs flex justify-center items-center text-white">
            Paid
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrderList;
