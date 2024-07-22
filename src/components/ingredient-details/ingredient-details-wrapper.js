import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Loader from '../loader';

import IngredientDetails from "./ingredient-details";

const IngredientDetailsWrapper = () => {
  const { id } = useParams();
  const ingredient = useSelector((store) =>
    store.ingredients.ingredients.find((item) => item._id === id)
  );

  if (!ingredient) {
    return (
      <Loader />
    );
  }

  return <IngredientDetails ingredient={ingredient} />;
};

export default IngredientDetailsWrapper;
