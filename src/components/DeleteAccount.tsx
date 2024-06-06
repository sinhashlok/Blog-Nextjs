"use client";

import React from "react";
import { Button } from "./ui/button";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await axios
      .post("/api/logout")
      .then((res: AxiosResponse) => {
        toast.success(res.data.message);
        router.push("/login");
      })
      .catch((err: AxiosError) => {
        const data: any = err?.response?.data;
        toast.error(data?.message);
      });
  };
  const handleDelete = async () => {
    const res: any = await axios
      .post("/api/user/deleteUser")
      .then((res: AxiosResponse) => {
        toast.success(res.data.message);
        return res;
      })
      .catch((err: AxiosError) => {
        const data: any = err?.response?.data;
        toast.error(data?.message);
      });

    if (res?.data?.success) {
      await handleLogout();
    }
  };

  return (
    <div>
      <h1 className="text-lg underline mb-2">Delete Profile & All Blogs</h1>
      <Button variant="destructive" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccount;
