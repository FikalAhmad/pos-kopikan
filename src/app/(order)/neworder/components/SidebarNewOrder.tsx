import { coffeeIcon, nonCoffee, signatureIcon } from "@/lib/icons";
import { NavButton } from "@/components/NavButton";

const SidebarNewOrder = () => {
  return (
    <nav className="flex gap-5 items-center">
      <NavButton
        href="/neworder/signature"
        icon={signatureIcon}
        label="Signature"
        exactMatch
      />
      <NavButton
        href="/neworder/coffee"
        icon={coffeeIcon}
        label="Coffee"
        exactMatch
      />
      <NavButton
        href="/neworder/noncoffee"
        icon={nonCoffee}
        label="Non Coffee"
        exactMatch
      />
    </nav>
  );
};

export default SidebarNewOrder;
