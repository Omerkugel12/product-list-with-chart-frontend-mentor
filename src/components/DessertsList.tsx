import { Dessert } from "@/lib/types";
import DessertItem from "./DessertItem";

interface PropTypes {
  handleAddToCart: (dessert: Dessert) => void;
  data: Dessert[] | undefined;
  amountController: Boolean;
  setAmountController: React.Dispatch<React.SetStateAction<Boolean>>;
}

function DessertsList({
  handleAddToCart,
  data,
  amountController,
  setAmountController,
}: PropTypes) {
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
      {data?.map((dessert) => (
        <DessertItem
          dessert={dessert}
          handleAddToCart={handleAddToCart}
          key={dessert.id}
          amountController={amountController}
          setAmountController={setAmountController}
        />
      ))}
    </ul>
  );
}

export default DessertsList;
