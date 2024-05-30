const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-[300px] h-[250px]`}
    >
      <div className="flex flex-col p-4">
        <div className="h-6 w-24 rounded-md bg-gray-200 text-sm font-medium mb-2" />
        <div className="h-5 w-12 rounded-md bg-gray-200" />
      </div>
      <div className="ml-auto h-7 w-24 rounded-md bg-gray-200 mr-4 mt-28" />
    </div>
  );
}
