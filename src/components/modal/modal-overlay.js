import styles from "./modal-overlay.module.css";

const ModalOverlay = ({onClose}) => {
  return <div className={styles["modal-overlay"]} onClick={onClose}></div>;
};

export default ModalOverlay;
