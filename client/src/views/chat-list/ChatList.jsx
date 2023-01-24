import React, { useContext, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './ChatList.module.css';
import axios from '../../lib/axiosConfig';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function ChatList() {
  const navigate = useNavigate();
  const auth = useContext(Context);

  const [users, setUsers] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get(`/api/users`);
      if (res) {
        setAuthUser(res.data);
      }

      if (!res.data?.isLoggedIn) return navigate('/login');
    };

    fetchUserInfo().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get(`/api/users/all`);
      if (res.data.findUser.length) {
        setUsers(res.data?.findUser);
      } else {
        setUsers(null);
      }

      if (!res.data?.isLoggedIn) return navigate('/login');
    };

    fetchUserInfo().catch(console.error);
  }, []);

  useEffect(() => {
    document.title = 'Chat List';
  }, []);

  const [menuClick, setMenuClick] = useState(false);

  const handleDisplayMenu = () => {
    setMenuClick(true);
  };

  const handleLeaveOutside = () => {
    setMenuClick(false);
  };

  const handleSearch = async (e) => {
    let key = e.target.value;
    let keySearch = key.trim();

    if (keySearch !== '') {
      const res = await axios.get(`/api/users/search/${keySearch}`);
      if (res.data.findUser.length) {
        setUsers(res.data?.findUser);
      } else {
        setUsers(null);
      }
    } else {
      setUsers(null);
    }
  };

  const handleLogout = async () => {
    await axios.get(`/api/users/logout`);
    navigate('/login');
  };

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.searchContainer}>
            <input
              type='text'
              className={styles.search}
              placeholder='Search name or email'
              onChange={handleSearch}
            />
            <span className={styles.searchIcon}>
              <Icon icon='uil:search' inline={true} />
            </span>
          </div>

          {/* avatar */}
          <div
            className={styles.dropdown}
            onClick={handleDisplayMenu}
            onMouseLeave={handleLeaveOutside}
          >
            <img
              src={authUser?.findUser?.avatar}
              alt='profile'
              className={styles.avatar}
            />
            <div
              className={styles.dropdownContent}
              style={{ display: menuClick ? 'block' : 'none' }}
            >
              <a href='/#'>Profile</a>
              <a href='/login' onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>

        <div className={styles.chatList}>
          {users?.map((user, index) => {
            return (
              <a
                href={'/messages/' + user._id}
                className={styles.chatMember}
                key={index}
              >
                <div className={styles.profileName}>
                  <img
                    src={user.avatar}
                    alt='profile'
                    className={styles.circle}
                  />
                  &nbsp;&nbsp;&nbsp;{user.name}
                  <br />
                  &nbsp;&nbsp;&nbsp;{user.email}
                </div>
                <div className={styles.online}>Chat Now!</div>
              </a>
            );
          }) || (
            <div className={styles.chatMember}>
              <div className={styles.profileName}>No user found.</div>
              <div className={styles.profileName}>Search Now!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
