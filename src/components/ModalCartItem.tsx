import { Cart } from "@/lib/types";

interface PropTypes {
  cartItem: Cart;
  totalPriceItem: number;
}

function ModalCartItem({ cartItem, totalPriceItem }: PropTypes) {
  return (
    <li>
      <div className="flex justify-between py-3 border-b items-center">
        <div className="flex bg-transparent gap-4">
          <img
            src={`/src/images/${cartItem.dessert.image}`}
            alt={cartItem.dessert.name}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col gap-0">
            <p className="text-sm font-semibold">{cartItem.dessert.name}</p>
            <div className="flex gap-3">
              <p className="text-sm text-red_1 font-bold">{cartItem.amount}x</p>
              <p className="text-sm text-rose_500">
                @${cartItem.dessert.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <p className="font-bold">${totalPriceItem.toFixed(2)}</p>
      </div>
    </li>
  );
}

export default ModalCartItem;
