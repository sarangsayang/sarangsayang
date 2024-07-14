import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Tiktok = () => {
  return (
    <div className="mt-6">
      <MaxWidthWrapper>
        <div className="w-full h-[800px] flex flex-row items-center">
          <iframe
            src="https://www.tiktok.com/embed/7390336091846348050"
            allow="encrypted-media;"
            className="w-full md:w-[50%] lg:w-[33%] h-full border-0 bg-transparent"
          ></iframe>
          <iframe
            src="https://www.tiktok.com/embed/7382878868832521480"
            allow="encrypted-media;"
            className="w-[50%] lg:w-[33%] h-full border-0 bg-transparent hidden md:block"
          ></iframe>
          <iframe
            src="https://www.tiktok.com/embed/7371436905285668104"
            allow="encrypted-media;"
            className="w-[33%] h-full border-0 bg-transparent hidden lg:block"
          ></iframe>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Tiktok;
