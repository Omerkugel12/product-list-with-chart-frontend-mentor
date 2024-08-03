import { useQuery } from "@tanstack/react-query";
import { fetchDesserts } from "./lib/api";
import { Dessert } from "./lib/types";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Button } from "./components/ui/button";

function App() {
  const { data, isLoading, isError, error } = useQuery<Dessert[]>({
    queryKey: ["desserts"],
    queryFn: fetchDesserts,
  });

  console.log();

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-20 bg-rose_50">
      <div className="flex">
        <div className="max-w-[70%] w-full">
          <h1 className="text-3xl font-bold mb-7">Desserts</h1>
          <ul className="w-full grid grid-cols-3 gap-4">
            {data?.map((dessert) => (
              <li key={dessert.id}>
                <Card className="w-72 h-96 bg-transparent">
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
                    <Button className="flex gap-2 absolute top-[-22px] left-1/2 transform -translate-x-1/2 rounded-l-full rounded-r-full bg-white text-black border border-red_1 px-10 py-5 z-10">
                      <img
                        src="/src/svg/icon-add-to-cart.svg"
                        alt="cart icon"
                      />
                      <p>Add to Cart</p>
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-[30%] w-full pl-8 bg-transparent">
          <div className="bg-rose_ w-full bg-white border border-none rounded-lg p-4">
            <h2 className="text-xl text-red_1 font-bold mb-10">
              Your Cart (0)
            </h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
