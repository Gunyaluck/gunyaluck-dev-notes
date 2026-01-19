import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LandingPage } from "./page/LandingPage";
import { SignUpPage } from "./page/SignUpPage";
import { LoginPage } from "./page/LoginPage";
import { SuccessMessage } from "./components/auth/SuccessMessage";
import { ViewArticlePage } from "./page/ViewArticlePage";
  
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/post/:postId" element={<ViewArticlePage />} />
      </Routes>
      <Toaster position="bottom-right" className="hidden lg:block" />
    </BrowserRouter>
  );
}

export default App;
