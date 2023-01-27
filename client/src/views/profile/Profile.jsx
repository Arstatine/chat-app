import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import useUser from '../../api/useUser';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { shallow } from 'zustand/shallow';
import Discard from '../../components/discard/Discard';
import { motion } from 'framer-motion';

export default function Profile() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [openDiscard, setOpenDiscard] = useState(false);

  // user api
  const fetchUser = useUser((state) => state.fetchUser);
  const authUser = useUser((state) => state.auth);
  const name = useUser((state) => state.name, shallow);
  const setName = useUser((state) => state.setName);
  const updateUser = useUser((state) => state.updateUser, shallow);

  // states
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');

  // if auth
  const [isAuth, setIsAuth] = useState(false);

  // fetch
  useEffect(() => {
    if (!isAuth) {
      fetchUser();
      setIsAuth(true);
    }

    if (authUser != null) {
      if (authUser?.isLoggedIn === false) {
        navigate('/login');
      }
    }

    while (!authUser == null) {
      setIsLoading(true);
    }

    authUser
      ? (document.title = `Profile | ${authUser.findUser.name}`)
      : (document.title = 'Loading...');
    return setIsLoading(false);
  }, [authUser, fetchUser, isAuth, navigate]);

  // change avatar
  const [avatarKeyword, setAvatarKeyword] = useState(null);

  const handleChangeAvatar = (e) => {
    setSuccess('');
    if (e.target.value !== '') {
      setAvatarKeyword(
        `https://api.dicebear.com/5.x/adventurer/svg?seed=${e.target.value}`
      );
    } else {
      setAvatarKeyword(null);
    }
  };

  // save
  const handleSave = async () => {
    const res = await updateUser(avatarKeyword, name, password);
    setAvatarKeyword(null);
    setPassword('');
    setSuccess(res?.data?.success);
  };

  const handleDiscard = () => {
    navigate('/chat-list');
  };

  const handleCancel = () => {
    if (avatarKeyword != null || password !== '') {
      return setOpenDiscard(true);
    }

    navigate('/chat-list');
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
      <Discard
        open={openDiscard}
        close={() => setOpenDiscard(false)}
        onDiscard={handleDiscard}
      />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.profileName}>
            <a href='/chat-list' className={styles.backBtn}>
              <Icon icon='ic:round-arrow-back' inline={true} />
            </a>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.inputContainer}>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  default: {
                    duration: 0.2,
                    ease: [0, 0.71, 0.2, 1.01],
                  },
                  scale: {
                    type: 'spring',
                    damping: 5,
                    stiffness: 75,
                    restDelta: 0.001,
                  },
                }}
                className={styles.success}
              >
                {success}
              </motion.div>
            )}
            <img
              src={avatarKeyword || authUser?.findUser?.avatar}
              alt='Profile'
            />
            <h3>Avatar</h3>
            <input
              type='text'
              className={styles.inputs}
              placeholder='Keyword for Avatar'
              name='message'
              onChange={handleChangeAvatar}
            />
            <br />
            <h3>Profile</h3>
            <input
              type='text'
              className={styles.inputs}
              placeholder='Name'
              value={name}
              name='message'
              onChange={(e) => {
                setName(e.target.value);
                setSuccess('');
              }}
            />
            <input
              type='text'
              className={styles.inputs}
              placeholder='Email Address'
              value={authUser?.findUser?.email || ''}
              name='message'
              readOnly
              disabled
            />
            <input
              type='password'
              className={styles.inputs}
              placeholder='Password'
              name='message'
              onChange={(e) => {
                setPassword(e.target.value);
                setSuccess('');
              }}
            />
            <br />
            <div className={styles.btnContainer}>
              <button
                type='button'
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type='button'
                className={styles.saveBtn}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
