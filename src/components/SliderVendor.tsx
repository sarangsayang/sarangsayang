import { Vendor } from "@/payload-types";
import React from "react";
import Image from "next/image";

interface SliderVendorProps {
  vendor: Vendor;
}

const SliderVendor = ({ vendor }: SliderVendorProps) => {
  return (
    <div className="h-full">
      <Image
        src={vendor.images[0].image.sizes.thumbnail.url}
        width={400}
        height={300}
        alt={vendor.name}
      />
    </div>
  );
};

export default SliderVendor;
