import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './ChatList.module.css';
export default function ChatList() {
  const [menuClick, setMenuClick] = useState(false);

  const handleDisplayMenu = () => {
    setMenuClick(true);
  };

  const handleLeaveOutside = () => {
    setMenuClick(false);
  };

  const id = 'idnumber';

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.searchContainer}>
            <input
              type='text'
              className={styles.search}
              placeholder='Search...'
            />
            <span className={styles.searchIcon}>
              <Icon icon='uil:search' inline={true} />
            </span>
          </div>
          <button type='button' className={styles.addFriend}>
            <Icon icon='fa-solid:user-friends' inline={true} />
          </button>

          {/* avatar */}
          <div
            className={styles.dropdown}
            onClick={handleDisplayMenu}
            onMouseLeave={handleLeaveOutside}
          >
            <img
              src='https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg'
              alt='profile'
              className={styles.avatar}
            />
            <div
              className={styles.dropdownContent}
              style={{ display: menuClick ? 'block' : 'none' }}
            >
              <a href='/#'>Profile</a>
              <a href='/#'>Logout</a>
            </div>
          </div>
        </div>

        <div className={styles.chatList}>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.offline}>Offline</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
          <a href={'/messages/' + id} className={styles.chatMember}>
            <div className={styles.profileName}>
              <img
                src='https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_960_720.jpg'
                alt='profile'
                className={styles.circle}
              />
              &nbsp;&nbsp;&nbsp;Xenon Vergara
            </div>
            <div className={styles.online}>Online</div>
          </a>
        </div>
      </div>
    </div>
  );
}
