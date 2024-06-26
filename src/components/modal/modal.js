import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from "prop-types"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./modal.module.css"
import ModalOverlay from "../modal/modal-overlay"

const modalRoot = document.getElementById("react-modals")

const Modal = ({ title, children, onClose }) => {
  const modalClasses = title ? `${styles.modal} ${styles['modal-no-title']}` : styles.modal
  const modalHeaderClasses = title ? styles['modal-header'] : `${styles['modal-header']} ${styles['modal-header-no-title']}`

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [onClose])

  return ReactDOM.createPortal(
    <>
    <ModalOverlay onClick={onClose} />
    <div className={modalClasses}>
      <div className={modalHeaderClasses}>
        {title && <p className="text text_type_main-large">{title}</p>}
        <button onClick={onClose} className={styles['modal-close']}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <div>{children}</div>
    </div>
    </>,
    modalRoot
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal
