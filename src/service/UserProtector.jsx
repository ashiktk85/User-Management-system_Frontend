import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserProtector = ({ children }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      navigate('/login', {
        state: { message: 'Authorization failed' },
        replace: true,
      });
    }
  }, [navigate, user]);

  return user ? <>{children}</> : null;
};

export default UserProtector;
