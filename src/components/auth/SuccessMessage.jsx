import NavBar from "../layout/Header";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SuccessMessage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to member landing page (user is already logged in)
    navigate("/member-landing-page");
  };

  return (
    <>
      <NavBar />
      <div className="w-full flex justify-center px-4 py-15">
        <div className="w-full bg-brown-200 rounded-2xl px-6 py-15 flex flex-col items-center justify-center gap-10 lg:w-[798px] lg:px-30 lg:py-20">
          {/* Success Icon */}
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-brand-green flex items-center justify-center">
            <Check className="w-10 h-10 lg:w-12 lg:h-12 text-white stroke-3" />
          </div>

          {/* Success Message */}
          <h1 className="text-headline-3 text-center text-brown-600 font-semibold lg:text-headline-2">
            Registration success
          </h1>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-[154px] h-12 bg-brown-600 rounded-full body-1-white hover:bg-brown-500 transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
