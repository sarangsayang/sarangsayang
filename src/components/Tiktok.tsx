import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Tiktok = () => {
  return (
    <div className="mt-6">
      <MaxWidthWrapper>
        <div className="w-full h-[800px] flex flex-row items-center">
          <iframe
            src="https://www.tiktok.com/embed/7407781714740759816"
            allow="encrypted-media;"
            className="w-full md:w-[50%] lg:w-[33%] h-full border-0 bg-transparent"
          ></iframe>
          <iframe
            src="https://www.tiktok.com/embed/7402588471920954632"
            allow="encrypted-media;"
            className="w-[50%] lg:w-[33%] h-full border-0 bg-transparent hidden md:block"
          ></iframe>
          <iframe
            src="https://www.tiktok.com/embed/7408523621053910290"
            allow="encrypted-media;"
            className="w-[33%] h-full border-0 bg-transparent hidden lg:block"
          ></iframe>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Tiktok;
