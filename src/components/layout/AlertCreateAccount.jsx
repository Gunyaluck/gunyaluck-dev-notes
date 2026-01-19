import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export function AlertCreateAccount({ isOpen, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleCreateAccount = () => {
        navigate("/signup");
        if (onClose) onClose();
    };

    const handleLogIn = () => {
        navigate("/login");
        if (onClose) onClose();
    };

    return (
        <>
            {/* Backdrop with blur */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg w-[343px] h-[272px] relative shadow-xl lg:w-[621px] lg:h-[352px]">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-brown-100 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-brown-600 cursor-pointer lg:w-6 lg:h-6"/>
                    </button>

                    {/* Modal content */}
                    <div className="flex flex-col items-center justify-center gap-4 py-15 lg:gap-10">
                        {/* Heading */}
                        <p className="text-headline-3 lg:text-headline-2 lg:w-[573px] text-center">
                            Create an account to continue
                        </p>

                        {/* Create account button */}
                        <button
                            onClick={handleCreateAccount}
                            className="w-[207px] py-3 px-6 bg-brown-600 rounded-full text-white body-1-white font-semibold hover:bg-brown-500 transition-colors"
                        >
                            Create account
                        </button>

                        {/* Log in link */}
                        <div className="text-center">
                            <span className="body-1-brown-400">
                                Already have an account?{" "}
                            </span>
                            <button
                                onClick={handleLogIn}
                                className="body-1-brown-600 underline hover:text-brand-green transition-colors"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}