import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Loader from '../loader';

import IngredientDetails from "./ingredient-details";
import { IIngredient } from "../../types";

const IngredientDetailsWrapper: React.FC = () => {
  const { id } = useParams();
  const ingredient = useSelector((store: any) =>
    store.ingredients.ingredients.find((item: IIngredient) => item._id === id)
  );

  if (!ingredient) {
    return (
      <Loader />
    );
  }

  return <IngredientDetails ingredient={ingredient} />;
};

export default IngredientDetailsWrapper;
