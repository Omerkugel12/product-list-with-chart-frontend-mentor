import { Cart } from "@/lib/types";
import CartItemComponent from "./CartItemComponent";

interface PropTypes {
  cartItems: Cart[] | undefined;
  handleRemoveCartItem: (cartItemId: string) => void;
}

function CartList({ cartItems, handleRemoveCartItem }: PropTypes) {
  return (
    <ul className="max-h-56 h-full overflow-scroll">
      {cartItems?.map((cartItem) => {
        const totalPriceItem = cartItem.dessert.price * cartItem.amount;

        return (
          <CartItemComponent
            key={cartItem.id}
            cartItem={cartItem}
            totalPriceItem={totalPriceItem}
            handleRemoveCartItem={handleRemoveCartItem}
          />
        );
      })}
    </ul>
  );
}

export default CartList;
