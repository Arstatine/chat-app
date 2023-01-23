import { Routes, Route } from 'react-router-dom';

import Home from '../views';
import LoginPage from '../views/login';
import RegisterPage from '../views/register';
import NotFound from '../views/error';
import ChatList from '../views/chat-list/ChatList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='chat-list' element={<ChatList />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
