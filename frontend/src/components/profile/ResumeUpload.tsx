import { useEffect, useRef, useState } from "react";

interface ResumeUploadProps {
  currentResume?: string;
  onFileSelect: (file: File | null) => void;
}

const getFileName = (url: string) => {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split("/").pop() || "";
  } catch {
    return "";
  }
};

const ResumeUpload = ({
  currentResume,
  onFileSelect,
}: ResumeUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (currentResume) {
      setFileName(getFileName(currentResume));
    }
  }, [currentResume]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    onFileSelect(file);

    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
      <h3 className="mb-3 text-lg font-semibold">Resume</h3>

      {fileName ? (
        <p className="mb-4 text-gray-700">📄 {fileName}</p>
      ) : (
        <p className="mb-4 text-gray-500">No resume uploaded</p>
      )}

      <div className="flex gap-3">
        {currentResume && (
          <a
            href={currentResume}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
          >
            View Resume
          </a>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          {currentResume ? "Change Resume" : "Upload Resume"}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ResumeUpload;