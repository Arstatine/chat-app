import React, { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from '../../lib/axiosConfig';
import { Context } from '../../App';
import { useContext } from 'react';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';
import Modal from '../../components/modal/Modal';
import CryptoJS from 'crypto-js';

export default function Messages() {
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const socket = useRef();

  socket.current = io(SERVER_URL, {
    withCredentials: true,
  });

  const auth = useContext(Context);
  const [message, setMessage] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const to_id = useParams();
  var senderID = auth._id;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (senderID != null) {
      socket?.current?.emit('add-user', senderID);
    }
  }, [senderID]);

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    if (to_id.to !== '') {
      const fetchUserInfo = async () => {
        const res = await axios.get(`/api/users/${to_id.to}`);
        if (res) {
          if (res.data.findUser) return setUser(res.data?.findUser);

          return navigate('/chat-list');
        }
      };

      fetchUserInfo().catch(console.error);
    }
  }, [navigate, to_id.to]);

  useEffect(() => {
    document.title = user?.name || 'Messages';
  }, [user?.name]);

  useEffect(() => {
    if (senderID !== '' && to_id.to !== '') {
      const getMessage = async () => {
        const res = await axios.get(`/api/messages/${senderID}/${to_id.to}`);

        setMessage(res.data);
      };

      getMessage();
    }
  }, [senderID, to_id.to]);

  socket?.current?.on('receive-message', (data) => {
    if (data.sender === to_id.to) {
      setMessage((previous) => [...previous, data]);
    }
  });

  socket?.current?.on('receive-typing', () => {
    setIsTyping(true);
  });

  socket?.current?.on('receive-typing-off', () => {
    setIsTyping(false);
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const mes = CryptoJS.AES.encrypt(
      JSON.stringify(textMessage),
      SECRET_KEY
    ).toString();

    if (textMessage !== '') {
      setMessage((currentMessage) => [
        ...currentMessage,
        { message: mes, sender: senderID },
      ]);
      setTextMessage('');

      socket?.current?.emit(
        'send-message',
        {
          message: mes,
          sender: auth._id,
          receiver: to_id.to,
        },
        to_id.to
      );

      await axios.post(`/api/messages/${to_id.to}`, {
        message: mes,
        sender: auth._id,
        receiver: to_id.to,
      });

      socket?.current?.emit('typing-off', to_id.to);
    }
  };

  const handleChangeText = (e) => {
    setTextMessage(e.target.value);
    if (e.target.value !== '') {
      socket?.current?.emit('typing', to_id.to);
    } else {
      socket?.current?.emit('typing-off', to_id.to);
    }
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter' && textMessage !== '') {
      const mes = CryptoJS.AES.encrypt(
        JSON.stringify(textMessage),
        SECRET_KEY
      ).toString();

      setMessage((currentMessage) => [
        ...currentMessage,
        { message: mes, sender: senderID },
      ]);
      setTextMessage('');

      socket?.current?.emit(
        'send-message',
        {
          message: mes,
          sender: auth._id,
          receiver: to_id.to,
        },
        to_id.to
      );

      await axios.post(`/api/messages/${to_id.to}`, {
        message: mes,
        sender: auth._id,
        receiver: to_id.to,
      });

      socket?.current?.emit('typing-off', to_id.to);
    }
  };

  const handleDeleteConversation = async () => {
    await axios.get(`/api/messages/delete/${senderID}/${to_id.to}`);
    setOpenModal(false);
    setMessage([]);
  };

  const decryptMessage = (encryptedMess) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMess, SECRET_KEY);
    const mes = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return mes;
  };

  return (
    user && (
      <div className={styles.body}>
        <Modal
          open={openModal}
          close={() => setOpenModal(false)}
          onDelete={handleDeleteConversation}
        />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.profileName}>
              <a href='/chat-list' className={styles.backBtn}>
                <Icon icon='ic:round-arrow-back' inline={true} />
              </a>
              <div className={styles.dropdown}>
                <img
                  src={user.avatar}
                  alt='profile'
                  className={styles.avatar}
                />
              </div>
              <div className={styles.name}>{user?.name}</div>
            </div>
            <button
              type='button'
              className={styles.deleteBtn}
              onClick={() => setOpenModal(true)}
            >
              <Icon icon='ic:baseline-delete' inline={true} />
            </button>
          </div>
          <div className={styles.chats}>
            {message.length ? (
              message.map((mes, index) => {
                if (mes.sender === senderID) {
                  return (
                    <div className={styles.messageSender} key={index}>
                      <motion.span
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
                        className={styles.sender}
                      >
                        {decryptMessage(mes.message)}
                      </motion.span>
                    </div>
                  );
                }

                return (
                  <div className={styles.messageReceiver} key={index}>
                    <motion.span
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
                      className={styles.receiver}
                    >
                      {decryptMessage(mes.message)}
                    </motion.span>
                  </div>
                );
              })
            ) : (
              <div className={styles.chatNow}>Chat Now!</div>
            )}

            {isTyping && (
              <div className={styles.typingIndicatorContainer}>
                <div className={styles.typingIndicatorBubble}>
                  <div className={styles.typingIndicatorBubbleDot}></div>
                  <div className={styles.typingIndicatorBubbleDot}></div>
                  <div className={styles.typingIndicatorBubbleDot}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.footer}>
            <input
              type='text'
              className={styles.chatInput}
              placeholder='Message'
              value={textMessage}
              name='message'
              onChange={handleChangeText}
              onKeyDown={handleEnter}
            />
            <button
              type='button'
              className={styles.sendBtn}
              onClick={handleSendMessage}
            >
              <Icon icon='material-symbols:send-rounded' inline={true} />
            </button>
          </div>
        </div>
      </div>
    )
  );
}
