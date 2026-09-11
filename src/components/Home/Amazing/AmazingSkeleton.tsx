const AmazingSkeleton = () => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-0 py-2 sm:px-4 sm:py-4">
      <div className="overflow-hidden bg-gray-200 sm:rounded-[20px] sm:p-2 md:p-3">
        <div className="flex flex-col md:flex-row">
          <div className="flex w-full items-center justify-between px-3 py-3 md:hidden">
            <div className="h-5 w-28 animate-pulse rounded bg-gray-300" />
            <div className="h-5 w-12 animate-pulse rounded bg-gray-300" />
          </div>

          <div className="hidden w-[125px] min-w-[125px] flex-col items-center justify-center px-1 sm:w-[155px] sm:min-w-[155px] md:flex md:w-[190px] md:min-w-[190px]">
            <div className="h-16 w-16 animate-pulse rounded bg-gray-300 sm:h-20 sm:w-20" />

            <div className="mt-2 h-5 w-24 animate-pulse rounded bg-gray-300" />

            <div className="mt-4 flex gap-1">
              <div className="h-8 w-8 animate-pulse rounded bg-gray-300" />
              <div className="h-8 w-8 animate-pulse rounded bg-gray-300" />
              <div className="h-8 w-8 animate-pulse rounded bg-gray-300" />
            </div>

            <div className="mt-4 h-9 w-24 animate-pulse rounded-lg bg-gray-300" />
          </div>

          <div className="min-w-0 flex-1 px-0 pb-1 pt-1">
            <div
              className="flex gap-1 overflow-hidden my-0.5 mr-2 md:my-0 md:mr-0"
              dir="rtl"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-1/3 min-w-1/3 shrink-0 bg-white p-2 first:rounded-r-2xl last:rounded-l-2xl sm:w-[120px] sm:min-w-[120px] sm:p-3 md:w-[130px] md:min-w-[130px] lg:w-[170px] lg:min-w-[170px]"
                >
                  <div className="aspect-square animate-pulse rounded bg-gray-300" />

                  <div className="mt-2 space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-gray-300" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-gray-300" />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="h-4 w-8 animate-pulse rounded-full bg-gray-300" />
                    <div className="h-3 w-14 animate-pulse rounded bg-gray-300" />
                  </div>

                  <div className="mt-3 flex justify-end">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmazingSkeleton;
