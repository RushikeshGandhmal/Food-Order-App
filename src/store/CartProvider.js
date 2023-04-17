import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedState = { ...state };

    updatedState.totalAmount += action.item.price * action.item.amount;

    const existingCartItemIndex = updatedState.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingCartItemIndex >= 0) {
      updatedState.items[existingCartItemIndex].amount += action.item.amount;
    } else {
      updatedState.items.push(action.item);
    }

    return updatedState;
  }

  if (action.type === "REMOVE") {
    let updatedItems;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const updatedTotalAmount =
      state.totalAmount - state.items[existingCartItemIndex].price;

    if (state.items[existingCartItemIndex].amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex].amount--;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
