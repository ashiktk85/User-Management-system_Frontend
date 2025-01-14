import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminProtector = ({ children }) => {
  const navigate = useNavigate();
  const admin = localStorage.getItem('admin');

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login', {
        state: { message: 'Authorization failed' },
        replace: true,
      });
    }
  }, [navigate, admin]);

  return admin ? <>{children}</> : null;
};

export default AdminProtector;
