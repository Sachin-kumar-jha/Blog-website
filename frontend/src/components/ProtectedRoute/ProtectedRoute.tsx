import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children:ReactNode}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
