import { useRef } from "react";
import { Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "../../common/Button";

export function ThumbnailUpload({ thumbnailPreview, onThumbnailChange }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onThumbnailChange(file, reader.result);
      };
      reader.onerror = () => {
        alert('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-4">
        <div className="w-[460px] h-[260px] bg-brown-200 rounded-lg border border-brown-300 flex items-center justify-center overflow-hidden shrink-0">
          {thumbnailPreview ? (
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-12 h-12 text-brown-400" />
          )}
        </div>
        <div className="flex-1 flex items-start">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            size="md"
            type="button"
            onClick={handleButtonClick}
            className="shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload thumbnail image
          </Button>
        </div>
      </div>
    </div>
  );
}
