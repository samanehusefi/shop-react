const SkeletonBox = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`animate-pulse rounded-xl bg-gray-200 ${className}`} />
  );
};

const HomeSkeleton = () => {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1440px] px-3 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <SkeletonBox className="h-10 w-28 rounded-lg" />

            <SkeletonBox className="hidden h-11 flex-1 max-w-[600px] rounded-xl sm:block" />

            <div className="flex items-center gap-2">
              <SkeletonBox className="h-10 w-10 rounded-full" />
              <SkeletonBox className="h-10 w-10 rounded-full" />
            </div>
          </div>

          <div className="mt-3 flex gap-4 overflow-hidden">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonBox key={index} className="h-5 w-20 shrink-0 rounded" />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-2 py-3 sm:px-4 sm:py-5">
        <section className="overflow-hidden rounded-2xl">
          <SkeletonBox className="h-[180px] w-full rounded-2xl sm:h-[300px] lg:h-[420px]" />
        </section>

        <section className="mt-4 rounded-xl bg-white">
          <div className="flex justify-between gap-4 overflow-hidden px-2 py-3 sm:px-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex min-w-[65px] flex-col items-center gap-2 sm:min-w-[90px]"
              >
                <SkeletonBox className="h-11 w-11 rounded-full sm:h-14 sm:w-14" />
                <SkeletonBox className="h-3 w-12 rounded" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-2xl bg-red-500 p-3 sm:p-4">
          <div className="flex gap-3 overflow-hidden">
            <div className="hidden w-[150px] shrink-0 flex-col items-center justify-center gap-4 sm:flex">
              <SkeletonBox className="h-16 w-16 rounded-full bg-red-400" />
              <SkeletonBox className="h-5 w-24 rounded bg-red-400" />
              <SkeletonBox className="h-8 w-24 rounded-lg bg-red-400" />
            </div>

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[150px] flex-1 rounded-xl bg-white p-2 sm:min-w-[180px]"
              >
                <SkeletonBox className="h-[130px] w-full rounded-lg" />

                <SkeletonBox className="mt-3 h-3 w-full rounded" />

                <SkeletonBox className="mt-2 h-3 w-4/5 rounded" />

                <div className="mt-4 flex items-center justify-between">
                  <SkeletonBox className="h-4 w-16 rounded" />
                  <SkeletonBox className="h-4 w-10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBox
              key={index}
              className="h-[110px] w-full rounded-xl sm:h-[145px]"
            />
          ))}
        </section>

        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <SkeletonBox className="h-5 w-28 rounded" />
            <SkeletonBox className="h-4 w-16 rounded" />
          </div>

          <div className="grid grid-cols-5 gap-3 sm:grid-cols-9">
            {Array.from({ length: 18 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <SkeletonBox className="h-14 w-14 rounded-full sm:h-20 sm:w-20" />
                <SkeletonBox className="h-3 w-12 rounded" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBox
              key={index}
              className="h-[120px] rounded-xl sm:h-[170px]"
            />
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-3 sm:p-4">
          <div className="mb-4 flex items-center justify-between">
            <SkeletonBox className="h-5 w-32 rounded" />
            <div className="flex gap-2">
              <SkeletonBox className="h-8 w-8 rounded-full" />
              <SkeletonBox className="h-8 w-8 rounded-full" />
            </div>
          </div>

          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[145px] flex-1 rounded-xl border border-gray-100 p-2 sm:min-w-[180px]"
              >
                <SkeletonBox className="h-[150px] w-full rounded-lg" />

                <SkeletonBox className="mt-3 h-3 w-full rounded" />

                <SkeletonBox className="mt-2 h-3 w-4/5 rounded" />

                <SkeletonBox className="mt-4 h-5 w-2/3 rounded" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SkeletonBox className="h-[130px] rounded-xl sm:h-[180px]" />
          <SkeletonBox className="h-[130px] rounded-xl sm:h-[180px]" />
        </section>

        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-4">
          <div className="mb-5 flex items-center justify-between">
            <SkeletonBox className="h-5 w-36 rounded" />
            <SkeletonBox className="h-4 w-16 rounded" />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 md:grid-cols-10">
            {Array.from({ length: 14 }).map((_, index) => (
              <div
                key={index}
                className="flex h-20 items-center justify-center rounded-xl border border-gray-100 bg-white p-3 sm:h-24"
              >
                <SkeletonBox className="h-10 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SkeletonBox className="h-[130px] rounded-xl sm:h-[180px]" />
          <SkeletonBox className="h-[130px] rounded-xl sm:h-[180px]" />
        </section>

        <section className="mt-10 border-t border-gray-100 pt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <SkeletonBox className="h-5 w-28 rounded" />

                <SkeletonBox className="h-3 w-full rounded" />
                <SkeletonBox className="h-3 w-4/5 rounded" />
                <SkeletonBox className="h-3 w-3/5 rounded" />
                <SkeletonBox className="h-3 w-4/5 rounded" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            {Array.from({ length: 7 }).map((_, index) => (
              <SkeletonBox key={index} className="h-10 w-24 rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeSkeleton;
