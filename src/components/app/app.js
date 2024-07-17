import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "../app-header/app-header";
import Modal from "../modal/modal";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegistrationPage from "../../pages/registration/registration";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import ProfileFormPage from "../../pages/profile/profile-form";
import ProfileOrdersPage from "../../pages/profile/profile-orders";
import NotFoundPage from "../../pages/not-found/not-found";

import { getIngredients } from "../../services/actions/ingredients";
import { openModal, closeModal } from "../../services/actions/modal";
import { componentMap } from "../../services/reducers/modal";
import { checkUserAuth } from "../../services/actions/auth";
import { ProtectedRouteElement } from "../protected-route";
import IngredientDetailsWrapper from "../ingredient-details/ingredient-details-wrapper";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const { isOpen, contentType, contentProps, title } = useSelector(
    (state) => state.modal
  );

  useEffect(() => {
    dispatch(checkUserAuth());
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

  const handleCloseModal = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  const ContentComponent = componentMap[contentType];

  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <Routes location={background || location}>
              <Route
                path="/"
                element={
                  <HomePage
                    onIngredientClick={handleIngredientClick}
                    onOrderClick={handleOrderClick}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRouteElement
                    onlyUnAuth={true}
                    component={<LoginPage />}
                  />
                }
              />
              <Route
                path="/registration"
                element={
                  <ProtectedRouteElement
                    onlyUnAuth={true}
                    component={<RegistrationPage />}
                  />
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <ProtectedRouteElement
                    onlyUnAuth={true}
                    component={<ForgotPasswordPage />}
                  />
                }
              />
              <Route
                path="/reset-password"
                element={
                  <ProtectedRouteElement
                    onlyUnAuth={true}
                    component={<ResetPasswordPage />}
                  />
                }
              />
              <Route
                path="/profile"
                element={<ProtectedRouteElement component={<ProfilePage />} />}
              >
                <Route index element={<ProfileFormPage />} />
                <Route path="orders" element={<ProfileOrdersPage />} />
              </Route>
              <Route
                path="/ingredients/:id"
                element={<IngredientDetailsWrapper />}
              />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </DndProvider>
        </div>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                  <IngredientDetailsWrapper />
                </Modal>
              }
            />
          </Routes>
        )}
        {isOpen && (
          <Modal title={title} onClose={handleCloseModal}>
            <ContentComponent {...contentProps} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
