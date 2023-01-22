import { Routes, Route } from 'react-router-dom';

import Home from '../views';
import LoginPage from '../views/login';
import RegisterPage from '../views/register';
import NotFound from '../views/error';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
