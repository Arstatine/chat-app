import React, { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from '../../lib/axiosConfig';
import { Context } from '../../App';
import { useContext } from 'react';

export default function Messages() {
  const auth = useContext(Context);
  const [message, setMessage] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const to_id = useParams();
  var senderID = auth._id;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get(`/api/users/${to_id.to}`);
      if (res) {
        if (res.data.findUser) return setUser(res.data?.findUser);

        return navigate('/chat-list');
      }
    };

    fetchUserInfo().catch(console.error);
  }, []);

  useEffect(() => {
    document.title = user?.name || 'Messages';
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      const res = await axios.get(`/api/messages/${senderID}/${to_id.to}`);

      setMessage(res.data);
    };

    getMessage();
  }, [senderID, to_id.to]);

  const handleSendMessage = async (e) => {
    if (textMessage !== '') {
      setMessage((currentMessage) => [
        ...currentMessage,
        { message: textMessage, sender: senderID },
      ]);
      setTextMessage('');

      const res = await axios.post(`/api/messages/${to_id.to}`, {
        message: textMessage,
        sender: auth._id,
        receiver: to_id.to,
      });
    }
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter' && textMessage !== '') {
      setMessage((currentMessage) => [
        ...currentMessage,
        { message: textMessage, sender: senderID },
      ]);
      setTextMessage('');

      const res = await axios.post(`/api/messages/${to_id.to}`, {
        message: textMessage,
        sender: auth._id,
        receiver: to_id.to,
      });
    }
  };

  return (
    user && (
      <div className={styles.body}>
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
            <div className={styles.infoBtn}>
              <Icon icon='material-symbols:info' inline={true} />
            </div>
          </div>
          <div className={styles.chats}>
            {message.map((mes, index) => {
              if (mes.sender === senderID) {
                return (
                  <div className={styles.messageSender} key={index}>
                    <span className={styles.sender}>{mes.message}</span>
                  </div>
                );
              }

              return (
                <div className={styles.messageReceiver} key={index}>
                  <span className={styles.receiver}>{mes.message}</span>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
          <div className={styles.footer}>
            <input
              type='text'
              className={styles.chatInput}
              placeholder='Message'
              value={textMessage}
              name='message'
              onChange={(e) => setTextMessage(e.target.value)}
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
