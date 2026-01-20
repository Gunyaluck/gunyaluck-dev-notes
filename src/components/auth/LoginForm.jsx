import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AlertIncorrect, showErrorToast } from "../common/Toast";
import { Eye, EyeOff } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";
import { AuthFooter } from "./AuthFooter";
import { Button } from "../common/Button";

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

  const checkEmailRegistered = (email) => {
    // Check if email exists in registeredEmails
    const registeredEmails = localStorage.getItem("registeredEmails");
    if (registeredEmails) {
      try {
        const emails = JSON.parse(registeredEmails);
        return emails.includes(email.toLowerCase());
      } catch (error) {
        console.error("Error parsing registered emails:", error);
      }
    }
    
    // Also check if current user has this email
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser);
        return userData.email?.toLowerCase() === email.toLowerCase();
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // First, check if email is registered in localStorage
    if (checkEmailRegistered(formData.email)) {
      // Email is registered, allow login using localStorage
      const currentUser = localStorage.getItem("user");
      let userData;
      
      if (currentUser) {
        try {
          userData = JSON.parse(currentUser);
          // If stored user email matches, update username from credentials if available
          if (userData.email?.toLowerCase() === formData.email.toLowerCase()) {
            // Try to get username from credentials
            const userCredentials = localStorage.getItem("userCredentials");
            if (userCredentials) {
              try {
                const credentials = JSON.parse(userCredentials);
                const cred = credentials[formData.email.toLowerCase()];
                if (cred && cred.username) {
                  // Update userData with username from credentials
                  userData.username = cred.username;
                  if (cred.name) {
                    userData.name = cred.name;
                  }
                  localStorage.setItem("user", JSON.stringify(userData));
                }
              } catch (error) {
                console.error("Error parsing user credentials:", error);
              }
            }
            localStorage.setItem("isLoggedIn", "true");
            navigate("/member-landing-page");
            return;
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
      
      // If no user data or email doesn't match, try to get username from credentials
      const userCredentials = localStorage.getItem("userCredentials");
      let username = null;
      let name = formData.email.split("@")[0];
      
      if (userCredentials) {
        try {
          const credentials = JSON.parse(userCredentials);
          const cred = credentials[formData.email.toLowerCase()];
          if (cred) {
            username = cred.username;
            name = cred.name || name;
          }
        } catch (error) {
          console.error("Error parsing user credentials:", error);
        }
      }
      
      userData = {
        name: name,
        username: username,
        email: formData.email,
        avatar: null,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      navigate("/member-landing-page");
      return;
    }

    // If email not found in localStorage, show error
    // TODO: Add backend API call later
    if (isMobile) {
      // Mobile: Show red border on input fields only
      setErrors({
        email: "error",
        password: "error",
      });
    } else {
      // Desktop: Show red border on input fields and AlertIncorrect toast
      setErrors({
        email: "error",
        password: "error",
      });
      setShowAlertIncorrect(true);
    }
  };

  const navigate = useNavigate();


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
            >
              Log in
            </Button>
          </form>

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
