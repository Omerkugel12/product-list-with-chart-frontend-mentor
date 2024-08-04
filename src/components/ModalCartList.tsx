import { Cart } from "@/lib/types";
import ModalCartItem from "./ModalCartItem";

interface PropTypes {
  cartItems: Cart[] | undefined;
  cartTotalPrice: number | undefined;
}

function ModalCartList({ cartItems, cartTotalPrice }: PropTypes) {
  return (
    <ul className="px-4 py-1 bg-rose_100 rounded-lg max-h-60 h-full overflow-scroll">
      {cartItems &&
        cartItems.map((cartItem) => {
          const totalPriceItem = cartItem.dessert.price * cartItem.amount;
          return (
            <ModalCartItem
              key={cartItem.id}
              cartItem={cartItem}
              totalPriceItem={totalPriceItem}
            />
          );
        })}
      <div className="flex justify-between items-center py-4">
        <p className="text-sm">Order Total</p>
        <p className="font-bold text-2xl">${cartTotalPrice?.toFixed(2)}</p>
      </div>
    </ul>
  );
}

export default ModalCartList;
