import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useMessage = create((set) => ({
  user: null,
  message: [],
  fetchReceiverUser: async (id) => {
    const response = await axios.get(`/api/users/${id}`);
    if (response?.data?.err) return set({ user: response?.data });
    set({ user: response?.data?.findUser });
  },
  fetchMessages: async (sender, receiver) => {
    const response = await axios.get(`/api/messages/${sender}/${receiver}`);
    return set({ message: response?.data });
  },
  sendMessage: async (message, sender, receiver) => {
    await axios.post(`/api/messages/${receiver}`, {
      message,
      sender,
      receiver,
    });
  },
  addMessage: (message, sender, receiver) =>
    set((state) => ({
      message: [
        ...state.message,
        {
          message,
          sender,
          receiver,
        },
      ],
    })),
  deleteMessage: async (sender, receiver) => {
    await axios.get(`/api/messages/delete/${sender}/${receiver}`);
    set({ message: [] });
  },
}));

export default useMessage;
