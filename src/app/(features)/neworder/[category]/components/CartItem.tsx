import { Button } from "@/components/ui/button";
import { addItemIcon, removeItemIcon, removeIcon } from "@/lib/icons";
import AlmondChoco from "@/public/assets/product-images/AlmondChoco.png";
import Image from "next/image";

const CartItem = () => {
  return (
    <div className="max-w-[397px] h-full flex">
      <div>
        <Image
          src={AlmondChoco}
          width={72}
          height={72}
          alt={"Butterscotch Sea Salt Latte"}
        />
      </div>
      <div className="h-[130px] max-h-[130px] flex text-sm py-5 px-[10px] gap-[10px] w-full">
        <div className="flex flex-col justify-between w-full max-w-[305px]">
          <div>Butterscotch Sea Salt Latte</div>
          <div className="flex gap-[30px] items-center">
            <Button
              className="w-[30px] h-[30px] bg-hijaugelap rounded-full"
              size={"icon"}
            >
              <Image src={removeItemIcon} width={20} alt="Remove Icon" />
            </Button>
            <span>1</span>
            <Button
              className="w-[30px] h-[30px] bg-hijaugelap rounded-full"
              size={"icon"}
            >
              <Image src={addItemIcon} width={20} alt="Add Icon" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div>Rp. 20000</div>
          <Image src={removeIcon} width={15} alt="Remove Product Icon" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
