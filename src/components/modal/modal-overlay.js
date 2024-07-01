import styles from "./modal-overlay.module.css";

const ModalOverlay = ({onClick}) => {
  return <div className={styles["modal-overlay"]} onClick={onClick}></div>;
};

export default ModalOverlay;
