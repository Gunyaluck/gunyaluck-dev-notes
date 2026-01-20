import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";
import { AuthFooter } from "./AuthFooter";
import { Button } from "../common/Button";

export function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const checkEmailExists = (email) => {
    // Check if email exists in localStorage
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

  const validateForm = () => {
    const { name, username, email, password } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email must be a valid email";
    } else if (checkEmailExists(email)) {
      newErrors.email = "Email is already taken, Please try another email.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save user data to localStorage for login state
      const userData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        avatar: null, // Can be updated later
      };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      
      // Add email to registered emails list
      const registeredEmails = localStorage.getItem("registeredEmails");
      let emails = [];
      if (registeredEmails) {
        try {
          emails = JSON.parse(registeredEmails);
        } catch (error) {
          console.error("Error parsing registered emails:", error);
        }
      }
      if (!emails.includes(formData.email.toLowerCase())) {
        emails.push(formData.email.toLowerCase());
        localStorage.setItem("registeredEmails", JSON.stringify(emails));
      }
      
      // Store username with email mapping for login
      const userCredentials = localStorage.getItem("userCredentials");
      let credentials = {};
      if (userCredentials) {
        try {
          credentials = JSON.parse(userCredentials);
        } catch (error) {
          console.error("Error parsing user credentials:", error);
        }
      }
      credentials[formData.email.toLowerCase()] = {
        username: formData.username,
        name: formData.name,
      };
      localStorage.setItem("userCredentials", JSON.stringify(credentials));
      
      navigate("/success");
    }
  };


  return (
    <div className="w-full flex items-center justify-center px-4 my-15">
      <div className="w-full bg-brown-200 rounded-2xl px-6 py-15 flex flex-col gap-6 lg:w-[798px] lg:px-30 lg:pt-20 lg:pb-24">
        <h1 className="text-headline-2 text-center text-brown-600">
          Sign up
        </h1>

          <form
            className="flex flex-col gap-6 items-center"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="body-1-brown-400">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Full name"
                className={`w-full h-12 px-4 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                value={formData.name}
                onChange={handleInputChange}
              />
              <ErrorMessage message={errors.name} />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="username" className="body-1-brown-400">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                className={`w-full h-12 px-4 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  errors.username
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                value={formData.username}
                onChange={handleInputChange}
              />
              <ErrorMessage message={errors.username} />
            </div>

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
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ||
                  (formData.email && checkEmailExists(formData.email))
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                value={formData.email}
                onChange={handleInputChange}
                onInvalid={(e) => e.preventDefault()}
              />
              <ErrorMessage 
                message={
                  errors.email || 
                  (formData.email && checkEmailExists(formData.email))
                    ? errors.email || "Email is already taken, Please try another email."
                    : (formData.email &&
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                    ? "Email must be a valid email"
                    : null
                } 
              />
            </div>

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
                    <EyeOff className="w-5 h-5 text-brown-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-brown-400" />
                  )}
                </button>
              </div>
              <ErrorMessage 
                message={
                  errors.password || 
                  (formData.password && formData.password.length < 6
                    ? "Password must be at least 6 characters"
                    : null)
                } 
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              width="141"
            >
              Sign up
            </Button>
          </form>

          <AuthFooter type="signup" />
      </div>
    </div>
  );
}
