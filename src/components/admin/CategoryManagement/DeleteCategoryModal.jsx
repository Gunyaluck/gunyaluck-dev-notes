import { X } from "lucide-react";
import { Button } from "../../common/Button";

export function DeleteCategoryModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-[476px] pt-14 pr-8 pb-6 pl-8 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-brown-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-brown-600" />
          </button>

          <div className="flex flex-col items-center justify-center">
            {/* Title */}
            <h2 className="text-headline-3 font-semibold text-brown-600 pb-4 text-center">
              Delete category
            </h2>

            {/* Question */}
            <p className="body-1-brown-400 mb-6 text-center">
              Are you sure you want to delete this category?
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 justify-center w-full">
              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                variant="primary"
                size="lg"
                className="flex-1 bg-brand-red hover:bg-red-600 text-white border-none"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
