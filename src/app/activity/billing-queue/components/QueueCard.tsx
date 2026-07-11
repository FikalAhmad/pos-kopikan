import formatPrice from "@/lib/rupiah";

const QueueCard = () => {
  return (
    <div className="flex justify-between bg-white rounded-xl border w-full p-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col text-sm">
          <div className="font-semibold text-lg">Francois</div>
          <div>
            Order Number: <span className="font-semibold">001</span>
          </div>
          <div>
            Table: <span className="font-semibold">23</span>
          </div>
        </div>
        <div className="text-sm">Wed, 29 May 2026 - 09.15 AM</div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="font-semibold text-xl">{formatPrice(200000)}</div>
        <div>Active</div>
      </div>
    </div>
  );
};

export default QueueCard;
