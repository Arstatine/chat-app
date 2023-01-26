import React, { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Context } from '../../App';
import { useContext } from 'react';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';
import Modal from '../../components/modal/Modal';
import CryptoJS from 'crypto-js';
import HashLoader from 'react-spinners/HashLoader';
import useMessage from '../../api/useMessage';
import { shallow } from 'zustand/shallow';

export default function Messages() {
  // env
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  // socekt config
  const socket = useRef();
  socket.current = io(SERVER_URL, {
    withCredentials: true,
  });

  // loading
  const [isLoading, setIsLoading] = useState(false);

  const auth = useContext(Context);
  const navigate = useNavigate();

  // api for message
  const fetchMessages = useMessage((state) => state.fetchMessages);
  const message = useMessage((state) => state.message, shallow);
  const sendMessage = useMessage((state) => state.sendMessage);
  const addMessage = useMessage((state) => state.addMessage);
  const deleteMessage = useMessage((state) => state.deleteMessage);

  // api for reciever
  const receiverID = useParams(); //receiver
  const user = useMessage((state) => state.user, shallow);
  const fetchReceiverUser = useMessage((state) => state.fetchReceiverUser);

  // if data is loaded
  const [isFetch, setIsFetch] = useState(false);
  const [isUser, setIsUser] = useState(false);

  // inputs and buttons
  const [textMessage, setTextMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  // if sender is typing
  const [isTyping, setIsTyping] = useState(false);

  // get date
  const getDate = (date) => {
    const messageDate = new Date(date);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const year = messageDate.getFullYear();
    const month = months[messageDate.getMonth()];
    const day = messageDate.getDate();
    var hour = messageDate.getHours();
    var min = messageDate.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? '0' + min : min;

    const textDate = `${month} ${day}, ${year} ${hour}:${min} ${ampm}`;

    return textDate;
  };

  var senderID = auth._id;

  // scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message, isTyping]);

  // encrypt message
  const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(JSON.stringify(message), SECRET_KEY).toString();
  };

  // decrypt message
  const decryptMessage = (encryptedMess) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMess, SECRET_KEY);
    const mes = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return mes;
  };

  // add user to socket server
  useEffect(() => {
    if (senderID != null) {
      socket?.current?.emit('add-user', senderID);
    }
  }, [senderID]);

  // fetch receiver and messages
  useEffect(() => {
    setIsLoading(true);
    document.title = user?.name || 'Messages';

    if (receiverID.to !== '') {
      if (!isFetch) {
        fetchReceiverUser(receiverID.to);
        if (user?.err) return navigate('/chat-list');
        setIsFetch(true);
      }
    }

    if (senderID !== '' && receiverID.to !== '') {
      fetchMessages(senderID, receiverID.to);
      setIsUser(true);
    }
    setIsLoading(false);
  }, [
    fetchMessages,
    fetchReceiverUser,
    isFetch,
    isUser,
    navigate,
    senderID,
    receiverID.to,
    user?.err,
    user?.name,
  ]);

  // realtime message receive
  socket?.current?.on('receive-message', (data) => {
    if (data.sender === receiverID.to) {
      addMessage(data.message, data.sender, data.receiver, data.createdAt);
    }
  });

  // sender typing
  socket?.current?.on('receive-typing', () => {
    setIsTyping(true);
  });

  // sender not typing
  socket?.current?.on('receive-typing-off', () => {
    setIsTyping(false);
  });

  // change text value
  const handleChangeText = (e) => {
    setTextMessage(e.target.value);
    if (e.target.value !== '') {
      socket?.current?.emit('typing', receiverID.to);
    } else {
      socket?.current?.emit('typing-off', receiverID.to);
    }
  };

  // send message using button
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const mes = encryptMessage(textMessage);

    if (textMessage !== '') {
      sendMessage(mes, senderID, receiverID.to);
      addMessage(mes, senderID, receiverID.to, new Date());
      setTextMessage('');

      socket?.current?.emit(
        'send-message',
        {
          message: mes,
          sender: auth._id,
          receiver: receiverID.to,
          createdAt: new Date(),
        },
        receiverID.to
      );

      socket?.current?.emit('typing-off', receiverID.to);
    }
  };

  // send message using enter
  const handleEnter = async (e) => {
    if (e.key === 'Enter' && textMessage !== '') {
      const mes = encryptMessage(textMessage);

      sendMessage(mes, senderID, receiverID.to);
      addMessage(mes, senderID, receiverID.to, new Date());
      setTextMessage('');

      socket?.current?.emit(
        'send-message',
        {
          message: mes,
          sender: auth._id,
          receiver: receiverID.to,
          createdAt: new Date(),
        },
        receiverID.to
      );

      socket?.current?.emit('typing-off', receiverID.to);
    }
  };

  // delete whole conversation
  const handleDeleteConversation = async () => {
    deleteMessage(senderID, receiverID.to);
    setOpenModal(false);
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
                        title={getDate(mes.createdAt)}
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
                      title={getDate(mes.createdAt)}
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
