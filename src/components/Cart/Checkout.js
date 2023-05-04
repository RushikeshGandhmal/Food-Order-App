import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [isFormInputsValid, setIsFormInputsValid] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isNameValid = !isEmpty(enteredName);
    const isStreetValid = !isEmpty(enteredStreet);
    const isPostalCodeValid = isFiveChars(enteredPostalCode);
    const isCityValid = !isEmpty(enteredCity);

    setIsFormInputsValid({
      name: isNameValid,
      street: isStreetValid,
      postalcode: isPostalCodeValid,
      city: isCityValid,
    });

    const isFormValid =
      isNameValid && isStreetValid && isPostalCodeValid && isCityValid;

    if (!isFormValid) {
      return;
    }

    // Submit the form
  };

  const controlClasses = (formInputField) => {
    return `${classes.controle} ${
      isFormInputsValid[formInputField] ? "" : classes.invalid
    }`;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={controlClasses("name")}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!isFormInputsValid.name && <p>Please enter a valid name</p>}
      </div>
      <div className={controlClasses("street")}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!isFormInputsValid.street && <p>Please enter a valid street</p>}
      </div>
      <div className={controlClasses("postalcode")}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!isFormInputsValid.postalcode && (
          <p>Please enter a valid postal code (5 characters only)</p>
        )}
      </div>
      <div className={controlClasses("city")}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!isFormInputsValid.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
