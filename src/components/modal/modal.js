import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal/modal-overlay";
import { closeModal } from "../../services/actions/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const modalRoot = document.getElementById("react-modals");

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, contentType, contentProps, title } = useSelector((state) => state.modal);

  const modalClasses = title
    ? `${styles.modal} ${styles["modal-no-title"]}`
    : styles.modal;
  const modalHeaderClasses = title
    ? styles["modal-header"]
    : `${styles["modal-header"]} ${styles["modal-header-no-title"]}`;

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        dispatch(closeModal());
      }
    };
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [dispatch]);

  if (!isOpen) return null;

  const renderContent = () => {
    if (contentType === "ingredientDetails") {
      return <IngredientDetails {...contentProps} />;
    } else if (contentType === "orderDetails") {
      return <OrderDetails {...contentProps} />;
    }
    return null;
  };

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={() => dispatch(closeModal())} />
      <div className={modalClasses}>
        <div className={modalHeaderClasses}>
          {title && <p className="text text_type_main-large">{title}</p>}
          <button
            onClick={() => dispatch(closeModal())}
            className={styles["modal-close"]}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div>{renderContent()}</div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
