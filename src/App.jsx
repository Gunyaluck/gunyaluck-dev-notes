import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LandingPage } from "./page/LandingPage";
import { SignUpForm } from "./components/auth/SignUpForm";
import { LoginForm } from "./components/auth/LoginForm";
import { ViewArticlePage } from "./page/ViewArticlePage";
  
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/post/:postId" element={<ViewArticlePage />} />
      </Routes>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
