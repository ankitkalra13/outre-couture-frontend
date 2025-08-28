// components/common/SpinnerLoader.jsx
export default function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-20 h-20 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
