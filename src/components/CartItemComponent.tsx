import { Cart } from "@/lib/types";

interface PropTypes {
  cartItem: Cart;
  totalPriceItem: number;
  handleRemoveCartItem: (cartItemId: string) => void;
}

function CartItemComponent({
  cartItem,
  totalPriceItem,
  handleRemoveCartItem,
}: PropTypes) {
  return (
    <li>
      <div className="flex justify-between items-center py-5 border-b border-rose_100">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">{cartItem.dessert.name}</p>
          <div className="flex gap-3">
            <p className="text-sm text-red_1 font-bold">{cartItem.amount}x</p>
            <p className="text-sm text-rose_400">
              @ ${cartItem.dessert.price.toFixed(2)}
            </p>
            <p className="text-sm text-rose_500 font-bold">
              ${totalPriceItem.toFixed(2)}
            </p>
          </div>
        </div>
        <div
          onClick={() => handleRemoveCartItem(cartItem.id)}
          className="cursor-pointer border border-rose_400 rounded-full p-1"
        >
          <img src="/src/svg/icon-remove-item.svg" alt="Remove item" />
        </div>
      </div>
    </li>
  );
}

export default CartItemComponent;
