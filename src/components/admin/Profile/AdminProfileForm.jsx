import { useEffect, useState } from "react";
import { User, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../common/Button";
import { Input } from "../../ui/input";
import { useAuth } from "../../../contexts/authentication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AdminProfileForm() {
  const { user, fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
  });

  const [save, setSaveing] = useState(false);

  useEffect (() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
      });
    }
  },[user])

  const [profilePicture, setProfilePicture] = useState(
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=100&h=100&fit=crop"
  );
  const [profilePicturePreview, setProfilePicturePreview] = useState(profilePicture);

  const handleInputChange = (field, value) => {
    if (field === "bio" && value.length > 120) {
      return; // Prevent exceeding max length
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Save profile:", formData);
    // TODO: Implement save functionality
    
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
          className="shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Save
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
                {profilePicturePreview ? (
                  <img
                    src={profilePicturePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-brown-400" />
                )}
              </div>
              <div className="flex-1 flex items-start">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="md"
                    type="button"
                    className="shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload profile picture
                  </Button>
                </label>
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
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full h-12 border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
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
