import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../../ui/input";
import { User, RotateCcw, Upload } from "lucide-react";
import { Button } from "../../common/Button";
import { showSuccessToast } from "../../common/Toast";
import { useAuth } from "../../../contexts/authentication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function ProfileForm() {
    const { user, fetchUser } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
    });

    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [imageError, setImageError] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                username: user.username || "",
                email: user.email || "",
            });
            const imageUrl = user.profilePic || user.avatar || user.profile_pic;
            setProfilePicturePreview(imageUrl || null);
        } else {
            // Reset form when user is null
            setFormData({
                name: "",
                username: "",
                email: "",
                bio: "",
            });
            setProfilePicturePreview(null);
        }
    }, [user]);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please select an image file");
                return;
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                toast.error("Image size must be less than 5MB");
                return;
            }

            // Store the file for upload
            setProfilePictureFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result);
            };
            reader.onerror = () => {
                toast.error("Failed to read image file");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Authentication required. Please login again.");
            return;
        }

        setSaving(true);
        try {
            // อัพโหลดรูปภาพก่อน (ถ้ามี)
            if (profilePictureFile) {
                try {
                    const imageFormData = new FormData();
                    imageFormData.append("profilePicture", profilePictureFile);
                    
                    // ใช้ endpoint สำหรับอัพโหลด profile picture
                    await axios.patch(
                        `${API_BASE_URL}/auth/profile-picture`,
                        imageFormData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    
                    console.log("Successfully uploaded profile picture");
                } catch (uploadError) {
                    console.error("Error uploading profile picture:", uploadError);
                    console.error("Upload error response:", uploadError.response?.data);
                    
                    // ถ้าไม่สามารถอัพโหลดรูปภาพได้ ให้แสดง error และหยุดการทำงาน
                    toast.error(
                        uploadError.response?.data?.message || 
                        uploadError.response?.data?.error || 
                        "Failed to upload profile picture",
                        {
                            description: "Please try again or update profile without image.",
                            duration: 5000,
                        }
                    );
                    
                    // Reset file state since upload failed
                    setProfilePictureFile(null);
                    const imageUrl = user?.profilePic || user?.avatar || user?.profile_pic;
                    setProfilePicturePreview(imageUrl || null);
                    
                    setSaving(false);
                    return; // Stop execution if image upload fails
                }
            }
            
            // อัพเดตข้อมูล profile (แยกจากการอัพโหลดรูปภาพ)
            await axios.patch(
                `${API_BASE_URL}/auth/profile`,
                {
                    name: formData.name.trim(),
                    username: formData.username.trim(),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            
            // Reset file state after successful save
            setProfilePictureFile(null);
            
            await fetchUser();
            showSuccessToast("Saved profile", "Your profile has been successfully updated", true);
        } catch (error) {
            console.error("Error updating profile:", error);
            console.error("Error response:", error.response?.data);
            
            // Handle authentication errors
            if (error.response?.status === 401) {
                toast.error("Authentication required. Please login again.");
                localStorage.removeItem("token");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
                setSaving(false);
                return;
            }
            
            showSuccessToast(
                "Error",
                error.response?.data?.error || error.response?.data?.message || "Failed to update profile",
                false
            );
        } finally {
            setSaving(false);
        }
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
                                            {profilePicturePreview && !imageError ? (
                                                <img
                                                    src={profilePicturePreview}
                                                    alt={user?.name || "User"}
                                                    className="w-full h-full object-cover"
                                                    onError={() => {
                                                        console.error("Failed to load profile image:", profilePicturePreview);
                                                        setImageError(true);
                                                    }}
                                                    onLoad={() => setImageError(false)}
                                                />
                                            ) : (
                                                <User className="w-16 h-16 lg:w-20 lg:h-20 text-brown-600" />
                                            )}
                                        </div>
                                        <div className="flex flex-col items-center lg:items-start">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleProfilePictureChange}
                                                className="hidden"
                                            />
                                            <Button
                                                onClick={handleUploadButtonClick}
                                                variant="upload"
                                                className="lg:mt-4"
                                            >
                                                <Upload className="w-5 h-5 mr-2" />
                                                Upload profile picture
                                            </Button>
                                        </div>
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
                                            disabled={saving}
                                        >
                                            {saving ? "Saving..." : "Save"}
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
                                    {profilePicturePreview && !imageError ? (
                                        <img
                                            src={profilePicturePreview}
                                            alt={user?.name || "User"}
                                            className="w-full h-full object-cover"
                                            onError={() => {
                                                console.error("Failed to load profile image:", profilePicturePreview);
                                                setImageError(true);
                                            }}
                                            onLoad={() => setImageError(false)}
                                        />
                                    ) : (
                                        <User className="w-16 h-16 text-brown-600" />
                                    )}
                                </div>
                                <div className="flex flex-col items-center">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        className="hidden"
                                    />
                                    <Button
                                        onClick={handleUploadButtonClick}
                                        variant="upload"
                                    >
                                        <Upload className="w-5 h-5 mr-2" />
                                        Upload profile picture
                                    </Button>
                                </div>
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
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
