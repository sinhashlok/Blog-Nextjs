import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardSkeleton } from "./skeletons";
import { usePathname, useRouter } from "next/navigation";

interface Blogs {
  _id: string;
  userId: string;
  title: string;
  content: string;
  coverImgURL: string;
  createdBy: string;
  createdAt: Date;
}

export default function BlogsCard({ blogs }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = (blogId: string) => {
    return router.push(`${pathname.replace("/dashboard", "")}/${blogId}`);
  };
  return (
    <div className="flex flex-row gap-x-12 gap-y-12 flex-wrap">
      {blogs ? (
        blogs?.map((data: Blogs) => {
          const date = new Date(data.createdAt);
          const created = date.toDateString();

          return (
            <Card
              className="min-w-[300px] max-w-[300px] min-h-[250px] max-h-[400px] bg-black text-white cursor-pointer"
              key={data._id}
              onClick={() => handleClick(data._id)}
            >
              {data?.coverImgURL && (
                <img
                  src={data?.coverImgURL}
                  alt="coverImg"
                  className="w-[300px] min-h-[250px] max-h-[250px] absolute z-[0] rounded-sm blur-sm opacity-50"
                />
              )}
              <CardHeader className="relative z-[1]">
                <CardTitle>{data.title}</CardTitle>
                <CardDescription className="text-white">
                  {data.createdBy}
                </CardDescription>
              </CardHeader>
              <CardFooter className="relative z-[1] mt-24">
                <p className="ml-auto font-bold">- {created}</p>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div className="flex flex-row gap-x-12 gap-y-12 flex-wrap">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton /> <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
    </div>
  );
}
