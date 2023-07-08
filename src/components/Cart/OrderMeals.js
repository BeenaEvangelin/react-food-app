import React from "react";
import { useRef, useState } from "react";
import classes from "./OrderMeals.module.css";

const isEmpty = (value) => value.trim() === "";
const isOfSixChar = (value) => value.trim().length === 6;

const OrderMeals = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    plotNo: true,
    street: true,
    area: true,
    city: true,
    pinCode: true,
    landmark: true,
    phoneNumber: true,
  });

  const nameInputRef = useRef();
  const plotInputRef = useRef();
  const streetInputRef = useRef();
  const areaInputRef = useRef();
  const cityInputRef = useRef();
  const pinInputRef = useRef();
  const landmarkInputRef = useRef();
  const phoneInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPlotNo = plotInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredArea = areaInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPinCode = pinInputRef.current.value;
    const enteredLandmark = landmarkInputRef.current.value;
    const enteredPhoneNumber = phoneInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPlotNoIsValid = !isEmpty(enteredPlotNo);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredAreaIsValid = !isEmpty(enteredArea);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPinCodeIsValid = isOfSixChar(enteredPinCode);
    const enteredLandmarkIsValid = !isEmpty(enteredLandmark);
    const enteredPhoneNumberIsValid = !isEmpty(enteredPhoneNumber);

    setFormInputsValidity({
      name: enteredNameIsValid,
      plotNo: enteredPlotNoIsValid,
      street: enteredStreetIsValid,
      area: enteredAreaIsValid,
      city: enteredCityIsValid,
      pinCode: enteredPinCodeIsValid,
      landmark: enteredLandmarkIsValid,
      phoneNumber: enteredPhoneNumberIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredPlotNoIsValid &&
      enteredStreetIsValid &&
      enteredAreaIsValid &&
      enteredCityIsValid &&
      enteredPinCodeIsValid &&
      enteredLandmarkIsValid &&
      enteredPhoneNumberIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      plotNo: enteredPlotNo,
      street: enteredStreet,
      area: enteredArea,
      city: enteredCity,
      pinCode: enteredPinCode,
      landmark: enteredLandmark,
      phoneNumber: enteredPhoneNumber,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const plotNoControlClasses = `${classes.control} ${
    formInputsValidity.plotNo ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const areaControlClasses = `${classes.control} ${
    formInputsValidity.area ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const pinCodeControlClasses = `${classes.control} ${
    formInputsValidity.pinCode ? "" : classes.invalid
  }`;

  const landmarkControlClasses = `${classes.control} ${
    formInputsValidity.landmark ? "" : classes.invalid
  }`;
  const phoneNumberControlClasses = `${classes.control} ${
    formInputsValidity.phoneNumber ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={plotNoControlClasses}>
        <label htmlFor="plot">Plot No:</label>
        <input type="number" id="plot" ref={plotInputRef} />
        {!formInputsValidity.plotNo && (
          <p>Please enter a valid street plot no!</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street Name</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={areaControlClasses}>
        <label htmlFor="area">Area</label>
        <input type="text" id="area" ref={areaInputRef} />
        {!formInputsValidity.area && <p>Please enter a valid area!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={pinCodeControlClasses}>
        <label htmlFor="pin">Pin Code</label>
        <input type="number" id="pin" ref={pinInputRef} />
        {!formInputsValidity.pinCode && <p>Please enter a valid Code!</p>}
      </div>
      <div className={landmarkControlClasses}>
        <label htmlFor="landmark">Landmark</label>
        <input type="text" id="landmark" ref={landmarkInputRef} />
        {!formInputsValidity.landmark && <p>Please enter a valid landMark!</p>}
      </div>
      <div className={phoneNumberControlClasses}>
        <label htmlFor="phone">Phone Number</label>
        <input type="number" id="phone" ref={phoneInputRef} />
        {!formInputsValidity.phoneNumber && <p>Please enter a valid Number!</p>}
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
export default OrderMeals;
