import { useEffect } from "react";
import Button from "./Button";

type ConfirmDialogVariant =
  | "danger"
  | "warning"
  | "primary"
  | "success";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  variant?: ConfirmDialogVariant;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  variant = "danger",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  // Button doesn't have a "warning" variant,
  // so use primary styling for warning confirmations.
  const buttonVariant =
    variant === "warning" ? "primary" : variant;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm leading-6 text-gray-600">
          {message}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            autoFocus
          >
            {cancelText}
          </Button>

          <Button
            variant={buttonVariant}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;