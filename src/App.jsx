import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LandingPage } from "./page/LandingPage";
import { SignUpPage } from "./page/SignUpPage";
import { LoginPage } from "./page/LoginPage";
import { SuccessMessage } from "./components/auth/SuccessMessage";
import { ViewArticlePage } from "./page/ViewArticlePage";
import { ProfilePage } from "./page/ProfilePage";
import { ResetPasswordPage } from "./page/ResetPasswordPage";
import { AdminLandingPage } from "./page/admin/AdminLandingPage";
import { AdminLoginPage } from "./page/admin/AdminLoginPage";
import { ArticleManagementPage } from "./page/admin/ArticleManagementPage";
import { CreateArticlePage } from "./page/admin/CreateArticlePage";
  
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/post/:postId" element={<ViewArticlePage />} />
        <Route path="/member-landing-page" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin-landing-page" element={<AdminLandingPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin/article-management" element={<ArticleManagementPage />} />
        <Route path="/admin/create-article" element={<CreateArticlePage />} />
        <Route path="/admin/edit-article/:id" element={<CreateArticlePage />} />
      </Routes>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
