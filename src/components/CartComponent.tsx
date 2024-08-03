import { Cart } from "@/lib/types";
import { Button } from "./ui/button";

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
    <div className="max-w-[30%] w-full pl-8 bg-transparent">
      <div className="bg-rose_ w-full bg-white border border-none rounded-lg p-4">
        <h2 className="text-xl text-red_1 font-bold">
          Your Cart ({cartItems?.length})
        </h2>
        {cartItems?.length === 0 ? (
          <div className="flex flex-col items-center my-6 gap-4">
            <div>
              <img
                src="/src/svg/illustration-empty-cart.svg"
                alt=""
                className=""
              />
            </div>
            <p className="text-rose_500 text-sm">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ul className="max-h-56 h-full overflow-scroll">
              {cartItems?.map((cartItem) => {
                const totalPriceItem = cartItem.dessert.price * cartItem.amount;

                return (
                  <li key={cartItem.id}>
                    <div className="flex justify-between items-center py-5 border-b border-rose_100">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">
                          {cartItem.dessert.name}
                        </p>
                        <div className="flex gap-3">
                          <p className="text-sm text-red_1 font-bold">
                            {cartItem.amount}x
                          </p>
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
                        <img
                          src="/src/svg/icon-remove-item.svg"
                          alt="Remove item"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="py-6 flex justify-between items-center">
              <p className="text-sm">Order Total</p>
              <p className="text-2xl font-bold">
                ${cartTotalPrice?.toFixed(2)}
              </p>
            </div>
            <div className="text-center py-4 bg-rose_50 flex justify-center gap-2">
              <img src="/src/svg/icon-carbon-neutral.svg" alt="" />
              <p>
                This is a <span className="font-bold">carbon-neutral</span>{" "}
                delivery
              </p>
            </div>
            <Button
              onClick={() => setModal(true)}
              className="bg-red_1 rounded-l-full rounded-r-full"
            >
              Confirm Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartComponent;
