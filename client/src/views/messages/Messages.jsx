import React from 'react';
import styles from './Messages.module.css';
import { Icon } from '@iconify/react';

export default function Messages() {
  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.profileName}>
            <a href='/chat-list' className={styles.backBtn}>
              <Icon icon='ic:round-arrow-back' inline={true} />
            </a>
            <div className={styles.dropdown}>
              <img
                src='https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg'
                alt='profile'
                className={styles.avatar}
              />
            </div>
            <div className={styles.name}>Xenon Vergara</div>
          </div>
          <div className={styles.infoBtn}>
            <Icon icon='material-symbols:info' inline={true} />
          </div>
        </div>
        <div className={styles.chats}>
          <div className={styles.messageReceiver}>
            <span className={styles.receiver}>dawdwadawdwa</span>
          </div>
          <div className={styles.messageReceiver}>
            <span className={styles.receiver}>dawdwadawdwa</span>
          </div>
          <div className={styles.messageSender}>
            <span className={styles.sender}>
              Hi there my name is xenon vergara. HEHEHEHEHEHE
            </span>
          </div>
          <div className={styles.messageReceiver}>
            <span className={styles.receiver}>dawdwadawdwa</span>
          </div>
          <div className={styles.messageReceiver}>
            <span className={styles.receiver}>dawdwadawdwa</span>
          </div>
          <div className={styles.messageSender}>
            <span className={styles.sender}>
              Hi there my name is xenon vergara. HEHEHEHEHEHE
            </span>
          </div>
          <div className={styles.messageReceiver}>
            <span className={styles.receiver}>dawdwadawdwa</span>
          </div>
          <div className={styles.messageReceiver}>
            <span className={styles.receiver}>dawdwadawdwa</span>
          </div>
          <div className={styles.messageSender}>
            <span className={styles.sender}>
              Hi there my name is xenon vergara. HEHEHEHEHEHE
            </span>
          </div>
          <div className={styles.messageReceiver}>
            <span className={styles.receiver}>dawdwadawdwa</span>
          </div>
          <div className={styles.messageReceiver}>
            <span className={styles.receiver}>dawdwadawdwa</span>
          </div>
          <div className={styles.messageSender}>
            <span className={styles.sender}>
              Hi there my name is xenon vergara. HEHEHEHEHEHE
            </span>
          </div>
        </div>
        <div className={styles.footer}>
          <input
            type='text'
            className={styles.chatInput}
            placeholder='Message'
          />
          <button type='button' className={styles.sendBtn}>
            <Icon icon='material-symbols:send-rounded' inline={true} />
          </button>
        </div>
      </div>
    </div>
  );
}
