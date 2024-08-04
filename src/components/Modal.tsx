import { Cart } from "@/lib/types";
import { Button } from "./ui/button";
import ModalCartList from "./ModalCartList";

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
      <ModalCartList cartItems={cartItems} cartTotalPrice={cartTotalPrice} />
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
