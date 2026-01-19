import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertIncorrect } from "../layout/AlertIncorrect";

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showAlertIncorrect, setShowAlertIncorrect] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email must be a valid email";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://blog-post-project-api.vercel.app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        console.log("Login successful:", data);
        // Navigate to home page or dashboard
        navigate("/");
      } else {
        // Login failed - show incorrect alert
        setShowAlertIncorrect(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      // Show alert on error
      setShowAlertIncorrect(true);
    }
  };

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full flex items-center justify-center px-4 my-15">
      <div className="w-full bg-brown-200 rounded-2xl px-6 py-15 flex flex-col gap-6 lg:w-[798px] lg:h-[540px] lg:px-30 lg:pt-20 lg:pb-0">
          {/* Title */}
          <h1 className="text-headline-2 text-center text-brown-600">Log in</h1>

          {/* Form Fields */}
          <form
            className="flex flex-col gap-6 items-center"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Email Field */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="body-1-brown-400">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full h-12 px-4 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  errors.email ||
                  (formData.email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {(errors.email ||
                (formData.email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))) && (
                <p className="text-red-500 text-sm">
                  {errors.email || "Email must be a valid email"}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password" className="body-1-brown-400">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className={`w-full h-12 px-4 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                value={formData.password}
                onChange={handleInputChange}
                onInvalid={(e) => e.preventDefault()}
              />
              {(errors.password ||
                (formData.password && formData.password.length < 6)) && (
                <p className="text-red-500 text-sm">
                  {errors.password || "Password must be at least 6 characters"}
                </p>
              )}
            </div>

            {/* Log in Button */}
            <button
              type="submit"
              className="w-[141px] h-12 bg-brown-600 rounded-[999px] body-1-white hover:bg-brown-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Log in
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="flex items-center gap-2 w-full justify-center">
            <span className="body-1-brown-400">Don't have any account?</span>
            <a
              onClick={handleSignUpClick}
              className="body-1-brown-600 underline hover:text-brown-500 transition-colors cursor-pointer"
            >
              Sign up
            </a>
        </div>
      </div>

      {/* Alert Incorrect */}
      <AlertIncorrect
        isOpen={showAlertIncorrect}
        onClose={() => setShowAlertIncorrect(false)}
      />
    </div>
  );
}
