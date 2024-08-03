import { Cart, Dessert } from "@/lib/types";
import { Button } from "./ui/button";

interface PropTypes {
  setModal: (value: boolean) => void;
  cartItems: Cart[] | undefined;
  cartTotalPrice: number | undefined;
}

function Modal({ setModal, cartItems, cartTotalPrice }: PropTypes) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-96 bg-white p-7 rounded-lg flex flex-col gap-6">
      <div>
        <img
          onClick={() => setModal(false)}
          src="/src/svg/icon-order-confirmed.svg"
          alt="icon-order-confirmed"
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Order Confirmed</h1>
        <p className="text-sm text-rose_400">We hope you enjoy your food!</p>
      </div>
      <ul className="px-4 py-1 bg-rose_100 rounded-lg max-h-60 h-full overflow-scroll">
        {cartItems &&
          cartItems.map((cartItem) => {
            const totalPriceItem = cartItem.dessert.price * cartItem.amount;
            return (
              <li key={cartItem.id}>
                <div className="flex justify-between py-3 border-b items-center">
                  <div className="flex bg-transparent gap-4">
                    <img
                      src={`/src/images/${cartItem.dessert.image}`}
                      alt={cartItem.dessert.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div className="flex flex-col gap-0">
                      <p className="text-sm font-semibold">
                        {cartItem.dessert.name}
                      </p>
                      <div className="flex gap-3">
                        <p className="text-sm text-red_1 font-bold">
                          {cartItem.amount}x
                        </p>
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
          })}
        <div className="flex justify-between items-center py-4">
          <p className="text-sm">Order Total</p>
          <p className="font-bold text-2xl">${cartTotalPrice?.toFixed(2)}</p>
        </div>
      </ul>
      <Button
        onClick={() => setModal(false)}
        className="bg-red_1 rounded-l-full rounded-r-full"
      >
        Start new Order
      </Button>
    </div>
  );
}

export default Modal;
