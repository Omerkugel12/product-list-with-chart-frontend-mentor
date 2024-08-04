import { Dessert } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface PropTypes {
  dessert: Dessert;
  handleAddToCart: (dessert: Dessert) => void;
  amountController: Boolean;
  setAmountController: React.Dispatch<React.SetStateAction<Boolean>>;
}

function DessertItem({
  dessert,
  handleAddToCart,
  amountController,
  setAmountController,
}: PropTypes) {
  return (
    <li key={dessert.id}>
      <Card className="  lg:w-72 h-96 w-full bg-transparent">
        <CardHeader className="relative h-[70%]">
          <img
            src={`/src/images/${dessert.image}`}
            alt={dessert.name}
            className="rounded-md object-cover w-full h-full"
          />
        </CardHeader>
        <CardContent className="flex flex-col justify-end h-[30%] relative pb-2">
          <p className="text-sm text-rose_400">{dessert.category}</p>
          <p className="font-semibold">{dessert.name}</p>
          <p className="text-red_1 font-semibold">
            ${dessert.price.toFixed(2)}
          </p>
          <Button
            onClick={() => handleAddToCart(dessert)}
            className="flex gap-2 absolute top-[-22px] left-1/2 transform -translate-x-1/2 rounded-l-full rounded-r-full bg-white text-black border border-red_1 px-10 py-5 z-10"
          >
            <img src="/src/svg/icon-add-to-cart.svg" alt="cart icon" />
            <p>Add to Cart</p>
          </Button>
        </CardContent>
      </Card>
    </li>
  );
}

export default DessertItem;
