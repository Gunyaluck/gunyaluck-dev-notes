import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../common/LoadingSpinner";

function ProtectedRoute({ children, isloading, isauthenticated, userRole, requiredRole }) {
  if (isloading === null || isloading) {
    return <LoadingSpinner />;
  }
  if (!isauthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole != null && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;