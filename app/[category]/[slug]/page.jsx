"use client";
import React from "react";

import CompDetailTour from "@/components/detailstour";
import { getDataDetails } from "@/data/api";
import { useParams } from "next/navigation";

export default async function Details() {
  const params = useParams();
  const category = params.category;
  const slug = params.slug;
  console.log(category);
  console.log(slug);
  const { data } = await getDataDetails(category, slug);
  return <CompDetailTour data={data} />;
}
