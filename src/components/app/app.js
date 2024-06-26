import { useEffect, useState } from "react";
import styles from "./app.module.css";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Header from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { useModal } from "../../hooks/useModal";
import { IngredientsContext } from "../../context/ingredientsContext";
import { ModalContext } from "../../context/modalContext";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);
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
          setIngredients(data.data);
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
          <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
            <BurgerIngredients onIngredientClick={handleIngredientClick} />
            <BurgerConstructor onOrderClick={handleOrderClick} />
          </IngredientsContext.Provider>
        </div>
        <ModalContext.Provider value={{ isModalOpen, closeModal }}>
          {isModalOpen && (
            <>
              <Modal title={modalTitle}>
                {modalContent}
              </Modal>
            </>
          )}
        </ModalContext.Provider>
      </main>
    </div>
  );
}

export default App;
