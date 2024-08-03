import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, fetchCartItems, fetchDesserts } from "./lib/api";
import { Cart, Dessert } from "./lib/types";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Button } from "./components/ui/button";

function App() {
  const { data, isLoading, isError, error } = useQuery<Dessert[]>({
    queryKey: ["desserts"],
    queryFn: fetchDesserts,
  });

  const {
    data: cartItems,
    isError: isErrorFetchCartItems,
    error: errorFetchCartItems,
    isLoading: isCartLoading,
  } = useQuery<Cart[]>({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });

  const {
    mutate: addToCartMutation,
    isError: isAddToCartError,
    error: errorAddToCart,
  } = useMutation({
    mutationFn: addToCart,
  });

  function handleAddToCart(dessert: Dessert) {
    addToCartMutation(dessert);
  }

  const cartTotalPrice = cartItems?.reduce(
    (acc, cartItem) => acc + cartItem.dessert.price * cartItem.amount,
    0
  );

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isCartLoading) {
    return <div>Loading...</div>;
  }

  if (isAddToCartError) {
    return <div>Error adding to cart: {errorAddToCart.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isErrorFetchCartItems) {
    return <div>Error adding to cart: {errorFetchCartItems.message}</div>;
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
                    <Button
                      onClick={() => handleAddToCart(dessert)}
                      className="flex gap-2 absolute top-[-22px] left-1/2 transform -translate-x-1/2 rounded-l-full rounded-r-full bg-white text-black border border-red_1 px-10 py-5 z-10"
                    >
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
                <ul>
                  {cartItems?.map((cartItem) => {
                    const totalPriceItem =
                      cartItem.dessert.price * cartItem.amount;

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
                          <div className="cursor-pointer border border-rose_400 rounded-full p-1">
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
                <Button className="bg-red_1 rounded-l-full rounded-r-full">
                  Confirm Order
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
