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
import ProfileOrderDetailsPage from "../../pages/profile/profile-order-details";
import NotFoundPage from "../../pages/not-found/not-found";
import OrderFeedPage from "../../pages/feed/feed";
import FeedDetailsPage from "../order-info/order-info";
import FeedDetailsPage from "../order-info/order-info";

import { getIngredients } from "../../services/actions/ingredients";
import { closeModal } from "../../services/actions/modal";
import { componentMap } from "../../services/reducers/modal";
import { checkUserAuth } from "../../services/actions/auth";
import { ProtectedRouteElement } from "../protected-route";
import IngredientDetailsWrapper from "../ingredient-details/ingredient-details-wrapper";
import { type ModalContentType, type ModalContentProps } from "../../types";
import {
  orderFeedWsConnect,
  orderFeedWsDisconnect,
  orderHistoryWsConnect,
  orderHistoryWsDisconnect,
} from "../../services/actions/wsActions";
import {
  LIVE_TABLE_SERVER_URL,
  USER_ORDER_SERVER_URL,
} from "../../utils/apiClient";

const App: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const { isOpen, contentType, contentProps, title } = useSelector(
    (state: any) => state.modal
  );

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/feed") {
      dispatch(orderFeedWsConnect(LIVE_TABLE_SERVER_URL));
    } else if (location.pathname.startsWith("/profile/orders")) {
      dispatch(orderHistoryWsConnect(USER_ORDER_SERVER_URL));
    }

    return () => {
      if (location.pathname === "/feed") {
        dispatch(orderFeedWsDisconnect());
      } else if (location.pathname.startsWith("/profile/orders")) {
        dispatch(orderHistoryWsDisconnect());
      }
    };
  }, [dispatch, location.pathname]);

  const handleCloseModal = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  const ContentComponent = componentMap[
    contentType as ModalContentType
  ] as React.ComponentType<ModalContentProps>;

  const isFeedDetailsPage = location.pathname.match(/\/feed\/\d+/);

  return (
    <div className={styles.main}>
      <Header />
      <main
        className={`${styles.container} ${
          isFeedDetailsPage ? styles.containerModified : ""
        }`}
      >
        <div
          className={`${styles.content} ${
            isFeedDetailsPage ? styles.contentModified : ""
          }`}
        >
          <DndProvider backend={HTML5Backend}>
            <Routes location={background || location}>
              <Route path="/" element={<HomePage />} />
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
                <Route
                  path="orders"
                  element={
                    <ProtectedRouteElement component={<ProfileOrdersPage />} />
                  }
                />
                <Route
                  path="orders/:number"
                  element={
                    <ProtectedRouteElement
                      component={<ProfileOrderDetailsPage />}
                    />
                  }
                />
              </Route>

              <Route path="/feed" element={<OrderFeedPage />} />
              <Route path="/feed/:number" element={<FeedDetailsPage />} />

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
                <Modal title="Детали заказа" onClose={handleCloseModal}>
                <Modal title="Детали заказа" onClose={handleCloseModal}>
                  <IngredientDetailsWrapper />
                </Modal>
              }
            />
            <Route
              path="/feed/:number"
              element={
                <Modal onClose={handleCloseModal}>
                  <FeedDetailsPage />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <Modal onClose={handleCloseModal}>
                  <ProfileOrderDetailsPage />
                </Modal>
              }
            />
            <Route
              path="/feed/:number"
              element={
                <Modal onClose={handleCloseModal}>
                  <FeedDetailsPage />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <Modal onClose={handleCloseModal}>
                  <ProfileOrderDetailsPage />
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
};

export default App;
