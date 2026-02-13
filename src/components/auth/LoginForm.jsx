import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { AlertIncorrect } from "../common/Toast";
import { Eye, EyeOff } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";
import { AuthFooter } from "./AuthFooter";
import { Button } from "../common/Button";
import { useAuth } from "../../contexts/authentication";

export function LoginForm() {
  const { login, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showAlertIncorrect, setShowAlertIncorrect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

    const result = await login(
      formData.email.trim().toLowerCase(),
      formData.password
    );

    if (result?.error) {
      if (isMobile) {
        setErrors({ email: "error", password: "error" });
      } else {
        setErrors({ email: "error", password: "error" });
        setShowAlertIncorrect(true);
      }
    }
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
              {/* Show error message only on mobile and only for validation errors, not login errors */}
              {isMobile && errors.email && errors.email !== "error" && (
                <ErrorMessage 
                  message={
                    errors.email || 
                    (formData.email &&
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                      ? "Email must be a valid email"
                      : null)
                  } 
                />
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password" className="body-1-brown-400">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    errors.password ||
                    (formData.password && formData.password.length < 6)
                      ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                      : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                  }`}
                  value={formData.password}
                  onChange={handleInputChange}
                  onInvalid={(e) => e.preventDefault()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-brown-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-brown-400" />
                  )}
                </button>
              </div>
              {/* Show error message only on mobile and only for validation errors, not login errors */}
              {isMobile && errors.password && errors.password !== "error" && (
                <ErrorMessage 
                  message={
                    errors.password || 
                    (formData.password && formData.password.length < 6
                      ? "Password must be at least 6 characters"
                      : null)
                  } 
                />
              )}
            </div>

            {/* Log in Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              width="141"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          {error && (
            <div className="w-full mt-4 text-center">
              <span className="body-1-brown-400 text-brand-red">{error}</span>
            </div>
          )}

          <AuthFooter type="login" />
      </div>

      {/* Alert Incorrect */}
      <AlertIncorrect
        isOpen={showAlertIncorrect}
        onClose={() => setShowAlertIncorrect(false)}
      />
    </div>
  );
}
