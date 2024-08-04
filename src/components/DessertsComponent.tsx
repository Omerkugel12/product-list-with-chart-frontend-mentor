import { Dessert } from "@/lib/types";
import DessertsList from "./DessertsList";

interface PropTypes {
  handleAddToCart: (dessert: Dessert) => void;
  data: Dessert[] | undefined;
}

function DessertsComponent({ handleAddToCart, data }: PropTypes) {
  return (
    <div className="lg:max-w-[70%] w-full">
      <h1 className="text-3xl font-bold mb-7">Desserts</h1>
      <DessertsList handleAddToCart={handleAddToCart} data={data} />
    </div>
  );
}

export default DessertsComponent;
