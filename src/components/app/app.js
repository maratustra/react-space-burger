import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Header from "../app-header/app-header";
import Modal from "../modal/modal";

import { getIngredients } from "../../services/actions/ingredients";
import { openModal, closeModal } from "../../services/actions/modal";
import { componentMap } from "../../services/reducers/modal";

function App() {
  const dispatch = useDispatch();
  const { isOpen, contentType, contentProps, title } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleIngredientClick = (ingredient) => {
    dispatch(
      openModal({
        contentType: "ingredientDetails",
        contentProps: { ingredient },
        title: "Детали ингредиента",
      })
    );
  };

  const handleOrderClick = () => {
    dispatch(openModal({
      contentType: "orderDetails",
      contentProps: {},
      title: "",
    }));
  };

  const ContentComponent = componentMap[contentType];

  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients onIngredientClick={handleIngredientClick} />
            <BurgerConstructor onOrderClick={handleOrderClick} />
          </DndProvider>
        </div>
        {isOpen && ContentComponent && (
          <Modal title={title} onClose={() => dispatch(closeModal())}>
            <ContentComponent {...contentProps} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
