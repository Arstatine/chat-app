import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useUser = create((set) => ({
  users: null,
  auth: null,
  fetchAllUsers: async () => {
    const response = await axios.get('/api/users/all');
    set({ users: await response?.data?.findUser });
  },
  searchUsers: async (key) => {
    const response = await axios.get(`/api/users/search/${key}`);
    if (response?.data?.findUser?.length)
      return set({ users: await response?.data?.findUser });
    set({ users: null });
  },
  fetchUser: async () => {
    const response = await axios.get(`/api/users`);
    set({ auth: response?.data });
  },
}));

export default useUser;
