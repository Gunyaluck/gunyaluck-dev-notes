import { useEffect, useState, useRef } from "react";
import { User, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../common/Button";
import { Input } from "../../ui/input";
import { useAuth } from "../../../contexts/authentication";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AdminProfileForm() {
  const { user, fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
  });

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
      });
      
      // ดึงรูปภาพจาก profilePic หรือ avatar (ใช้ field เดียวกันกับ Header.jsx)
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

  const handleInputChange = (field, value) => {
    if (field === "bio" && value.length > 120) {
      return; // Prevent exceeding max length
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleSave = async() => {
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
          
          // ใช้ endpoint ที่ถูกต้องสำหรับอัพโหลด profile picture
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
          // ใช้ field เดียวกันกับ Header.jsx
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
          bio: formData.bio.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      await fetchUser();
      toast.success("Saved profile", {
        description: "Your profile has been successfully updated",
        duration: 5000,
        style: {
          background: "var(--color-brand-green)",
          color: "white",
          borderRadius: "8px",
          border: "none",
          width: "700px",
          maxWidth: "700px",
        },
        classNames: {
          toast: "draft-success-toast",
          title: "text-headline-4 font-semibold text-white",
          description: "body-2 text-white",
          closeButton: "text-white hover:text-brown-100",
        },
      });
    } catch (error) {
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
      
      // Handle 500 errors - backend might not support FormData for profile update
      if (error.response?.status === 500) {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            "Server error. The backend may not support image upload for profile updates.";
        
        toast.error(errorMessage, {
          description: "Please check if the backend supports multipart/form-data for profile updates, or try updating without an image.",
          duration: 7000,
        });
        setSaving(false);
        return;
      }
      
      toast.error(
        error.response?.data?.error || 
        error.response?.data?.message || 
        "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-headline-2 text-brown-600">Profile</h1>
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={saving}
          className="shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-brown-300 p-8 shadow-md">
        <div className="flex flex-col gap-6">
          {/* Profile Picture */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-600 font-semibold">Profile picture</label>
            <div className="flex items-center gap-7">
              <div className="w-[120px] h-[120px] rounded-full bg-brown-200 border border-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                {profilePicturePreview && !imageError ? (
                  <img
                    src={profilePicturePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => {
                      console.error("Failed to load profile image:", profilePicturePreview);
                      setImageError(true);
                    }}
                    onLoad={() => setImageError(false)}
                  />
                ) : (
                  <User className="w-12 h-12 text-brown-400" />
                )}
              </div>
              <div className="flex-1 flex items-start">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={handleUploadButtonClick}
                  className="shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload profile picture
                </Button>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Name</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full h-12 border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Username</label>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full h-12 border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Email</label>
            <Input
              type="email"
              value={formData.email}
              readOnly
              className="w-full h-12 border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 opacity-60 cursor-not-allowed"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">
              Bio (max 120 letters)
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              maxLength={120}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300 resize-none"
            />
            <div className="flex justify-end">
              <span className={`body-3 ${formData.bio.length >= 120 ? "text-brand-red" : "text-brown-400"}`}>
                {formData.bio.length}/120
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
