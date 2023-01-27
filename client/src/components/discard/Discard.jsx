import React from 'react';
import styles from './Discard.module.css';

export default function Discard({ open, close, onDiscard }) {
  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.conversation}>Discard message</div>
        <p className={styles.ask}>
          Are you sure you want to discard this draft?
        </p>
        <div className={styles.buttons}>
          <button type='button' className={styles.cancel} onClick={close}>
            Cancel
          </button>
          <button type='button' className={styles.delete} onClick={onDiscard}>
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
