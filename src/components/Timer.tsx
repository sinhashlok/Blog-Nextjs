import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Timer() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  }, []);

  return <div>Redirecting to Log in page, in 5 secods</div>;
}
