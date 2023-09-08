import React from "react";
import Image from "next/image";

export default function loading() {
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
