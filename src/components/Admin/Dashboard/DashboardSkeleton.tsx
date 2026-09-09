const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div>
        <div className="h-8 w-32 rounded-lg bg-gray-200" />
        <div className="mt-3 h-4 w-48 rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="h-7 w-16 rounded-lg bg-gray-200" />
            </div>

            <div className="mt-6 h-10 w-20 rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-40 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 h-6 w-48 rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-24 rounded-xl bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
