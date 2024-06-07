import { CardSkeleton } from "@/components/skeletons";

const loading = () => {
  return (
    <div className="mt-14 flex flex-col items-center md:flex-row gap-x-12 gap-y-12 flex-wrap">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default loading;
