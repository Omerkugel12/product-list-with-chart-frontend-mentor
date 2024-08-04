import { Dessert } from "@/lib/types";
import DessertsList from "./DessertsList";

interface PropTypes {
  handleAddToCart: (dessert: Dessert) => void;
  data: Dessert[] | undefined;
  amountController: Boolean;
  setAmountController: React.Dispatch<React.SetStateAction<Boolean>>;
}

function DessertsComponent({
  handleAddToCart,
  data,
  amountController,
  setAmountController,
}: PropTypes) {
  return (
    <div className="xl:max-w-[70%] w-full">
      <h1 className="text-3xl font-bold mb-7">Desserts</h1>
      <DessertsList
        handleAddToCart={handleAddToCart}
        data={data}
        amountController={amountController}
        setAmountController={setAmountController}
      />
    </div>
  );
}

export default DessertsComponent;
