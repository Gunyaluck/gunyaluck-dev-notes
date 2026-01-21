import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../common/Button";
import { Input } from "../../ui/input";
import { ResetPasswordModal } from "../../common/ResetPasswordModal";

export function AdminResetPasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.currentPassword.trim()) {
      toast.error("Current password is required", { duration: 3000 });
      return false;
    }

    if (!formData.newPassword.trim()) {
      toast.error("New password is required", { duration: 3000 });
      return false;
    } else if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters", { duration: 3000 });
      return false;
    }

    if (!formData.confirmPassword.trim()) {
      toast.error("Please confirm your new password", { duration: 3000 });
      return false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match", { duration: 3000 });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    // Show modal for confirmation
    setShowModal(true);
  };

  const handleConfirmReset = () => {
    console.log("Reset password:", formData);
    // TODO: Implement reset password functionality
    
    toast.success("Password reset", {
      description: "Your password has been successfully reset",
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

    // Reset form
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-headline-2 text-brown-600">Reset password</h1>
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          className="shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
          Save
        </Button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-brown-300 p-8 shadow-md">
        <div className="flex flex-col gap-6">
          {/* Current Password */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Current password</label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current password"
                value={formData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                className="w-[480px] h-12 px-4 pr-12 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute left-110 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors cursor-pointer"
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? (
                  <Eye className="w-5 h-5 text-brown-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-brown-400" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">New password</label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={formData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                className="w-[480px] h-12 px-4 pr-12 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute left-110 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors cursor-pointer"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <Eye className="w-5 h-5 text-brown-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-brown-400" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Confirm new password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="w-[480px] h-12 px-4 pr-12 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-110 top-1/2 -translate-y-1/2 p-1 hover:bg-brown-100 rounded-full transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <Eye className="w-5 h-5 text-brown-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-brown-400" />
                )}
              </button>
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
