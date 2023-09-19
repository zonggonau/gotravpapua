"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Loading() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.refresh();
      console.log("set time out");
    }, 3000);
  }, []);
  return (
    <div id="loader" className="loader green-color">
      <div className="loader-container">
        <div className="loader-icon">
          <Image
            src={`${process.env.NEXT_PUBLIC_HOST}assets/images/pre-load-gotrav.png`}
            width={100}
            height={100}
            alt="pre load gotrav"
          />
        </div>
      </div>
    </div>
  );
}
