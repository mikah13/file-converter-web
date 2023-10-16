"use client";
import CollageMosaic from "@/components/collage-mosaic";
import CollageSidebar from "@/components/collage-sidebar";
import {
  CollageContext,
  UploadContext,
  UploadContextProvider,
} from "@/lib/collage-providers";
import React from "react";

type Props = {};

const Collage = (props: Props) => {
  return (
    <UploadContextProvider>
      <div className="flex h-full w-full grow flex-row">
        <div className="flex w-full">
          <CollageSidebar />
          
        </div>
        {/* <div className="m-0 h-full max-h-[650px] w-full max-w-[1200px] grow">
          <CollageMosaic />
        </div> */}
      </div>
    </UploadContextProvider>
  );
};

export default Collage;
