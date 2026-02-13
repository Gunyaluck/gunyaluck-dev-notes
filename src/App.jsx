import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LandingPage } from "./page/LandingPage";
import { SignUpPage } from "./page/SignUpPage";
import { LoginPage } from "./page/LoginPage";
import { SuccessMessage } from "./components/auth/SuccessMessage";
import { ViewArticlePage } from "./page/ViewArticlePage";
import { ProfilePage } from "./page/ProfilePage";
import { ResetPasswordPage } from "./page/ResetPasswordPage";
import { ArticleManagementPage } from "./page/admin/ArticleManagementPage";
import { CreateArticlePage } from "./page/admin/CreateArticlePage";
import { CategoryManagementPage } from "./page/admin/CategoryManagementPage";
import { CreateCategoryPage } from "./page/admin/CreateCategoryPage";
import { AdminProfilePage } from "./page/admin/AdminProfilePage";
import { NotificationPage } from "./page/admin/NotificationPage";
import { AdminResetPasswordPage } from "./page/admin/AdminResetPasswordPage";
import { useAuth } from "./contexts/authentication";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";
import GuestRoute from "./components/auth/GuestRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const { isAuthenticated, getUserLoading, userRole } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={
          <GuestRoute
            isloading={getUserLoading}
            isauthenticated={isAuthenticated}
          >
            <SignUpPage />
          </GuestRoute>
        }
        />
        <Route path="/login" element={
          <GuestRoute
            isloading={getUserLoading}
            isauthenticated={isAuthenticated}
          >
            <LoginPage />
          </GuestRoute>
        }
        />
        <Route path="/signup/success" element={
          <GuestRoute
            isloading={getUserLoading}
            isauthenticated={isAuthenticated}
          >
            <SuccessMessage />
          </GuestRoute>
        }
        />
        <Route path="/post/:postId" element={<ViewArticlePage />} />
        <Route path="/member-landing-page" element={<LandingPage />} />
        <Route path="/profile" element={
          <ProtectedRoute
            isloading={getUserLoading}
            isauthenticated={isAuthenticated}
            userRole={userRole}
            requiredRole="user"
          >
            <ProfilePage />
          </ProtectedRoute>
        }
        />
        <Route path="/reset-password" element={
          <ProtectedRoute
            isloading={getUserLoading}
            isauthenticated={isAuthenticated}
            userRole={userRole}
            requiredRole="user"
          >
            <ResetPasswordPage />
          </ProtectedRoute>
        } />
        <Route path="/admin-landing-page" element={<LandingPage />} />
        <Route path="/admin/article-management" element={<ArticleManagementPage />} />
        <Route path="/admin/create-article" element={<CreateArticlePage />} />
        <Route path="/admin/edit-article/:id" element={<CreateArticlePage />} />
        <Route path="/admin/category-management" element={<CategoryManagementPage />} />
        <Route path="/admin/create-category" element={<CreateCategoryPage />} />
        <Route path="/admin/edit-category/:id" element={<CreateCategoryPage />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
        <Route path="/admin/notification" element={<NotificationPage />} />
        <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
      </Routes>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
