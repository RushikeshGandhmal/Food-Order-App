import { Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvailabelsMeals from "./AvailabelsMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailabelsMeals />
    </Fragment>
  );
};

export default Meals;
