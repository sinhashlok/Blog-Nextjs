"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserSchema } from "@/schema/updateUserSchema";

const UpdateProfile = ({ user }: any) => {
  const FormSchema = updateUserSchema;
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: user?.fullname || "",
      username: user?.username || "",
      password: "",
    },
  });

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  function validUpdate() {
    const formValues = form.getValues();
    if (
      user.fullname != formValues.fullname ||
      user.username != formValues.username
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setBtnDisabled(true);
    const isValidUpdate = validUpdate();

    if (isValidUpdate) {
      const res = await axios
        .post("/api/user/updateUser", data)
        .then((res: AxiosResponse) => {
          toast.success(res.data.message, { duration: 6000 });
          router.refresh();
        })
        .catch((err: AxiosError) => {
          const data: any = err?.response?.data;
          toast.error(data?.message, { duration: 6000 });
        });
    } else {
      toast.error("No Valid updates", { duration: 6000 });
    }
    setBtnDisabled(false);
  }

  return (
    <div>
      <Toaster />
      <h1 className="text-center text-lg underline">Update Profile</h1>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[85%] md:w-1/3 mx-auto space-y-2 md:space-y-6"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter current password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter Current Password, to Confirm Update
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {btnDisabled ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w- animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" variant="outline" className="w-full">
                Submit
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
