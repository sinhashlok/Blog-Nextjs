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
import { signupSchema } from "@/schema/signupSchema";
import Nav from "@/components/Nav";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const FormSchema = signupSchema;
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setBtnDisabled(true);
    const res = await axios
      .post("/api/signup", data)
      .then((res: AxiosResponse) => {
        toast.success(res.data.message + "\nVerify your email.");
        router.push("/login");
      })
      .catch((err: AxiosError) => {
        const data: any = err?.response?.data;
        toast.error(data?.message);
      });
    setBtnDisabled(false);
  }

  return (
    <div>
      <Toaster />
      <nav>
        <Nav />
      </nav>
      <div className="flex flex-col items-center mx-auto md:w-[456px] mt-[48px] md:mt-[72px] py-12 bg-white rounded-lg text-black">
        <h1 className="text-2xl mb-6">Sign Up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w- md:w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter a username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      {...field}
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
                    />
                  </FormControl>
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
          <div className="mt-6">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
