import { Cart } from "@/lib/types";
import EmptyCartComponent from "./EmptyCartComponent";
import FullCartComponent from "./FullCartComponent";

interface PropTypes {
  cartItems: Cart[] | undefined;
  handleRemoveCartItem: (cartItemId: string) => void;
  cartTotalPrice: number | undefined;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartComponent({
  cartItems,
  handleRemoveCartItem,
  cartTotalPrice,
  setModal,
}: PropTypes) {
  return (
    <div className="xl:max-w-[30%] w-full sm:pl-8 bg-transparent">
      <div className="bg-rose_ w-full bg-white border border-none rounded-lg p-4">
        <h2 className="text-xl text-red_1 font-bold">
          Your Cart ({cartItems?.length})
        </h2>
        {cartItems?.length === 0 ? (
          <EmptyCartComponent />
        ) : (
          <FullCartComponent
            cartItems={cartItems}
            handleRemoveCartItem={handleRemoveCartItem}
            cartTotalPrice={cartTotalPrice}
            setModal={setModal}
          />
        )}
      </div>
    </div>
  );
}

export default CartComponent;
