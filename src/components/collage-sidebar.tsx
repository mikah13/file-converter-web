import { UploadContext, useUpload } from "@/lib/collage-context";
import React, { useContext } from "react";
import { Button } from "./ui/button";

type Props = {};

const CollageSidebar = (props: Props) => {
  // Inside your component
  const { images, updateImages } = useUpload();

  return (
    <div className="flex flex-col border-r">
      {images}

      <Button onClick={() => updateImages([...images, "add another one"])}>
        add
      </Button>
    </div>
  );
};

export default CollageSidebar;
