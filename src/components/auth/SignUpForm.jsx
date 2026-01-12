import { Input } from "../ui/input";
import NavBar from "../layout/Header";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
    <NavBar />
    <div className="w-full flex items-center justify-center px-4 my-15">  
      <div className="w-full bg-brown-200 rounded-2xl px-6 py-15 flex flex-col gap-6 lg:w-[798px] lg:h-[748px] lg:px-30 lg:pt-20 lg:pb-24">
        {/* Title */}
        <h1 className="text-headline-2 text-center text-brown-600">
          Sign up
        </h1>

        {/* Form Fields */}
        <form className="flex flex-col gap-6 items-center">
          {/* Name Field */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="body-1-brown-600">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Full name"
              className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:outline-none focus:border-brown-500"
            />
          </div>

          {/* Username Field */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username" className="body-1-brown-400">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:outline-none focus:border-brown-500"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="body-1-brown-400">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:outline-none focus:border-brown-500"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className="body-1-brown-400">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:outline-none focus:border-brown-500"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-[141px] h-12 bg-brown-600 rounded-[999px] body-1-white hover:bg-brown-500 transition-colors cursor-pointer"
          >
            Sign up
          </button>
        </form>

        {/* Login Link */}
        <div className="flex items-center gap-2 w-full justify-center">
          <span className="body-1-brown-400">Already have an account?</span>
          <a
            onClick={handleLoginClick}
            className="body-1-brown-600 underline hover:text-brown-500 transition-colors cursor-pointer"
          >
            Log in
          </a>
          </div>
        </div>
      </div>
    </>
  );
}
