import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface ModalProps {
  title?: string
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ title, children, onClose }: ModalProps) => {
  const modalClasses = title
    ? `${styles.modal} ${styles["modal-no-title"]}`
    : styles.modal;
  const modalHeaderClasses = title
    ? styles["modal-header"]
    : `${styles["modal-header"]} ${styles["modal-header-no-title"]}`;

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={modalClasses}>
        <div className={modalHeaderClasses}>
          {title && <p className="text text_type_main-large">{title}</p>}
          <button
            onClick={onClose}
            className={styles["modal-close"]}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
