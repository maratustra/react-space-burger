import { useEffect, useState } from 'react'
import styles from "./app.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import Header from "../app-header/app-header"
import Modal from "../modal/modal"
import ModalOverlay from "../modal/modal-overlay"
import OrderDetails from "../order-details/order-details"
import IngredientDetails from "../ingredient-details/ingredient-details"

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [modalTitle, setModalTitle] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIngredients(data.data)
        } else {
          throw new Error('Данные не получены')
        }
      })
      .catch(error => {
        console.error('Ошибка в получении данных ingredients:', error)
      })
  }, [])

  const handleIngredientClick = ingredient => {
    setModalContent(<IngredientDetails ingredient={ingredient} />)
    setModalTitle('Детали ингридиента')
    setIsModalOpen(true)
  }

  const handleOrderClick = () => {
    setModalContent(<OrderDetails />)
    setModalTitle('')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <BurgerIngredients ingredients={ingredients} onIngredientClick={handleIngredientClick} />
          <BurgerConstructor ingredients={ingredients} onOrderClick={handleOrderClick} />
        </div>
        {isModalOpen && (
          <>
            <ModalOverlay onClick={closeModal} />
            <Modal title={modalTitle} onClose={closeModal}>
              {modalContent}
            </Modal>
          </>
        )}
      </main>
    </div>
  );
}

export default App
