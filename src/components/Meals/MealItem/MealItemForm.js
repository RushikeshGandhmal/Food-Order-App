import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;

    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(+enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "text",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
