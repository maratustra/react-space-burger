import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route } from "react-router-dom";

import Header from "../app-header/app-header";
import Modal from "../modal/modal";
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import ProfileFormPage from '../../pages/profile-form';
import ProfileOrdersPage from "../../pages/profile-orders";
import NotFoundPage from '../../pages/404';

import { getIngredients } from "../../services/actions/ingredients";
import { openModal, closeModal } from "../../services/actions/modal";
import { componentMap } from "../../services/reducers/modal";

function App() {
  const dispatch = useDispatch();
  const { isOpen, contentType, contentProps, title } = useSelector(
    (state) => state.modal
  );

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
    dispatch(
      openModal({
        contentType: "orderDetails",
        contentProps: {},
        title: "",
      })
    );
  };

  const ContentComponent = componentMap[contentType];

  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <Routes>
              <Route path="/" element={<HomePage onIngredientClick={handleIngredientClick} onOrderClick={handleOrderClick} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/profile" element={<ProfilePage />}>
                <Route index element={<ProfileFormPage />} />
                <Route path="orders" element={<ProfileOrdersPage />} />
              </Route>
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
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
