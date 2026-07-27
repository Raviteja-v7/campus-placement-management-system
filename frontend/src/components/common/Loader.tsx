import Spinner from "../ui/Spinner";

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <Spinner />

        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;