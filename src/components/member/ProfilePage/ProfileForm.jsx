import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { User, RotateCcw, Upload } from "lucide-react";
import { Button } from "../../common/Button";
import { showSuccessToast } from "../../common/Toast";

export function ProfileForm() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Load user data from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setFormData({
                    name: parsedUser.name || "",
                    username: parsedUser.username || "",
                    email: parsedUser.email || "",
                });
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Update user data in localStorage
        const updatedUser = {
            ...user,
            ...formData,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Also update userCredentials if email changed
        if (user?.email && user.email !== formData.email) {
            const userCredentials = localStorage.getItem("userCredentials");
            if (userCredentials) {
                try {
                    const credentials = JSON.parse(userCredentials);
                    if (credentials[user.email.toLowerCase()]) {
                        credentials[formData.email.toLowerCase()] = credentials[user.email.toLowerCase()];
                        delete credentials[user.email.toLowerCase()];
                        localStorage.setItem("userCredentials", JSON.stringify(credentials));
                    }
                } catch (error) {
                    console.error("Error updating credentials:", error);
                }
            }
        }

        setUser(updatedUser);

        // Show success toast with green background and white text
        showSuccessToast("Saved profile", "Your profile has been successfully updated", true);
    };

    const handleUploadPicture = () => {
        // Handle profile picture upload
        // This is a placeholder - you can implement file upload logic here
        console.log("Upload profile picture");
    };

    return (
        <div className="w-full min-h-screen bg-brown-100">
            <div className="w-full max-w-7xl mx-auto px-4 pb-8 lg:px-30">
                {/* Navigation Tabs - Mobile */}
                <div className="flex items-center gap-6 mb-6 lg:hidden">
                    <Button
                        variant="text"
                        className="flex items-center gap-2 px-4 py-3 border-b-2 border-brown-600 text-brown-600 transition-colors hover:text-brown-600 no-underline!"
                    >
                        <User className="w-5 h-5" />
                        <span className="body-1-brown-600 font-medium">Profile</span>
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => navigate("/reset-password")}
                        className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent text-brown-400 hover:text-brown-600 transition-colors no-underline!"
                    >
                        <RotateCcw className="w-5 h-5" />
                        <span className="body-1-brown-400">Reset password</span>
                    </Button>
                </div>

                {/* Profile Summary Section - Mobile */}
                <div className="flex items-center gap-4 mb-8 lg:hidden">
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
                            {user?.name || "User"}
                        </span>
                        <span className="text-brown-400">|</span>
                        <span className="text-headline-4">
                            Profile
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
                                {user?.name || "User"}
                            </span>
                            <span className="text-brown-400">|</span>
                            <span className="text-headline-4">
                                Profile
                            </span>
                        </div>
                    </div>

                    {/* Left Sidebar - Desktop */}
                    <div className="hidden lg:flex">
                        <div className="w-[200px] shrink-0 flex flex-col gap-2">
                            <Button
                                variant="text"
                                className="flex items-center gap-2 px-4 py-3 border-l-4 border-brown-600 text-brown-600 transition-colors hover:text-brown-600 no-underline! justify-start"
                            >
                                <User className="w-5 h-5" />
                                <span className="body-1-brown-600 font-medium">Profile</span>
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => navigate("/reset-password")}
                                className="flex items-center gap-2 px-4 py-3 border-l-4 border-transparent text-brown-400 hover:text-brown-600 transition-colors no-underline! justify-start"
                            >
                                <RotateCcw className="w-5 h-5" />
                                <span className="body-1-brown-400">Reset password</span>
                            </Button>
                        </div>

                        {/* Right Content Area - Desktop */}
                        <div className="flex-1">
                            {/* Profile Summary Section - Desktop */}

                            {/* Main Content */}
                            <div className="w-full max-w-2xl lg:pl-6">
                                <div className="bg-white rounded-2xl p-6 flex flex-col gap-8 lg:p-10">
                                    {/* Profile Picture Section - Desktop: Horizontal Layout */}
                                    <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:gap-6">
                                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                                            {user?.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name || "User"}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-16 h-16 lg:w-20 lg:h-20 text-brown-600" />
                                            )}
                                        </div>
                                        <Button
                                            onClick={handleUploadPicture}
                                            variant="upload"
                                            className="lg:mt-4"
                                        >
                                            Upload profile picture
                                        </Button>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="w-full flex flex-col gap-6">
                                        {/* Name Field */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <label htmlFor="name" className="body-1-brown-400">
                                                Name
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-brown-500 focus-visible:border-brown-500"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        {/* Username Field */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <label htmlFor="username" className="body-1-brown-400">
                                                Username
                                            </label>
                                            <Input
                                                id="username"
                                                name="username"
                                                type="text"
                                                className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-brown-500 focus-visible:border-brown-500"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div className="flex flex-col gap-2 w-full">
                                            <label htmlFor="email" className="body-1-brown-400">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-brown-500 focus-visible:border-brown-500 opacity-60"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="w-full flex justify-start">
                                        <Button
                                            onClick={handleSave}
                                            variant="primary"
                                            width="120"
                                            className="lg:w-auto px-8"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout - Keep original structure */}
                <div className="lg:hidden">
                    <div className="w-full max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-8">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name || "User"}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-16 h-16 text-brown-600" />
                                    )}
                                </div>
                                <Button
                                    onClick={handleUploadPicture}
                                    variant="upload"
                                >
                                    Upload profile picture
                                </Button>
                            </div>

                            {/* Form Fields */}
                            <div className="w-full flex flex-col gap-6">
                                {/* Name Field */}
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="name-mobile" className="body-1-brown-400">
                                        Name
                                    </label>
                                    <Input
                                        id="name-mobile"
                                        name="name"
                                        type="text"
                                        className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-brown-500 focus-visible:border-brown-500"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Username Field */}
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="username-mobile" className="body-1-brown-400">
                                        Username
                                    </label>
                                    <Input
                                        id="username-mobile"
                                        name="username"
                                        type="text"
                                        className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-brown-500 focus-visible:border-brown-500"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="email-mobile" className="body-1-brown-400">
                                        Email
                                    </label>
                                    <Input
                                        id="email-mobile"
                                        name="email"
                                        type="email"
                                        className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-brown-500 focus-visible:border-brown-500 opacity-60"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="w-full flex justify-start">
                                <Button
                                    onClick={handleSave}
                                    variant="primary"
                                    width="120"
                                    className="px-8"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
