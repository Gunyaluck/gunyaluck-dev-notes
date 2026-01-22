import { Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "../../common/Button";

export function ThumbnailUpload({ thumbnailPreview, onThumbnailChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onThumbnailChange(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="body-1-brown-400 font-semibold">Thumbnail image</label>
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
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              variant="outline"
              size="md"
              type="button"
              className="shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload thumbnail image
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
}
