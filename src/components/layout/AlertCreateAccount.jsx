import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "../common/Button";

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
                    <Button
                        onClick={onClose}
                        variant="close-dark"
                        className="absolute top-4 right-4"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-brown-600 cursor-pointer lg:w-6 lg:h-6"/>
                    </Button>

                    {/* Modal content */}
                    <div className="flex flex-col items-center justify-center gap-4 py-15 lg:gap-10">
                        {/* Heading */}
                        <p className="text-headline-3 lg:text-headline-2 lg:w-[573px] text-center">
                            Create an account to continue
                        </p>

                        {/* Create account button */}
                        <Button
                            onClick={handleCreateAccount}
                            variant="primary"
                            width="207"
                            className="py-3 px-6 font-semibold"
                        >
                            Create account
                        </Button>

                        {/* Log in link */}
                        <div className="text-center">
                            <span className="body-1-brown-400">
                                Already have an account?{" "}
                            </span>
                            <Button
                                onClick={handleLogIn}
                                variant="text"
                                className="body-1-brown-600 hover:text-brand-green"
                            >
                                Log in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}