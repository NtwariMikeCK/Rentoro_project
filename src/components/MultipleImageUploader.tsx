import Image from "next/image";
import React, { useRef } from "react";

type ImageUploaderProps = {
  onFilesSelected: (files: File[]) => void;
  previewUrls: string[];
  onRemove: (index: number) => void;
};

export default function ImageUploader({
  onFilesSelected,
  previewUrls,
  onRemove,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    onFilesSelected(fileArray);
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
      >
        <div className="text-center text-gray-600">
          Click to upload or drag and drop
          <br />
          <span className="text-sm text-gray-500">
            (Minimum 3 photos, PNG/JPG up to 10MB each)
          </span>
        </div>
      </button>

      {previewUrls.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group h-48 w-full">
              {/* Use regular img tag instead of Next/Image for blob URLs */}
              <Image
                src={url}
                alt={`Preview ${index}`}
                className="h-full w-full object-cover rounded-lg"
                fill
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
