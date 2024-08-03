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
import { queryClient } from "./main";

function App() {
  const [modal, setModal] = useState<boolean>(false);
  // const [amount, setAmount] = useState<boolean>(false);

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
    onMutate: async (newCartItem) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });

      // Snapshot the previous value
      const previousCartItems = queryClient.getQueryData<Cart[]>(["cartItems"]);

      const cartItemToAdd: Cart = {
        id: `${Math.random()}`, // Generate a temporary id if needed
        dessert: newCartItem.dessert,
        amount: newCartItem.amount || 1, // Default to 1 if not provided
      };

      // Optimistically update to add the item to the cart
      queryClient.setQueryData<Cart[]>(["cartItems"], (old) =>
        old ? [...old, cartItemToAdd] : [cartItemToAdd]
      );

      // Return a context object with the snapshotted value
      return { previousCartItems };
    },
    onError: (err, newCartItem, context) => {
      // Rollback to the previous cart items on error
      if (context?.previousCartItems) {
        queryClient.setQueryData(["cartItems"], context.previousCartItems);
      }
    },
    onSettled: () => {
      // Always refetch the cart items after mutation success or failure
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  function handleAddToCart(dessert: Dessert) {
    addToCartMutation({ dessert, amount: 1 });
    // setAmount(true);
  }

  const { mutate: removeCartItemMutation } = useMutation<void, unknown, string>(
    {
      mutationFn: removeCartItem,
      onMutate: async (itemId) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ["cartItems"] });

        // Snapshot the previous value
        const previousCartItems = queryClient.getQueryData<Cart[]>([
          "cartItems",
        ]);

        // Optimistically update to remove the item from the cart
        queryClient.setQueryData<Cart[]>(["cartItems"], (old) =>
          old?.filter((item) => item.id !== itemId)
        );

        // Return a context object with the snapshotted value
        return { previousCartItems };
      },
      onError: (err, itemId, context: any) => {
        // Rollback to the previous cart items on error
        if (context?.previousCartItems) {
          queryClient.setQueryData(["cartItems"], context.previousCartItems);
        }
      },
      onSettled: () => {
        // Always refetch the cart items after mutation success or failure
        queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      },
    }
  );

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
