"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { signupSchema } from "@/schema/signupSchema";
import Nav from "@/components/Nav";
import Link from "next/link";
import { loginSchema } from "@/schema/loginSchema";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";

const FormSchema = loginSchema;
export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await axios
      .post("/api/login", data)
      .then((res: AxiosResponse) => {
        toast.success(res.data.message);
        router.push("/dashboard");
      })
      .catch((err: AxiosError) => {
        toast.error(err?.response?.data?.message);
      });
  }

  return (
    <div>
      <Toaster />
      <nav>
        <Nav />
      </nav>
      <div className="flex flex-col items-center mx-auto md:w-[456px] mt-[72px] py-12 bg-[#212121] rounded-lg">
        <h1 className="text-2xl mb-6">Log in</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-4/5 md:w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a username"
                      {...field}
                      className="text-black"
                    />
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
                    <Input
                      placeholder="Enter password"
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline" className="w-full">
              Submit
            </Button>
          </form>
          <div className="mt-6">
            <p>
              Don{"'"}t have an account?{" "}
              <Link href="/signup" className="hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
