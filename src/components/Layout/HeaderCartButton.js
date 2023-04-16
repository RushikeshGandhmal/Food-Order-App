import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartProvider from "../../store/CartProvider";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartProvider);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.totalAmount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
