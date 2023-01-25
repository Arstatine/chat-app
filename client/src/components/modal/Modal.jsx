import React from 'react';
import styles from './Modal.module.css';

export default function Modal({ open, close, onDelete }) {
  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.conversation}>Delete conversation</div>
        <p className={styles.ask}>
          Are you sure you want to delete this conversation?
        </p>
        <div className={styles.buttons}>
          <button type='button' className={styles.cancel} onClick={close}>
            Cancel
          </button>
          <button type='button' className={styles.delete} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
