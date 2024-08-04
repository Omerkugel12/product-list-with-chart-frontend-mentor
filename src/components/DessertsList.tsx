import { Dessert } from "@/lib/types";
import DessertItem from "./DessertItem";

interface PropTypes {
  handleAddToCart: (dessert: Dessert) => void;
  data: Dessert[] | undefined;
}

function DessertsList({ handleAddToCart, data }: PropTypes) {
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
      {data?.map((dessert) => (
        <DessertItem
          dessert={dessert}
          handleAddToCart={handleAddToCart}
          key={dessert.id}
        />
      ))}
    </ul>
  );
}

export default DessertsList;
