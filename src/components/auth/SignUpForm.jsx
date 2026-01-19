import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
      // Temporarily skip API check - allow any email to proceed
      navigate("/success");
    }
  };

  const handleSignInClick = () => {
    navigate("/login");
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
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
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
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
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
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                value={formData.email}
                onChange={handleInputChange}
                onInvalid={(e) => e.preventDefault()}
              />
              {(errors.email ||
                (formData.email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))) && (
                <p className="text-red-500 text-sm">
                  {errors.email || "Email must be a valid email"}
                </p>
              )}
            </div>

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
                  errors.password ||
                  (formData.password && formData.password.length < 6)
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

            <button
              type="submit"
              className="w-[141px] h-12 bg-brown-600 rounded-[999px] body-1-white hover:bg-brown-500 transition-colors cursor-pointer"
            >
              Sign up
            </button>
          </form>

          <div className="flex items-center gap-2 w-full justify-center">
            <span className="body-1-brown-400">Already have an account?</span>
            <a
              onClick={handleSignInClick}
              className="body-1-brown-600 underline hover:text-brown-500 transition-colors cursor-pointer"
            >
              Log in
            </a>
        </div>
      </div>
    </div>
  );
}
