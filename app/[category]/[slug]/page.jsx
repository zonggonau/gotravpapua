import React from "react";

import CompDetailTour from "@/components/detailstour";
import { getAnotherTour, getDataDetails } from "@/data/api";

export async function generateMetadata({ params }) {
  const category = params.category;
  const slug = params.slug;
  const { data } = await getDataDetails(category, slug);
  console.log(data);
  return {
    title: "GoTravPapua | " + data.title,
    openGraph: {
      title: "GoTravPapua | " + data.title,
      description: data.description,
      url: process.env.NEXT_PUBLIC_HOSTNAME,
      siteName: "GoTravPapua",
      images: [
        {
          url: process.env.NEXT_PUBLIC_HOSTNAME + data.picture,
          width: 800,
          height: 600,
        },
        {
          url: process.env.NEXT_PUBLIC_HOSTNAME + data.picture,
          width: 1800,
          height: 1600,
        },
        {
          url: process.env.NEXT_PUBLIC_HOSTNAME + data.picture,
          width: 1080,
          height: 675,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "GoTravPapua | " + data.title,
      description: data.description,
      images: [process.env.NEXT_PUBLIC_HOSTNAME + data.picture],
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
      other: {
        me: ["admin@gotravpapua.com", process.env.NEXT_PUBLIC_HOSTNAME],
      },
    },
  };
}


export default async function Details({ params }) {
  const category = params.category;
  const slug = params.slug;
  const { data } = await getDataDetails(category, slug);
  const { data: tour } = await getAnotherTour(category);
  return (
    <CompDetailTour data={data} category={category} slug={slug} tour={tour} />
  );
}
