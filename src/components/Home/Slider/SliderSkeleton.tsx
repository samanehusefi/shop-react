const SliderSkeleton = () => {
  return (
    <div className="slider-container relative w-full overflow-hidden bg-gray-200">
      <div className="slider-skeleton h-[400px] w-full animate-pulse bg-gray-200" />

      <div className="absolute right-6 bottom-6 z-10 flex items-center gap-2">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
      </div>
    </div>
  );
};

export default SliderSkeleton;
