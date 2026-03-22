import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../common/Button";
import { Input } from "../../ui/input";
import { ResetPasswordConfirm } from "../../common/ResetPasswordConfirm";
import { API_BASE_URL } from "@/config/env";

export function AdminResetPasswordForm() {
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
  const [submitting, setSubmitting] = useState(false);

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
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm();
    if (isValid) {
      setShowModal(true);
    } else {
      // Show error toast if validation fails
      const errorMessages = Object.values(validationErrors).filter(msg => msg);
      if (errorMessages.length > 0) {
        toast.error("Validation Error", {
          description: errorMessages[0],
          duration: 5000,
        });
      }
    }
  };

  const handleConfirmReset = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowModal(false);
      return;
    }

    setSubmitting(true);
    try {
      await axios.put(
        `${API_BASE_URL}/auth/reset-password`,
        {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowModal(false);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password updated", {
        description:
          "You stay signed in on this device. Use your new password the next time you log in.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to update password";
      toast.error("Error", {
        description: message,
        duration: 5000,
      });
      setErrors((prev) => ({ ...prev, currentPassword: message }));
    } finally {
      setSubmitting(false);
    }
  };


  const handleCloseModal = () => {
    if (!submitting) setShowModal(false);
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
                name="currentPassword"
                placeholder="Current password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={`w-[480px] h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300 ${
                  errors.currentPassword ? "border-brand-red" : "border-brown-300"
                }`}
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
            {errors.currentPassword && (
              <span className="body-3-red-600">{errors.currentPassword}</span>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">New password</label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-[480px] h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300 ${
                  errors.newPassword ? "border-brand-red" : "border-brown-300"
                }`}
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
            {errors.newPassword && (
              <span className="body-3-red-600">{errors.newPassword}</span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Confirm new password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-[480px] h-12 px-4 pr-12 rounded-lg border bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300 ${
                  errors.confirmPassword ? "border-brand-red" : "border-brown-300"
                }`}
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
            {errors.confirmPassword && (
              <span className="body-3-red-600">{errors.confirmPassword}</span>
            )}
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      <ResetPasswordConfirm
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmReset}
        isLoading={submitting}
      />
    </div>
  );
}
