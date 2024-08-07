import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay = ({onClose}: ModalOverlayProps) => {
  return <div className={styles["modal-overlay"]} onClick={onClose}></div>;
};

export default ModalOverlay;
