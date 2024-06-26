import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

const ModalOverlay = ({ onClick }) => {
    return <div className={styles['modal-overlay']} onClick={onClick}></div>
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default ModalOverlay