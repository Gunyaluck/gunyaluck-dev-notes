import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../common/LoadingSpinner";

function GuestRoute({ children, isloading, isauthenticated }) {
  if (isloading === null || isloading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isauthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;
