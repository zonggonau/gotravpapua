import React from "react";

import CompDetailTour from "@/components/detailstour";
import { getDataDetailsPackages } from "@/data/api";

export default async function TourDetails({ params }) {
  const { data } = await getDataDetailsPackages(params.slug);
  console.log(data);
  return <CompDetailTour data={data} />;
}
