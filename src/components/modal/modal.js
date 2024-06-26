import { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal/modal-overlay";
import { ModalContext } from "../../context/modalContext";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ title, children }) => {
  const { closeModal } = useContext(ModalContext);

  const modalClasses = title
    ? `${styles.modal} ${styles["modal-no-title"]}`
    : styles.modal;
  const modalHeaderClasses = title
    ? styles["modal-header"]
    : `${styles["modal-header"]} ${styles["modal-header-no-title"]}`;

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={modalClasses}>
        <div className={modalHeaderClasses}>
          {title && <p className="text text_type_main-large">{title}</p>}
          <button onClick={closeModal} className={styles["modal-close"]}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
