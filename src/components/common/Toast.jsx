import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "./Button";

/**
 * Toast utility functions and components for displaying notifications
 */

/**
 * Show success toast for copied action
 * @param {string} message - Toast message (default: "Copied!")
 * @param {string} description - Toast description (optional)
 */
export function showSuccessToast(message = "Copied!", description, useGreenBackground = false) {
    const defaultDescription = description || "This article has been copied to your clipboard.";
    
    // If useGreenBackground is true, use brand-green with white text (for profile save)
    // Otherwise, use brand-green-neon with brown text (for copied action)
    if (useGreenBackground) {
        toast.success(message, {
            description: defaultDescription,
            duration: 3000,
            style: {
                backgroundColor: "var(--color-brand-green)",
                border: "none",
                color: "white",
            },
            classNames: {
                toast: "profile-save-toast",
                title: "text-headline-4 font-semibold text-white",
                description: "body-1 text-white",
                closeButton: "text-white hover:text-brown-100",
            },
        });
    } else {
        toast.success(message, {
            description: defaultDescription,
            duration: 3000,
            style: {
                backgroundColor: "var(--color-brand-green-neon)",
                border: "none",
            },
            classNames: {
                title: "text-headline-4 font-semibold text-brown-600",
                description: "body-1-brown-600",
                closeButton: "text-brown-600 hover:text-brown-800",
            },
        });
    }
}

/**
 * Show error toast
 * @param {string} message - Error message
 * @param {string} description - Error description (optional)
 */
export function showErrorToast(message, description) {
    toast.error(message, {
        description: description,
        duration: 4000,
        style: {
            backgroundColor: "var(--color-brand-red)",
            border: "none",
        },
        classNames: {
            title: "text-headline-4 font-semibold text-white",
            description: description ? "body-1-white" : undefined,
            closeButton: "text-white hover:text-brown-100",
        },
    });
}

/**
 * Show info toast
 * @param {string} message - Info message
 * @param {string} description - Info description (optional)
 */
export function showInfoToast(message, description) {
    toast.info(message, {
        description: description,
        duration: 3000,
        style: {
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-brown-300)",
        },
        classNames: {
            title: "text-headline-4 font-semibold text-brown-600",
            description: description ? "body-1-brown-600" : undefined,
            closeButton: "text-brown-600 hover:text-brown-800",
        },
    });
}

/**
 * Show warning toast
 * @param {string} message - Warning message
 * @param {string} description - Warning description (optional)
 */
export function showWarningToast(message, description) {
    toast.warning(message, {
        description: description,
        duration: 3500,
        style: {
            backgroundColor: "var(--color-brand-orange)",
            border: "none",
        },
        classNames: {
            title: "text-headline-4 font-semibold text-brown-600",
            description: description ? "body-1-brown-600" : undefined,
            closeButton: "text-brown-600 hover:text-brown-800",
        },
    });
}

// Legacy function name for backward compatibility
export function showCopiedToast() {
    showSuccessToast("Copied!", "This article has been copied to your clipboard.");
}

/**
 * AlertIncorrect component - Shows error alert for incorrect login credentials
 * Only visible on large screens (lg breakpoint)
 * @param {boolean} isOpen - Whether the alert is visible
 * @param {function} onClose - Callback function to close the alert
 */
export function AlertIncorrect({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="hidden lg:block fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
            <div className="w-[700px] bg-brand-red rounded-lg p-4 flex items-start gap-4 shadow-lg">
                <div className="flex-1 flex flex-col gap-1">
                    <p className="text-headline-4-white font-semibold">
                        Your password is incorrect or this email doesn't exist
                    </p>
                    <p className="body-3-white">
                        Please try another password or email
                    </p>
                </div>
                <Button
                    onClick={onClose}
                    variant="close"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 text-white" />
                </Button>
            </div>
        </div>
    );
}
