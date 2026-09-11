const PageLoading = () => {
  return (
    <div
      id="loading"
      className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 hidden transition-opacity duration-700"
    >
      <img
        loading="lazy"
        src={`${import.meta.env.BASE_URL}assets/logo/full-horizontal.svg`}
        className="h-20 w-40 animate-bounce"
        alt="Logo"
      />
      <p className="mt-4 text-gray-600 text-lg">در حال بارگذاری...</p>
    </div>
  );
};

export default PageLoading;
