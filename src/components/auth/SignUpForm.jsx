import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";
import { AuthFooter } from "./AuthFooter";
import { Button } from "../common/Button";
import { useAuth } from "../../contexts/authentication";

export function SignUpForm() {
  const { register, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
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

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) return;

    await register({
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
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
                  formErrors.name
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                disabled={loading}
                value={formData.name}
                onChange={handleInputChange}
              />
              <ErrorMessage message={formErrors.name} />
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
                  formErrors.username
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                disabled={loading}
                value={formData.username}
                onChange={handleInputChange}
              />
              <ErrorMessage message={formErrors.username} />
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
                  formErrors.email ||
                  (formData.email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                }`}
                disabled={loading}
                value={formData.email}
                onChange={handleInputChange}
                onInvalid={(e) => e.preventDefault()}
              />
              <ErrorMessage
                message={
                  formErrors.email ||
                  (formData.email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                    ? formErrors.email || "Email must be a valid email"
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
                    formErrors.password ||
                    (formData.password && formData.password.length < 6)
                      ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                      : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                  }`}
                  disabled={loading}
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
              <ErrorMessage
                message={
                  formErrors.password ||
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
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : "Sign up"}
            </Button>
          </form>

          {error && (
            <div className="w-full mt-4 text-center">
              <span className="body-1-brown-400 text-brand-red">
                {error}
              </span>
            </div>
          )}

          <AuthFooter type="signup" />
      </div>
    </div>
  );
}
