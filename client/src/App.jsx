import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import axios from './lib/axiosConfig';

export const Context = React.createContext();

function App() {
  const [userAuth, setUserAuth] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchUserAuth = async () => {
      const res = await axios.get('/api/users');
      if (res) {
        setUserAuth(res.data?.isLoggedIn);
        setId(res.data?.findUser?._id);
      }
    };

    fetchUserAuth().catch(console.error);
  }, []);

  return (
    <Context.Provider value={{ isLoggedIn: userAuth, _id: id }}>
      <div className='App'>
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </Context.Provider>
  );
}

export default App;
