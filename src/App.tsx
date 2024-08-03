import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCart,
  fetchCartItems,
  fetchDesserts,
  removeCartItem,
} from "./lib/api";
import { Cart, Dessert } from "./lib/types";
import { useState } from "react";
import Modal from "./components/Modal";
import CartComponent from "./components/CartComponent";
import DessertsComponent from "./components/DessertsComponent";

function App() {
  const [modal, setModal] = useState<boolean>(false);

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
  const { mutate: removeCartItemMutation } = useMutation({
    mutationFn: removeCartItem,
  });

  function handleRemoveCartItem(cartItemId: string) {
    removeCartItemMutation(cartItemId);
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
    <div>
      <div className="p-20 bg-rose_50 relative">
        {modal && (
          <Modal
            setModal={setModal}
            cartItems={cartItems}
            cartTotalPrice={cartTotalPrice}
          />
        )}
        <div className={modal ? "flex opacity-40" : "flex"}>
          <DessertsComponent handleAddToCart={handleAddToCart} data={data} />
          <CartComponent
            cartItems={cartItems}
            handleRemoveCartItem={handleRemoveCartItem}
            cartTotalPrice={cartTotalPrice}
            setModal={setModal}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
