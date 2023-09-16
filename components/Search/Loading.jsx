import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import loading from "@/app/tour-packages/loading";

export default function Loading() {
  return (
    <>
      <div
        className="mb-4"
        style={{
          borderBottomStyle: "dotted",
          borderBottomColor: "#ccc",
        }}
      >
        <div className="flex space-x-5">
          <div className="">
            <Skeleton width={300} height={200} />
          </div>
          <div>
            <Skeleton width={250} height={25} />
            <Skeleton width={500} height={30} />
            <Skeleton width={500} height={10} count={4} />
            <div className="flex space-x-5">
              <div className="flex space-x-5">
                <Skeleton width={15} height={15} />
                <Skeleton width={200} height={10} />
              </div>
              <div className="flex space-x-5">
                <Skeleton width={15} height={15} />
                <Skeleton width={200} height={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
