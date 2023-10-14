"use client";
import CollageMosaic from "@/components/collage-mosaic";
import CollageSidebar from "@/components/collage-sidebar";
import {
  CollageContext,
  UploadContext,
  UploadContextProvider,
} from "@/lib/collage-context";
import React from "react";

type Props = {};

const Collage = (props: Props) => {
  return (
    <UploadContextProvider>
      <div className="flex h-full w-full flex-row">
        <div className="flex lg:w-60 xl:w-80">
          <CollageSidebar />
        </div>
        <div className="m-0 h-full max-h-[650px] w-full max-w-[1200px] grow">
          <CollageMosaic />
        </div>
      </div>
    </UploadContextProvider>
  );
};

export default Collage;
