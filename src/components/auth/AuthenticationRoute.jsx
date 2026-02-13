import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../common/LoadingSpinner";

function AuthenticationRoute({ children, isloading, isauthenticated }) {
    if (isloading === null || isloading) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="min-h-screen md:p-8">
                    <LoadingSpinner />
                </div>
            </div>
        )
    }

if (!isauthenticated) {
    return <Navigate to="/login" replace />;
}

return children;
}

export default AuthenticationRoute;