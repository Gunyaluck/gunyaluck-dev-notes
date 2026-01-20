import { useNavigate } from "react-router-dom";

export function AuthFooter({ type = "signup" }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (type === "signup") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <span className="body-1-brown-400">
        {type === "signup" ? "Already have an account?" : "Don't have any account?"}
      </span>
      <a
        onClick={handleNavigate}
        className="body-1-brown-600 underline hover:text-brown-500 transition-colors cursor-pointer"
      >
        {type === "signup" ? "Log in" : "Sign up"}
      </a>
    </div>
  );
}
