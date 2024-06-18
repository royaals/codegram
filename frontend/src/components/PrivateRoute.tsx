import { Navigate, Route } from 'react-router-dom';

interface ProtectedRouteProps {
  path: string;
  element: React.ReactElement;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, ...props }) => {
  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;