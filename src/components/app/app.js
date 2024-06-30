import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Header from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { useModal } from "../../hooks/useModal";
import { ModalContext } from "../../context/modalContext";
import { SET_INGREDIENTS } from "../../services/actions/ingredients";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients.ingredients);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch({ type: SET_INGREDIENTS, payload: data.data });
        } else {
          throw new Error("Данные не получены");
        }
      })
      .catch((error) => {
        console.error("Ошибка в получении данных ingredients:", error);
      });
  }, []);

  const handleIngredientClick = (ingredient) => {
    setModalContent(<IngredientDetails ingredient={ingredient} />);
    setModalTitle("Детали ингридиента");
    openModal();
  };

  const handleOrderClick = () => {
    setModalContent(<OrderDetails />);
    setModalTitle("");
    openModal();
  };

  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <BurgerIngredients onIngredientClick={handleIngredientClick} />
          <BurgerConstructor onOrderClick={handleOrderClick} />
        </div>
        <ModalContext.Provider value={{ isModalOpen, closeModal }}>
          {isModalOpen && (
            <Modal title={modalTitle}>{modalContent}</Modal>
          )}
        </ModalContext.Provider>
      </main>
    </div>
  );
}

export default App;
