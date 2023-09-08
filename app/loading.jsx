import React from "react";
import Image from "next/image";

export default function loading() {
  return (
    <div id="loader" class="loader green-color">
      <div class="loader-container">
        <div class="loader-icon">
          <Image
            src={`${process.env.NEXT_PUBLIC_HOSTNAME}assets/images/pre-load-gotrav.png`}
            width={100}
            height={100}
            alt="pre load gotrav"
          />
        </div>
      </div>
    </div>
  );
}
