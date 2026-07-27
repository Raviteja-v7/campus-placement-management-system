interface SpinnerProps {
  size?: string;
}

const Spinner = ({ size = "h-12 w-12" }: SpinnerProps) => {
  return (
    <div
      className={`${size} animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}
    />
  );
};

export default Spinner;