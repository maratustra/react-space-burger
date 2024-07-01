import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Header from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { getIngredients } from "../../services/actions/ingredients";
import { openModal, closeModal } from "../../services/actions/modal";

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const { isOpen, content, title } = useSelector((state) => state.modal);
  console.log('isOpen: ', isOpen);

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  const handleIngredientClick = (ingredient) => {
    dispatch(openModal(<IngredientDetails ingredient={ingredient} />, "Детали ингредиента"));
  };

  const handleOrderClick = () => {
    dispatch(openModal(<OrderDetails />, ""));
  };

  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <BurgerIngredients onIngredientClick={handleIngredientClick} />
          <BurgerConstructor onOrderClick={handleOrderClick} />
        </div>
          {isOpen && (
            <Modal title={title} onClose={() => dispatch(closeModal())}>
              {content}
            </Modal>
          )}
      </main>
    </div>
  );
}

export default App;
