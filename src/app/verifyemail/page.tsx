"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function Timer() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  }, []);

  return <div>Redirecting to Log in page, in 5 secods</div>;
}

const VerifyEmail = () => {
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
    console.log(urlToken);

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
            <Timer />
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

export default VerifyEmail;
