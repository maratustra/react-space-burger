import { useContext } from "react";
import styles from "./modal-overlay.module.css";

import { ModalContext } from "../../context/modalContext";

const ModalOverlay = () => {
  const { closeModal } = useContext(ModalContext);

  return <div className={styles["modal-overlay"]} onClick={closeModal}></div>;
};

export default ModalOverlay;
