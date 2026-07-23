import { useEffect, useRef, useState } from "react";

interface AvatarUploadProps {
  currentImage?: string;
  onFileSelect: (file: File | null) => void;
}

const AvatarUpload = ({
  currentImage,
  onFileSelect,
}: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>(
    currentImage || ""
  );

  useEffect(() => {
    setPreview(currentImage || "");
  }, [currentImage]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    onFileSelect(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-gray-200 shadow">
        <img
          src={
            preview ||
            "https://placehold.co/200x200?text=Avatar"
          }
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Change Photo
      </button>
    </div>
  );
};

export default AvatarUpload;