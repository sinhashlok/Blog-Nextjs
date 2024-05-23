"use client";

import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VerifyToken = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get("token");

    setToken(urlToken || "");
  }, [searchParams]);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-8 mt-10 w-[25%] mx-auto">
        <h1 className="text-4xl mb-4">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">
          {token ? `${token}` : "No token"}
        </h2>
        {verified && (
          <div className="flex flex-col items-center mt-10">
            <h2>Verified</h2>
            <Link href="/login">
              <Button variant="link">Log In</Button>
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2>Error</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const VerifyEmail = () => {
  return (
    <Suspense>
      <VerifyToken />
    </Suspense>
  );
};

export default VerifyEmail;
