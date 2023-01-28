import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './ChatList.module.css';
import axios from '../../lib/axiosConfig';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import useUser from '../../api/useUser';
import { shallow } from 'zustand/shallow';

export default function ChatList() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // user api
  const users = useUser((state) => state.users, shallow);
  const fetchAllUser = useUser((state) => state.fetchAllUsers);
  const searchUsers = useUser((state) => state.searchUsers);
  const fetchUser = useUser((state) => state.fetchUser);
  const authUser = useUser((state) => state.auth);

  // if fetch and auth
  const [isAuth, setIsAuth] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users`);
      if (response?.data != null) {
        if (response?.data?.isLoggedIn === false) {
          navigate('/login');
        }
      }
    };

    fetchUser();
  }, []);

  // fetch contact list and user info
  useEffect(() => {
    if (!isFetch) {
      fetchAllUser();
      setIsFetch(true);
    }

    if (!isAuth) {
      fetchUser();
      setIsAuth(true);
    }

    while (!users == null) {
      setIsLoading(true);
    }

    authUser ? (document.title = 'Chat List') : (document.title = 'Loading...');
    return setIsLoading(false);
  }, [authUser, fetchAllUser, fetchUser, isAuth, isFetch, navigate, users]);

  // menu
  const [menuClick, setMenuClick] = useState(false);

  const handleDisplayMenu = () => {
    setMenuClick(true);
  };

  const handleLeaveOutside = () => {
    setMenuClick(false);
  };

  // search contacts
  const handleSearch = async (e) => {
    let key = e.target.value;
    let keySearch = key.trim();

    if (keySearch !== '') {
      await searchUsers(keySearch);
    } else {
      await fetchAllUser();
    }
  };

  // logout
  const handleLogout = () => {
    setIsLoading(true);
    document.title = 'Logging out...';
    setTimeout(async () => {
      await axios.get(`/api/users/logout`);
      navigate('/login');
    }, 1500);
  };

  return isLoading ? (
    <div className={styles.centerLoading}>
      <HashLoader
        color={'#3b8595'}
        loading={isLoading}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  ) : (
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
              <a href='/profile'>{authUser?.findUser?.name}</a>
              <div onClick={handleLogout}>Logout</div>
            </div>
          </div>
        </div>

        <div className={styles.chatList}>
          {users ? (
            users?.map((user, index) => {
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
            })
          ) : (
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
