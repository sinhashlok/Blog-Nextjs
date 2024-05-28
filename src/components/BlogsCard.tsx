import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Blogs {
  _id: string;
  userId: string;
  title: string;
  content: string;
  coverImgURL: string;
  createdBy: string;
  createdAt: Date;
}

export default function BlogsCard({ blogs }: [Blogs]) {
  return (
    <div className="flex flex-row gap-x-32 gap-y-24 flex-wrap">
      {blogs?.map((data: Blogs) => {
        const date = new Date(data.createdAt);
        const created = date.toDateString();

        return (
          <Card className="min-w-[356px] max-w-[356px] min-h-[250px] max-h-[400px] bg-black text-white" key={data._id}>
              {data?.coverImgURL && <img
                src={data?.coverImgURL}
                alt="coverImg"
                className="w-[356px] min-h-[250px] max-h-[250px] absolute z-[0] rounded-sm blur-sm opacity-50"
              />}
            <CardHeader className="relative z-[1]">
              <CardTitle>{data.title}</CardTitle>
              <CardDescription className="text-white">{data.createdBy}</CardDescription>
            </CardHeader>
            <CardFooter className="relative z-[1] mt-24">
              <p className="ml-auto font-bold">- {created}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
