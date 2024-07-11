import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

function HomePage({ onIngredientClick, onOrderClick }) {
  return (
    <>
      <BurgerIngredients onIngredientClick={onIngredientClick} />
      <BurgerConstructor onOrderClick={onOrderClick} />
    </>
  );
}

export default HomePage;