"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Button as ButtonShad } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { addBlogSchema } from "@/schema/addBlogSchema";

export default function AddBlog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const FormSchema = addBlogSchema;
  const router = useRouter();
  const [postImage, setPostImage] = useState<string | ArrayBuffer | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      coverImgURL: null,
    },
  });
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  const convertToBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    console.log(file);

    const base64: string | ArrayBuffer | null = await convertToBase64(file);
    setPostImage(base64);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setBtnDisabled(true);
    console.log(data);
    if (postImage) {
      data.coverImgURL = postImage;
    }

    const res = await axios
      .post("/api/blog/addBlog", data)
      .then((res: AxiosResponse) => {
        toast.success(res.data.message);
        router.refresh();
      })
      .catch((err: AxiosError) => {
        const data: any = err?.response?.data;
        toast.error(data?.message);
      });
    setBtnDisabled(false);
  }

  return (
    <div className="mr-4">
      <Button
        onPress={onOpen}
        className="hover:bg-white hover:text-black p-2 rounded-sm cursor-pointer text-sm"
      >
        Add Blog
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        classNames={{
          backdrop: "bg-[#272727]/50 backdrop-opacity-80",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent className="bg-white text-black rounded-md p-5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center text-2xl">
                Add Blog
              </ModalHeader>
              <ModalBody className="items-center">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w- md:w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
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
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter email address"
                              className="resize-none h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="coverImgURL"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Cover Image</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="file"
                              aria-describedby="coverImage"
                              onChange={(e) => handleFileUpload(e)}
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
                      <ButtonShad
                        type="submit"
                        variant="outline"
                        className="w-full"
                      >
                        Submit
                      </ButtonShad>
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
