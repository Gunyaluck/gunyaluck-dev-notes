import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, RotateCcw, Eye, EyeOff } from "lucide-react";
import { Button } from "../../common/Button";
import { ErrorMessage } from "../../auth/ErrorMessage";
import { ResetPasswordModal } from "./ResetPasswordModal";

export function ResetPasswordForm() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Load user data from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = "Current password is required";
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your new password";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Show modal for confirmation
            setShowModal(true);
        }
    };

    const handleConfirmReset = () => {
        // Here you would typically call an API to reset the password
        // For now, we'll just show a success message and redirect
        console.log("Password reset successful");
        setShowModal(false);
        // You can add a success toast here
        navigate("/profile");
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <div className="w-full min-h-screen bg-brown-100">
            <div className="w-full max-w-7xl mx-auto px-4 pb-8 lg:px-30">
                {/* Navigation Tabs - Mobile */}
                <div className="flex items-center gap-6 mb-6 lg:hidden">
                    <Button
                        variant="text"
                        onClick={handleProfileClick}
                        className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent text-brown-400 hover:text-brown-600 transition-colors no-underline!"
                    >
                        <User className="w-5 h-5" />
                        <span className="body-1-brown-400">Profile</span>
                    </Button>
                    <Button
                        variant="text"
                        className="flex items-center gap-2 px-4 py-3 border-b-2 border-brown-600 text-brown-600 transition-colors hover:text-brown-600 no-underline!"
                    >
                        <RotateCcw className="w-5 h-5" />
                        <span className="body-1-brown-600 font-medium">Reset password</span>
                    </Button>
                </div>

                {/* Profile Summary Section - Mobile */}
                <div className="flex items-center gap-3 mb-6 lg:hidden">
                    <div className="w-12 h-12 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name || "User"}
                                className="w-11 h-11 object-cover"
                            />
                        ) : (
                            <User className="w-6 h-6 text-brown-600" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-headline-4-brown-400">
                            {(() => {
                                const name = user?.name || "User";
                                return name.length > 6 ? name.substring(0, 6) + "..." : name;
                            })()}
                        </span>
                        <span className="text-brown-400">|</span>
                        <span className="text-headline-4">
                            Reset password
                        </span>
                    </div>
                </div>

                {/* Desktop Layout - Sidebar + Content */}
                <div className="hidden lg:flex flex-col lg:gap-8">
                    {/* Profile Summary Section - Desktop */}
                    <div className="flex items-center gap-4 mt-13">
                        <div className="w-12 h-12 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name || "User"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-6 h-6 text-brown-600" />
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-headline-4-brown-400">
                                {(() => {
                                    const name = user?.name || "User";
                                    return name.length > 6 ? name.substring(0, 6) + "..." : name;
                                })()}
                            </span>
                            <span className="text-brown-400">|</span>
                            <span className="text-headline-4">
                                Reset password
                            </span>
                        </div>
                    </div>

                    {/* Left Sidebar - Desktop */}
                    <div className="hidden lg:flex">
                        <div className="w-[200px] shrink-0 flex flex-col gap-2">
                            <Button
                                variant="text"
                                onClick={handleProfileClick}
                                className="flex items-center gap-2 px-4 py-3 border-l-4 border-transparent text-brown-400 hover:text-brown-600 transition-colors no-underline! justify-start"
                            >
                                <User className="w-5 h-5" />
                                <span className="body-1-brown-400">Profile</span>
                            </Button>
                            <Button
                                variant="text"
                                className="flex items-center gap-2 px-4 py-3 border-l-4 border-brown-600 text-brown-600 transition-colors hover:text-brown-600 no-underline! justify-start"
                            >
                                <RotateCcw className="w-5 h-5" />
                                <span className="body-1-brown-600 font-medium">Reset password</span>
                            </Button>
                        </div>

                        {/* Right Content Area - Desktop */}
                        <div className="flex-1">
                            {/* Main Content */}
                            <div className="w-full max-w-2xl lg:pl-6">
                                <div className="bg-white rounded-2xl p-6 flex flex-col gap-8 lg:p-10">
                                    {/* Form Fields */}
                                    <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-10">
                            {/* Current Password Field */}
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="currentPassword" className="body-1-brown-400">
                                    Current password
                                </label>
                                <div className="relative">
                                    <input
                                        id="currentPassword"
                                        name="currentPassword"
                                        type={showCurrentPassword ? "text" : "password"}
                                        placeholder="Current password"
                                        className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${errors.currentPassword
                                                ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                                                : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                                            }`}
                                        value={formData.currentPassword}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors"
                                        aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                    >
                                        {showCurrentPassword ? (
                                            <Eye className="w-5 h-5 text-brown-400" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-brown-400" />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage message={errors.currentPassword} />
                            </div>

                            {/* New Password Field */}
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="newPassword" className="body-1-brown-400">
                                    New password
                                </label>
                                <div className="relative">
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="New password"
                                        className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${errors.newPassword
                                                ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                                                : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                                            }`}
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors"
                                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                                    >
                                        {showNewPassword ? (
                                            <Eye className="w-5 h-5 text-brown-400" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-brown-400" />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage message={errors.newPassword} />
                            </div>

                            {/* Confirm New Password Field */}
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="confirmPassword" className="body-1-brown-400">
                                    Confirm new password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${errors.confirmPassword
                                                ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                                                : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                                            }`}
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? (
                                            <Eye className="w-5 h-5 text-brown-400" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-brown-400" />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage message={errors.confirmPassword} />
                            </div>

                                        {/* Reset Password Button */}
                                        <div className="w-full flex justify-start">
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                size="md"
                                                width="207"
                                            >
                                                Reset password
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout - Keep original structure */}
                <div className="lg:hidden">
                    <div className="w-full max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-8">
                            {/* Form Fields */}
                            <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-10">
                                {/* Current Password Field */}
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="currentPassword-mobile" className="body-1-brown-400">
                                        Current password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="currentPassword-mobile"
                                            name="currentPassword"
                                            type={showCurrentPassword ? "text" : "password"}
                                            placeholder="Current password"
                                            className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${errors.currentPassword
                                                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                                                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                                                }`}
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors"
                                            aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                        >
                                            {showCurrentPassword ? (
                                                <Eye className="w-5 h-5 text-brown-400" />
                                            ) : (
                                                <EyeOff className="w-5 h-5 text-brown-400" />
                                            )}
                                        </button>
                                    </div>
                                    <ErrorMessage message={errors.currentPassword} />
                                </div>

                                {/* New Password Field */}
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="newPassword-mobile" className="body-1-brown-400">
                                        New password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="newPassword-mobile"
                                            name="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="New password"
                                            className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${errors.newPassword
                                                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                                                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                                                }`}
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors"
                                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                                        >
                                            {showNewPassword ? (
                                                <Eye className="w-5 h-5 text-brown-400" />
                                            ) : (
                                                <EyeOff className="w-5 h-5 text-brown-400" />
                                            )}
                                        </button>
                                    </div>
                                    <ErrorMessage message={errors.newPassword} />
                                </div>

                                {/* Confirm New Password Field */}
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="confirmPassword-mobile" className="body-1-brown-400">
                                        Confirm new password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword-mobile"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${errors.confirmPassword
                                                    ? "border-red-500 focus:border-red-500 focus-visible:border-red-500"
                                                    : "border-brown-300 focus:border-brown-500 focus-visible:border-brown-500"
                                                }`}
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? (
                                                <Eye className="w-5 h-5 text-brown-400" />
                                            ) : (
                                                <EyeOff className="w-5 h-5 text-brown-400" />
                                            )}
                                        </button>
                                    </div>
                                    <ErrorMessage message={errors.confirmPassword} />
                                </div>

                                {/* Reset Password Button */}
                                <div className="w-full flex justify-start">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="md"
                                        width="207"
                                    >
                                        Reset password
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reset Password Modal */}
            <ResetPasswordModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmReset}
            />
        </div>
    );
}
