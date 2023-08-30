"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Categories } from "@/data";

export default async function page() {
  const path = usePathname();
  return (
    <div>
      {Categories.map((item, index) => {
        if (item.slug === path) {
          return <p>{item.component}</p>;
        }
      })}
    </div>
  );
}
