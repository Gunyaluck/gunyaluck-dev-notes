import { X } from "lucide-react";

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
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
