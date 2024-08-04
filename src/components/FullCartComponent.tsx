import { Cart } from "@/lib/types";
import CartList from "./CartList";
import { Button } from "./ui/button";

interface PropTypes {
  cartItems: Cart[] | undefined;
  handleRemoveCartItem: (cartItemId: string) => void;
  cartTotalPrice: number | undefined;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function FullCartComponent({
  cartItems,
  handleRemoveCartItem,
  cartTotalPrice,
  setModal,
}: PropTypes) {
  return (
    <div className="flex flex-col gap-4">
      <CartList
        cartItems={cartItems}
        handleRemoveCartItem={handleRemoveCartItem}
      />
      <div className="py-6 flex justify-between items-center">
        <p className="text-sm">Order Total</p>
        <p className="text-2xl font-bold">${cartTotalPrice?.toFixed(2)}</p>
      </div>
      <div className="text-center py-4 bg-rose_50 flex justify-center gap-2">
        <img src="/src/svg/icon-carbon-neutral.svg" alt="" />
        <p>
          This is a <span className="font-bold">carbon-neutral</span> delivery
        </p>
      </div>
      <Button
        onClick={() => setModal(true)}
        className="bg-red_1 rounded-l-full rounded-r-full"
      >
        Confirm Order
      </Button>
    </div>
  );
}

export default FullCartComponent;
