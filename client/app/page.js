"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/Dua's%20Importance?cat=1");
  }, [router]);

  return (
      <div className=" bg-white h-screen py-[1000px] mr-1">
        <h2 className="text-lg font-semibold">Main Content Area</h2>
      </div>
  );
}