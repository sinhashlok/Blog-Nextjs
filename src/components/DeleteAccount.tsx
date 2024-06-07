"use client";

import React from "react";
import { Button } from "./ui/button";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await axios
      .post("/api/logout")
      .then((res: AxiosResponse) => {
        toast.success(res.data.message, {duration: 6000});
        router.push("/login");
      })
      .catch((err: AxiosError) => {
        const data: any = err?.response?.data;
        toast.error(data?.message, {duration: 6000});
      });
  };
  const handleDelete = async () => {
    const res: any = await axios
      .post("/api/user/deleteUser")
      .then((res: AxiosResponse) => {
        toast.success(res.data.message, {duration: 6000});
        return res;
      })
      .catch((err: AxiosError) => {
        const data: any = err?.response?.data;
        toast.error(data?.message, {duration: 6000});
      });

    if (res?.data?.success) {
      await handleLogout();
    }
  };

  return (
    <div>
      <Toaster />
      <h1 className="text-lg underline mb-2">Delete Profile & All Blogs</h1>
      <Button variant="destructive" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccount;
